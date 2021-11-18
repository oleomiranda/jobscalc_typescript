import { Router } from "express";
const router = Router()
import profileControll from "../controller/profile"


router.get("/profile", profileControll.renderProfile)
router.post("/profile", profileControll.editProfile)
export default router