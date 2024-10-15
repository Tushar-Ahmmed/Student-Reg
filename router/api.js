import express from "express"
import * as studentController from "../app/controllers/studentController.js"
import { userAuthentication } from "../app/middleware/authMiddleware.js"

const router = express.Router()

router.post("/registration", studentController.registration)
router.post("/verifyotp/:otp", studentController.verifyotp)
router.post("/studentLogin", studentController.studentLogin)
router.get("/verifyLogin/:otp", studentController.verifyLogin)
router.post("/createProfile", userAuthentication, studentController.createProfile)
router.get("/readProfile" , userAuthentication, studentController.readProfile)
router.post("/updateProfile", userAuthentication, studentController.updateProfile)

export default router