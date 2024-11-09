import {Request, Response} from 'express'
import { CreateUserDTO } from './user.types';
import { StatusCodes } from 'http-status-codes';
import userService from './user.service';

const index = async (req: Request, res: Response) => {

}
const create = async (req: Request, res: Response) => {
   const user = req.body as CreateUserDTO;
   try {
      const newUser = await userService.createUser(user);
      res.status(StatusCodes.CREATED).json(newUser);
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
   }
}
const read = async (req: Request, res: Response) => {
   const {id} = req.params;
   try {
      const user = await userService.readUserbyId(id);
      res.status(StatusCodes.OK).json(user);
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
   }
}
const update = async (req: Request, res: Response) => {}
const remove = async (req: Request, res: Response) => {}


export default {index, create, read, update, remove};