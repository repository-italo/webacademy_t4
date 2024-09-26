import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { validateEnv } from "../utils/validateEnv";
import fs from 'fs';
import path from 'path'
type LogType = "complete" | "simple";
dotenv.config();
validateEnv();
const logger = (type: LogType) => {
   const logsDir = process.env.PASTA_LOGS ?? "./logs";
   
   if(!fs.existsSync(logsDir)){
      fs.mkdirSync(logsDir, {recursive: true});
   }
   const logFile = path.join(logsDir, "access.log")

   if(type === "complete"){
      return (request: Request, response: Response, next: NextFunction) => {
         const log = ` \n ${new Date().toUTCString()}, ${request.url}, ${request.method},
         ${request.httpVersion}, ${request.get("User-Agent")} \n`;
         fs.appendFile(logFile, log, (err) => {
            if (err) console.error("Erro ao salvar o log:", err);
       } )
         return next();
      }
   }else{
      return (request: Request, response: Response, next: NextFunction) => {
         const log = `\n${new Date().toUTCString()}, ${request.url}, ${request.method} \n`;
         fs.appendFile(logFile, log, (err) => {
            if (err) console.error("Erro ao salvar o log:", err);
       } )
         return next();
      }
   }
   
}

export {logger}