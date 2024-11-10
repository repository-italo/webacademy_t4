import { PrismaClient } from "@prisma/client";
import { UserTypes } from "../src/resources/usertype/usertype.constants";
const prismaClient = new PrismaClient();

async function main (){
   return await prismaClient.userType.createMany({
      data:[
         {id: UserTypes.ADMIN, label: "admin"},
         {id: UserTypes.CLIENT, label: "client"}
      ],
      skipDuplicates: true
   })
}

main().then(
   async () => {
      prismaClient.$disconnect();
   }
).catch(async (e) => {
   console.error(e);
   prismaClient.$disconnect();
})