import {Request, Response} from 'express'
import { CreateUserDTO } from './user.types';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import userService from './user.service';
import { User } from '@prisma/client';
import { UserTypes } from '../usertype/usertype.constants';

const index = async (req: Request, res: Response) => {
   /*
      #swagger.summary = 'Listagem de Usuários.'
      #swagger.responses[200] = {
         schema: {$ref: '#/definitions/Users'}
      }
      #swagger.responses[403] = {
         in: 'body',
         text: 'FORBIDDEN'
   }

   */
   
   try{
      if(!req.session.uid && req.session.userTypeId != UserTypes.ADMIN){
         res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
      }
      const users: User[] = await userService.getAllUsers();
      res.status(StatusCodes.OK).json(users);
   }catch(error){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
   }
}
const create = async (req: Request, res: Response) => {
   /*
      #swagger.summary = 'Adiciona Usuário a Base.'
      #swagger.parameters['body'] = {
         in: 'body',
         schema: {$ref: '#/definitions/CreateUserDTO'}
      }
      #swagger.responses[201] = {
         schema: {$ref: '#/definitions/User'}
      }
      #swagger.responses[409] = {
         in: 'body',
         text: 'CONFLICT'
   }
      #swagger.responses[422] = {
      in: 'body',
      text: 'UNPROCESSABLE ENTITY'
   }
      
   */
   
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
   /*
      #swagger.summary = 'Recupera Dados de um usuário específico.'
      #swagger.parameters['id'] = {description: 'Id do usuário', example: '10f30194-e960-4efb-9d4a-f9336f8992b9'}
      #swagger.responses[200] = {
         schema: {$ref: '#/definitions/User'}
      }
      #swagger.responses[404] = {
         in: 'body',
         text: 'NOT FOUND'
   }
   */
   
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
   /*
      #swagger.summary = 'Recupera Dados de um usuário específico.'
      #swagger.parameters['id'] = {description: 'Id do usuário.', example: '10f30194-e960-4efb-9d4a-f9336f8992b9'}
      #swagger.parameters['body'] = {
         in: 'body',
         schema: {$ref: '#definitions/CreateUserDTO'}
      }
      #swagger.responses[200] = {
         schema: {$ref: '#/definitions/User'}
      }
      #swagger.responses[403] = {
         in: 'body',
         text: 'FORBIDDEN' 
      }
      #swagger.responses[404] = {
         in: 'body',
         text: 'NOT FOUND'
   }
   
   */
   
   
   const {id} = req.params;
   const user = req.body as CreateUserDTO;
   try{
      const searchUser = await userService.readUserbyId(id);
      if(!searchUser){
         res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
         return;
      }
      if(req.session.uid != searchUser.id && req.session.userTypeId != UserTypes.ADMIN){
         res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN)
      }
      const updatedUser = await userService.updateUser(id, user);
      res.status(StatusCodes.OK).json(updatedUser);

   }catch(error){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
   }
}
const remove = async (req: Request, res: Response) => {
   /*
      #swagger.summary = 'Remove Usuário da Base de Dados.'
      #swagger.parameters['id'] = {descrition: 'Id do Usuário', example: '10f30194-e960-4efb-9d4a-f9336f8992b9'}
      #swagger.responses[204] = {
         schema: {  }
      }
      #swagger.responses[403] = {
         in: 'body',
         text: 'FORBIDDEN'
      }
      #swagger.responses[404] = {
         in: 'body',
         text: 'NOT FOUND'
   }
      #swagger.responses[400] = {
         in: 'body',
         text: 'BAD REQUEST'
   }
   */
   
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