import { Request, Response } from "express"
import { jobModel, userModel } from "../models"
export default {

	renderJob: (req: Request, res: Response) => {
		res.render("job", { layout: false })
	},
	crateJob: async (req: Request, res: Response): Promise<any> => {
		const { name, totalHours, dailyHours } = req.body
		let timeInDays = (totalHours / dailyHours) * 86400000  //guarda quantos dias tem para finalizar o job mas em MS 
		let createdAt = new Date().getTime() 
		let dueDay = timeInDays + createdAt
		jobModel.create({
			name,
			totalHours,
			dailyHours,
			timeInDays,
			dueDay,
			createdAt
		}).then((job) => {
			res.redirect("/")
		}).catch((err) => {
			console.log(err)
			 res.redirect("/job")
		})
	},

	renderEditJob: async (req: Request, res: Response): Promise<any> => {

		const userHourPrice = await userModel.findOne({raw: true, attributes: ["hourPrice"]})
		const hourPrice = userHourPrice!.hourPrice

		jobModel.findOne({ where: { id: req.params.id }, raw: true }).then((job) => {

			let jobPrice = job!.totalHours * hourPrice // passa o valor do job para a pagina de editar job
			res.render("job-edit", { job, jobPrice, layout: false })
			
		}).catch((err) => {
			console.log(err)
			res.redirect("/")
		})
	},

	editJob: async (req: Request, res: Response): Promise<any> => {
		const {dailyHours, totalHours} = req.body
		let timeInDays = totalHours / dailyHours * 86400000
		jobModel.update( {
			dailyHours,
			totalHours,
			timeInDays
		},{where: {id: req.params.id}}).then(() => {
			res.redirect("/")
		}).catch(() => {
			res.redirect(`/job-edit/${req.params.id}`)
		})
	},

	deleteJob: async (req: Request, res: Response): Promise<any> => {
		jobModel.destroy({where: {id: req.params.id}}).then(() => {
			res.redirect("/")
		}).catch(() => {
			res.redirect("/profile")
		})
	}


}