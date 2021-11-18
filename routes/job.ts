import jobController from "../controller/job"
import {Router} from "express"
const router = Router()

router.get("/job", jobController.renderJob)
router.post("/job", jobController.crateJob)
router.get("/job-edit/:id", jobController.renderEditJob)
router.post("/job-edit/:id", jobController.editJob)
router.post("/job/delete/:id", jobController.deleteJob)
export default router