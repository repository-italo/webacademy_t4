import { User } from "@prisma/client";
import { prismaClient } from "../../utils/prismaClient";
import { CreateUserDTO } from "./user.types";

const getAllUsers = async (): Promise<User[]> => {
   return prismaClient.user.findMany();
}

const createUser: async (user: CreateUserDTO): Promise<User> =>{
   co
}