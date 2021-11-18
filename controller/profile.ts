import { Request, Response } from "express"
import { userModel } from "../models"
export default {
	renderProfile: async (req: Request, res: Response): Promise<any> => {
		let user = await userModel.findOne({raw: true})
		
		if(user != undefined){
			let hourPrice = Math.round(user!.monthlyBudget / (user!.hoursPerDay * user!.daysPerWeek * 4)) //Calcula o valor que deve cobrar por hora 
			res.render("profile", { user, hourPrice, layout: false })
		}else{
			res.render("profile", {layout: false})
		}
		
	}, 

	editProfile: async (req: Request, res: Response): Promise<any> => {
		const { monthlyBudget, hoursPerDay, daysPerWeek} = req.body
		req.body.hourPrice = Math.floor(monthlyBudget / (hoursPerDay * daysPerWeek * 4))
		userModel.upsert(req.body).then(() => {
			res.redirect("/")
		}).catch((err) => {
			console.log(err)
			res.redirect("/profile")
		})

	}
}