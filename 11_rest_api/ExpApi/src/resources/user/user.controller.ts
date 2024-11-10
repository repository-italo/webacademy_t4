import {Request, Response} from 'express'
import { CreateUserDTO } from './user.types';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import userService from './user.service';
import { User } from '@prisma/client';

const index = async (req: Request, res: Response) => {
   try{
      const users: User[] = await userService.getAllUsers();
      res.status(StatusCodes.OK).json(users);
   }catch(error){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
   }
}
const create = async (req: Request, res: Response) => {
   const user = req.body as CreateUserDTO;
   try {
      const newUser = await userService.createUser(user);
      res.status(StatusCodes.CREATED).json(newUser);
   } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
   }
}
const read = async (req: Request, res: Response) => {
   const {id} = req.params;
   try {
      const user = await userService.readUserbyId(id);
      if(!user){
         res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
         return;
      }
      res.status(StatusCodes.OK).json(user);
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
   }
}
const update = async (req: Request, res: Response) => {
   const {id} = req.params;
   const user = req.body as CreateUserDTO;
   try{
      const searchUser = await userService.readUserbyId(id);
      if(!searchUser){
         res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
         return;
      }
      const updatedUser = await userService.updateUser(id, user);
      res.status(StatusCodes.OK).json(updatedUser);

   }catch(error){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
   }
}
const remove = async (req: Request, res: Response) => {
   const {id} = req.params;

   try {
      const searchUser = await userService.readUserbyId(id);
      if(!searchUser){
         res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
         return;
      }
      const affectedCount = await userService.removeUser(id);
      if(affectedCount == 1){
         res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
      }else{
         res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
      }
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
   }
}


export default {index, create, read, update, remove};