

import nodemailer from "nodemailer"
import { EMAIL_HOST, EMAIL_PASS, EMAIL_port, EMAIL_SECURITY, EMAIL_USER } from "../config/config.js"

export const sendEmail = async (emailTo, emailSub, emailText)=>{
    const transporter = nodemailer.createTransport(
        {
            host:EMAIL_HOST,
            port:EMAIL_port,
            secure:EMAIL_SECURITY,
            auth:{
                user:EMAIL_USER,
                pass:EMAIL_PASS
            },
        }
    )

    let mailOption = {
        from: '"Mern E-Commerse" <mern_ostad@themesoft69.com>',
        to: emailTo,
        subject:emailSub,
        text: emailText
    }

    return transporter.sendMail(mailOption)
}