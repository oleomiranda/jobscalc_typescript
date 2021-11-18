import { Router } from "express";
const router = Router()
import indexController from "../controller/index"

router.get("/", indexController.renderIndex)

export default router