import { verifyToken } from "../utility/tokenUtility.js"

export const userAuthentication = (req, res, next)=>{
    const token = req.headers.token
    const verified = verifyToken(token)
    if (verified != false){
        req.headers.email = verified.email
        req.headers.userID = verified.userID
        next()
    }
    else{
        return res.status(401).json({"status": "Failed", "message": "User not exists"})
    }
}