import ProfileModel from "../models/profileModel.js"
import UserModel from "../models/usersModel.js"
import { sendEmail } from "../utility/emailUtility.js"
import { encodeToken } from "../utility/tokenUtility.js"
import mongoose from "mongoose"
const ObjectId = mongoose.Types.ObjectId

export const registration = async(req, res)=>{
    try {
        const reqBody = req.body
        if(reqBody != null){
            const otp = Math.floor(100000 + Math.random()*900000)
            reqBody.otp = otp
            await UserModel.create(reqBody)
            const emailTo = reqBody.email
            const emailSub = "OTP"
            const emailText = `OTP is ${otp}`
            sendEmail(emailTo,emailSub, emailText)
            return res.json({"status":"Success", "message":`OTP has been sent to your email ${reqBody.email}`})
        }
    } catch (error) {
        return res.json({"status":"Failed", "message":error.toString()})
    }
}



export const verifyotp = async (req,res)=>{
   try {
    const otp = req.params.otp
    const {email} = req.body
    const data = await UserModel.findOne({"email":email, "otp":otp})
   
    if (data != null){
        return res.json({"status":"Success", "message":"Your registration complete."})
    }
    else{
        await UserModel.deleteOne({"email":email})
        return res.json({"status":"Failed", "message":"Try again"})
    }
   } catch (error) {
    return res.json({"status":"Failed", "message":error.toString()})
   }
}



export const studentLogin = async(req, res)=>{
    try {
        const reqBody = req.body
        const email = reqBody.email
        const data = await UserModel.findOne(reqBody)
       
        if (data != null){
            const otp = Math.floor(100000 + Math.random()*900000)
            const emailTo = email
            const emailSub = "OTP"
            const emailText = `OTP is ${otp}`
            const result = await UserModel.updateOne({"email":email},{$set:{"otp":otp}})
            if( result.modifiedCount > 0 ){                
                sendEmail(emailTo, emailSub, emailText)
                return res.json({"status":"Success", "message":`OTP has been sent to your email ${reqBody.email}`})
            }
            
            return res.json({"status":"Failed", "message":`Could not update in database`})
        }
        else{
            return res.json({"status":"Failed", "message":"No user Found"})
        }
       } catch (error) {
            return res.json({"status":"Failed", "message":error.toString()})
       }
}



export const verifyLogin = async (req, res)=>{

    try {
        const otp = req.params.otp
        const {email} = req.body
        const data = await UserModel.findOne({"email":email, "otp":otp})
       
        if (data != null){
            const result = await UserModel.updateOne({"email":email},{$set:{"otp":null}})
            // token generation
            const token = encodeToken({"email":email, "userID":data["_id"]})    
            return res.json({"status":"Success", "token":token}) 

        }
        else{
            return res.json({"status":"Failed", "message":"Wrong OTP"})
        }
       } catch (error) {
        return res.json({"status":"Failed", "message":error.toString()})
       }
}



export const createProfile = async (req, res)=>{
  try {
    const reqBody = req.body
    const userID = new ObjectId(req.headers.userID)
   
    reqBody.user_id = userID
     
    const result = await ProfileModel.create(reqBody)
    if(result){
        return res.json({"status":"Success", "message": "Profile created", "result":result})
    }
    else{
        return res.json({"status":"Failed", "message": "Could Not inserted"}) 
    }
  } catch (error) {
    return res.json({"status":"Failed", "message": error.toString()})
  }
}



export const readProfile = async (req, res)=>{
    try {
        const user_id = new ObjectId(req.headers.userID)
        const result = await ProfileModel.findOne({"user_id":user_id},{"_id":0, "first_name":1, "last_name":1, "phone_number":1, "gpa":1, "major":1})
        if(result != null){
            return res.json({"Status":"Success", "Profile": result})
        }
        else{
            return res.json({"Status":"Failed", "Message":"No user Profile exists"})
        }
    } catch (error) {
        return res.json({"status":"Failed", "message":error.toString()})
    }
}



export const updateProfile = async (req, res)=>{
    try {
        const user_id = new ObjectId(req.headers.userID)
        const reqBody = req.body
        const result = await ProfileModel.updateOne({"user_id":user_id}, {$set:reqBody}, {upsert:true})
        if(result.modifiedCount > 0){
            return res.json({"Status":"Success", "Message":"Profile Update Successfull"})
        }
        else{
            return res.json({"Status":"Failed", "Message":"Could not update!!"})
        }
    } catch (error) {
        return res.json({"status":"Failed", "message":error.toString()})
    }
}