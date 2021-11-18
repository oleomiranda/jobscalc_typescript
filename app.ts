import express from "express"
const app = express()
import handlebars from "express-handlebars"
import profileRouter from "./routes/profile"
import jobRouter from "./routes/job"
import indexRouter from "./routes/index"

const hbs = handlebars.create({
	helpers: {
		checkFreeHours: (hours: number) => { //checa se ainda tem horario disponivel no dia
			if (hours < 0) {
				return `Você ultrapassou o limite em ${Math.abs(hours)}`
			} else if (hours == 0) {
				return `Você não tem horas livres`
			} else {
				return `Você ainda tem ${hours} horas livres`
			}
		},
		checkRemainingDays: (createdAt: number, timeInDays: number) => {
			let now = new Date().getTime()
			let c2 = (now / 2) - createdAt
			let t2 = (now / 2) - timeInDays
			// conta quantos dias falta para finalizar
			// (createdAt + timeInDays) - now / 86400000 (tudo em ms)
			let remaining = Math.round(Math.abs((c2 + t2) / 86400000))
			return remaining


		}, 
		checkJobPrice: (userHourPrice: number, jobTotalHours: number) => {
			return userHourPrice * jobTotalHours
		}
	}
})

app.use(express.static("public"))
app.set("view engine", "handlebars")
app.engine("handlebars", hbs.engine)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(profileRouter)
app.use(jobRouter)
app.use(indexRouter)



app.listen(8081, () => console.log('rodando...'))