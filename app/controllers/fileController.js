import { upload } from "../utility/fileUploadUtility.js"
import path from "path"
import fs from "fs"

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


export const uploadSingle = (req,res)=>{
    upload.single("myfile") (req,res, (err)=>{
        if(err){
            return res.status(500).json({"Status":"Failed", "message":err.message})
        }
        else{
            return res.status(200).json({"status":"Success","message":"File Upload Success"})
        }
    } )
} 


export const deleteSingle = (req, res) => {
    const filePath = path.join( __dirname, '../../uploads', req.params.filename)

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send('Error deleting file: ' + err)
        }
        res.send('File deleted successfully')
    })
}




export const readFile = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../../uploads', filename)

    fs.stat(filePath, (err, stats) => {
        if (err) {
            return res.status(404).json({ message: 'File not found' })
        }

        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error reading file' })
            }
        
            return res.setHeader('Content-Type', 'text/plain').send(data)
        })
        
    })

}