import { Request, Response } from "express"
import { jobModel, userModel } from "../models"
import { jobsObj } from "../interfaces"


export default {
	renderIndex: async (req: Request, res: Response): Promise<any> => {

		let user = await userModel.findOne({ raw: true, attributes: ["name", "avatar", "hourPrice", "hoursPerDay"] })
		let job = await jobModel.findAll({ raw: true })
		let jobArray: Array<jobsObj> = [...job]
		let totalJobs = job.length
		let now = new Date().getTime() / 86400000
		let jobsDone = 0 //guarda quantos jobs ja finalizaram
		let jobsInProgress = 0 //guarda quantos jobs ainda nao finalizaram
		let freeHours = user!.hoursPerDay 

		for (let jobs of jobArray) {
			freeHours -= jobs.dailyHours //conta se existe hora disponivel no dia 
			if ((jobs.dueDay - now) > 0) { //verifica se o tempo para finalizar o job ja acabou 
				jobsInProgress++
				jobs.done = false
			} else {
				jobsDone++
				jobs.done = true
			}
		}

		res.render("index", { user, job: jobArray, jobsDone, jobsInProgress, totalJobs, freeHours, layout: false })
	}
}