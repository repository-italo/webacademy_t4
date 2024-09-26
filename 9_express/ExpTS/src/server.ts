import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { validateEnv } from "./utils/validateEnv";
import dotenv from "dotenv";

dotenv.config();
validateEnv();
type logFormat = "simples" | "completo"
const app = express()
const PORT = process.env.PORT ?? 5566



app.use((req: Request , res: Response, next: NextFunction) => {
   console.log(new Date(Date.now()))
   console.log(req.url);
   console.log(req.method);
   console.log(req.httpVersion);
   console.log(req.get('User-Agent'))
   return next();
});
app.get("/", (req: Request, res: Response) => {
   res.send("Hello World")
});
 
app.listen(PORT, () => {
   console.log(`Listening in port ${PORT}`)
})