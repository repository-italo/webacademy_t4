import { NextFunction, Request, Response } from "express";
import { UserTypes } from "../resources/usertype/usertype.constants";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
   if(
      !req.session.userTypeId || 
      req.session.userTypeId === UserTypes.CLIENT) {
      res.status(StatusCodes.FORBIDDEN)
         .send(ReasonPhrases.FORBIDDEN); 
      }
   next();
} 

export {isAdmin};