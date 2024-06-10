import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"

import productRoutes from "./routes/productRoutes.js"
import userRuter from "./routes/UserRoutes.js"
import morgan from "morgan"

const app = express()
const port = 5000
const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/products",productRoutes)
app.use("/user",userRuter)


app.use("*",(req,res)=>{
    res.status(404).json({massege:"api address is wrong!"})
})
app.listen(port,()=>{
    console.log(`[BlP]-server:http://localhost:${port} >>>> conecting....`);
})