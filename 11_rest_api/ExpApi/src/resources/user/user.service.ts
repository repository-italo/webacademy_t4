import { User, Prisma} from "@prisma/client";
import { prismaClient } from "../../utils/prismaClient";
import { CreateUserDTO, UserWithoutId } from "./user.types";

const getAllUsers = async (): Promise<User[]> => {
   return await prismaClient.user.findMany();
}

const createUser = async (user: CreateUserDTO): Promise<UserWithoutId> =>{
   return await prismaClient.user.create({data: user});
}

const emailAlreadyHasUser = async (email: string):Promise<boolean> => {
   return !!(await prismaClient.user.findUnique({where:{email}}))
}

const readUserbyId = async (id: string): Promise<UserWithoutId | null> => {
   return await prismaClient.user.findUnique({where: {id}});
}

const updateUser = async (id: string, user: CreateUserDTO): Promise<UserWithoutId> => {
   return await prismaClient.user.update(
      {
         where:{id},
          data:user
      })
}

export default {getAllUsers, createUser, emailAlreadyHasUser, readUserbyId, updateUser};