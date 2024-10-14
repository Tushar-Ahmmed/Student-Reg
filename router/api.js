import express from "express"
import * as studentController from "../app/controllers/studentController.js"

const router = express.Router()

router.post("/registration", studentController.registration)
router.post("/studentLogin", studentController.studentLogin)
router.get("/verifyLogin", studentController.verifyLogin)
router.get("/readProfile", studentController.readProfile)
router.post("/updateProfile", studentController.updateProfile)

export default router