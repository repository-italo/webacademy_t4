import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();

const doc = {

   definitions: {
      CreateProductDTO: {
         name: "Martelo",
         price: 70.0,
         stockQuantity: 50,
      },
      Product: {
         id: "0faa000a-3dca-41ae-aa2e-58fcf1ac260e",
         name: "Martelo",
         price: 70.0,
         stockQuantity: 50,
         createdAt: "2024-11-10T03:51:29.633Z",
         updatedAt: "2024-11-10T03:51:29.633Z"
      },
      "Products":
         [
            {
              id: "0faa000a-3dca-41ae-aa2e-58fcf1ac260e",
              name: "Handmade Plastic Tuna",
              price: 400.50,
              stockQuantity: 50,
              createdAt: "2024-11-10T03:51:29.633Z",
              updatedAt: "2024-11-10T03:51:29.633Z"
            },
            {
              id: "1bbb111b-4eed-52bd-bb3f-69edf2bd370f",
              name: "Rustic Cotton Chair",
              price: 149.99,
              stockQuantity: 20,
              createdAt: "2024-11-10T04:15:20.456Z",
              updatedAt: "2024-11-10T04:15:20.456Z"
            },
            {
              id: "2ccc222c-5fff-63ce-cc4f-70f0g3ce480g",
              name: "Ergonomic Wooden Desk",
              price: 899.00,
              stockQuantity: 10,
              createdAt: "2024-11-10T05:00:00.000Z",
              updatedAt: "2024-11-10T05:00:00.000Z"
            }
          ],

      CreateUserDTO: {
	      firstName: "Thora",
	      lastName: "Prosacco",
	      email: "Eddie_Koch30@gmail.com",
	      password: "gW2tFtX3_yxFIDr",
	      userTypeId: "d12f4fa0-f970-442b-9430-7818b8d91808",
       },
      User: {
         id: "10f30194-e960-4efb-9d4a-f9336f8992b9",
	      firstName: "Thora",
	      lastName: "Prosacco",
	      email: "Eddie_Koch30@gmail.com",
	      password: "gW2tFtX3_yxFIDr",
	      userTypeId: "d12f4fa0-f970-442b-9430-7818b8d91808",
	      createdAt: "2024-11-10T15:31:54.842Z",
	      updatedAt: "2024-11-10T15:31:54.842Z"
       },
       "Users": [
         {
            "id": "10f30194-e960-4efb-9d4a-f9336f8992b9",
            "firstName": "Thora",
            "lastName": "Prosacco",
            "email": "Eddie_Koch30@gmail.com",
            "password": "gW2tFtX3_yxFIDr",
            "userTypeId": "d12f4fa0-f970-442b-9430-7818b8d91808",
            "createdAt": "2024-11-10T15:31:54.842Z",
            "updatedAt": "2024-11-10T15:31:54.842Z"
         },
         {
            "id": "802bc4be-7aa5-4823-9678-31effeda075b",
            "firstName": "Keenanzee",
            "lastName": "Herzog",
            "email": "Russtat16@hotmail.com",
            "password": "yzffGuBSDT8_JvO",
            "userTypeId": "d12f4fa0-f970-442b-9430-7818b8d91808",
            "createdAt": "2024-11-10T04:17:41.329Z",
            "updatedAt": "2024-11-10T04:19:23.993Z"
         }
       ],
       SignUpDTO: {
            firstName: "Thora",
            lastName: "Prosacco",
            email: "Eddie_Koch30@gmail.com",
            password: "gW2tFtX3_yxFIDr",
       },
       LoginDTO: {
            email: "Felix_Stracke@gmail.com",
            password: "123456"
       },
       ChangeLanguageDTO: {
         lang: 'pt-BR',
      }

      

         
   },

   info: {
      title: "Api da Loja Virtual WebAcademy",
      description: "Documentação da API", 
   },
   host: `${process.env.HOST}:${process.env.PORT}`, 
};

const outPutFile = "./swagger-output.json";
const routes = ["./src/router/index.ts"];

swaggerAutogen()(outPutFile, routes, doc);