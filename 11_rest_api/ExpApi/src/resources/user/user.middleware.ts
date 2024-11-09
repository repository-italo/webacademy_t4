import { Request, Response, NextFunction } from "express";
import { CreateUserDTO } from "./user.types";
import userService from "./user.service";
import { StatusCodes } from "http-status-codes";

const emailAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
   const user  = req.body as CreateUserDTO;
   if(await userService.emailAlreadyHasUser(user.email)){
      res.status(StatusCodes.CONFLICT).json({"msg": "email already has user"});
      return;
   }
   next();
}

 export default {emailAlreadyExists};