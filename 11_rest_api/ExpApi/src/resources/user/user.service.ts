import { User } from "@prisma/client";
import { prismaClient } from "../../utils/prismaClient";
import { CreateUserDTO, UserWithoutId } from "./user.types";
import { genSalt, hash } from "bcrypt";

const getAllUsers = async (): Promise<User[]> => {
   return await prismaClient.user.findMany();
}

const createUser = async (user: CreateUserDTO): Promise<User> =>{
   const salt = await genSalt(parseInt(process.env.SALT_ROUNDS!));
   const password = await hash(user.password, salt);
   return await prismaClient.user.create({data: {...user, password}});
}

const emailAlreadyHasUser = async (email: string):Promise<boolean> => {
   return !!(await prismaClient.user.findUnique({where:{email}}))
}

const readUserbyId = async (id: string): Promise<User | null> => {
   return await prismaClient.user.findUnique({where: {id}});
}

const updateUser = async (id: string, user: CreateUserDTO): Promise<User> => {
   return await prismaClient.user.update(
      {
         where:{id},
          data:user
      })
}

const removeUser = async (id: string): Promise<number> => {
   try {
      await prismaClient.user.delete({where: {id}});
      return 1;
   } catch (error) {
      return 0;
   }
   
}

export default {getAllUsers, createUser, emailAlreadyHasUser, readUserbyId, updateUser, removeUser};