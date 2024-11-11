import { LoginDTO } from "./auth.types";
import userService from "../user/user.service";
import { prismaClient } from "../../utils/prismaClient";
import { compare } from "bcrypt";
import { User } from "@prisma/client";

const checkCredentials = async (credentials: LoginDTO): Promise<User | undefined> => {
   const user = await prismaClient.user.findUnique({where: {email: credentials.email}});
   if(!user){
      return;
   }  
   const isOk = await compare(credentials.password, user.password);
   if(!isOk){
      return;
   }
   return user;
}

export default { checkCredentials };