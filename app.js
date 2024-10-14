import exppress from "express"
import { DATABASE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE } from "./app/config/config.js"
import router from "./router/api.js"
import cors from "cors"
import rateLimit from "express-rate-limit"
import hpp from "hpp"
import helmet from "helmet"

import mongoose from "mongoose"


const app = exppress()

const limiter = rateLimit({
    windowMs:REQUEST_TIME,
    limit:REQUEST_NUMBER
})

app.use(hpp())
app.use(cors())
app.use(helmet())
app.use(limiter)

app.use(exppress.json())
app.use(exppress.urlencoded({extended:URL_ENCODE}))

// web cache
app.set('etag', WEB_CACHE)

// database connection
mongoose.connect(DATABASE, {autoIndex:true})
.then(()=>{console.log(`Database Conneted!!`)})
.catch((error)=>{console.log(error.toString())})

const port = PORT
app.use(router)

app.listen(port,()=>{console.log(`Server Running at http://localhost:${port}`)
})