import exppress from "express"
import { PORT } from "./app/config/config.js"
import router from "./router/api.js"


const app = exppress()
const port = PORT
app.use(router)

app.listen(port,()=>{console.log(`Server Running at http://localhost:${port}`)
})