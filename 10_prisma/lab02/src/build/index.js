"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
async function main() {
    // 1 caso de uso - Cadastro de Usuario
    /*    const usuario = await prismaClient.cliente.create({
          data: {
             p_nome: "Roberto",
             s_nome: "Lucio",
             cpf: "789.234.123-90",
             data_nascimento: new Date("2005-05-10T00:00:00"),
             email: "lucio2005@gmail.com",
             num_celular: "9298445467890",
             
          }
       }) */
    // 2 caso de uso - cadastro de produto
    const novaCategoria = await prismaClient.categoria.create({ data: { nome: "Vestuario" } });
}
main();
