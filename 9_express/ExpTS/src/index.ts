import express from "express"
import { Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config();

const app = express()
const PORT = process.env.PORT ?? 5566
app.get("/", (req: Request, res: Response) => {
   res.send("Hello Wolrd")
})

app.listen(PORT, () => {
   console.log(`Listening in port ${PORT}`)
})