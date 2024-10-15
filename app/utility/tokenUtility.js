import jwt from "jsonwebtoken"
import { JWT_EXPIRE_TIME, JWT_KEY } from "../config/config.js"

export const encodeToken = (payLoad)=>{
    const token = jwt.sign(payLoad, JWT_KEY, {expiresIn:JWT_EXPIRE_TIME})
    return token
}

export const verifyToken = (token)=>{

    try {
        const verified = jwt.verify(token, JWT_KEY)
        return verified
    } catch (error) {
        return false
    }
}