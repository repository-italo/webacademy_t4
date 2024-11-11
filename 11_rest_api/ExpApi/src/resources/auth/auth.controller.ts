import {Request, Response} from "express";
import { LoginDTO, SignUpDTO } from "./auth.types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import userService from "../user/user.service";
import { UserTypes } from "../usertype/usertype.constants";
import authService from "./auth.service";
import { User } from "@prisma/client";

const signup = async (req: Request, res: Response) => {
   /*
      #swagger.summary = 'Cadastro de Usuário Cliente.'
      #swagger.parameters['body'] = {
         in: 'body',
         schema: {
            $ref: '#/definitions/SignUpDTO'
         }
      }
      #swagger.responses[201] = {
         schema: {$ref: '#/definitions/User'}
      }
      
   */
   const user = req.body as SignUpDTO;
   try {
      const newUser = await userService.createUser({...user, userTypeId: UserTypes.CLIENT});
      res.status(StatusCodes.CREATED).json(newUser);
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
   }
};
const login = async (req: Request, res: Response) => {
   /*
      #swagger.summary = 'Login de Usuários.'
      #swagger.parameters['body'] = {
         in: 'body',
         schema: {$ref: '#/definitions/LoginDTO'}
      }
      #swagger.responses[200]= {
         in: 'body',
         text: 'OK'
      }
      #swagger.responses[401] = {
         in: 'body',
         text: 'UNAUTHORIZED'
      }
   */
   const credentials = req.body as LoginDTO;
   try {
      const user = await authService.checkCredentials(credentials);
      if(!user){
         res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
      } 
      req.session.uid = user!.id;
      req.session.userTypeId = user!.userTypeId;
      res.status(StatusCodes.OK).send(ReasonPhrases.OK);
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
   }
};



const logout = async (req: Request, res: Response) => {
   /*
   #swagger.summary = 'Logout de Usuário Logado.'
   #swagger.responses[200] = {
      in: 'body',
      text: 'OK'
   }
   #swagger.responses[401] = {
      in: 'body',
      text: 'UNAUTHORIZED'
   }
   */
   
   if(!req.session.uid) res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
   req.session.destroy((err) => {
      if(err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
      res.status(StatusCodes.OK).send(ReasonPhrases.OK);
   })
};

export default { signup, login, logout };