"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const prismaClient = new client_1.PrismaClient();
;
const getNomeCliente = async (id) => {
    const cliente = await prismaClient.cliente.findUnique({
        where: {
            id: id
        }
    });
    console.log(`Nome do Cliente Selecionado: ${cliente?.p_nome} `);
};
const produtoByName = async (nome) => {
    const produto = await prismaClient.produto.findFirst({
        where: {
            nome,
        }
    });
    console.log(produto);
};
const pegarComprasCliente = async (id) => {
    try {
        const cliente = await prismaClient.cliente.findUnique({
            where: {
                id,
            },
            select: {
                compras: true
            }
        });
        console.log(cliente.compras);
    }
    catch (err) {
        console.error(err);
    }
};
const criarCliente = async (p_nome, s_nome, cpf, data_nascimento, email, num_celular) => {
    try {
        const usuario = await prismaClient.cliente.create({
            data: {
                p_nome: p_nome,
                s_nome: s_nome,
                cpf: cpf,
                data_nascimento: data_nascimento,
                email: email,
                num_celular: num_celular
            }
        });
        console.log("Novo usuário criado (ID):", usuario.id);
        return usuario;
    }
    catch (error) {
        console.error("Erro ao criar usuário:", error);
    }
};
const criarCategoria = async (nome) => {
    try {
        const categoria = await prismaClient.categoria.create({
            data: {
                nome,
            }
        });
        return categoria;
    }
    catch (err) {
        console.log(err);
    }
};
const criarFabricante = async (nome) => {
    try {
        const fabricante = await prismaClient.fabricante.create({
            data: {
                nome,
            }
        });
        return fabricante;
    }
    catch (err) {
        console.log(err);
    }
};
const criarSubCategoria = async (nome, categoria_id) => {
    try {
        const subcategoria = await prismaClient.subCategoria.create({
            data: {
                nome,
                categoria_id,
            }
        });
        return subcategoria;
    }
    catch (err) {
        console.log(err);
    }
};
const criarProduto = async (nome, preco_base, sub_categoria_id, categoria_id, fabricante_id) => {
    try {
        const novoProduto = await prismaClient.produto.create({
            data: {
                nome: nome,
                preco_base: preco_base,
                sub_categoria_id: sub_categoria_id,
                categoria_id: categoria_id,
                fabricante_id: fabricante_id
            }
        });
        console.log("Novo produto criado (ID):", novoProduto.id);
        return novoProduto;
    }
    catch (error) {
        console.error("Erro ao criar produto:", error);
    }
};
const criarModelo = async (serie_modelo, produto_id) => {
    try {
        const modelo = await prismaClient.modelo.create({
            data: {
                serie_modelo,
                produto_id,
            }
        });
        return modelo;
    }
    catch (err) {
        console.log(err);
    }
};
const criarEndereco = async (cliente_id, rua, numero, cep, endereco, complemento, cidade, estado, bairro) => {
    try {
        const novoEndereco = await prismaClient.endereco.create({
            data: {
                rua: rua,
                numero: numero,
                cep: cep,
                endereco: endereco,
                complemento: complemento,
                cidade: cidade,
                estado: estado,
                bairro: bairro,
                cliente_id: cliente_id
            }
        });
        console.log("Novo endereço criado (ID):", novoEndereco.id);
        return novoEndereco;
    }
    catch (error) {
        console.error("Erro ao criar endereço:", error);
    }
};
const criarCompra = async (endereco_id, cliente_id, desconto, itensCompra) => {
    try {
        let preco_final = new library_1.Decimal(0.00);
        // Iterar sobre os itens e calcular o preço final dinamicamente
        for (const item of itensCompra) {
            const produto = await prismaClient.produto.findUnique({
                where: { id: item.produto_id },
                select: { preco_base: true }
            });
            if (produto) {
                const totalItem = produto.preco_base.times(item.quantidade);
                preco_final = preco_final.plus(totalItem);
            }
        }
        preco_final = preco_final.minus(desconto);
        const compra = await prismaClient.compra.create({
            data: {
                cliente_id: cliente_id,
                endereco_id: endereco_id,
                desconto: desconto,
                preco_final: preco_final,
                itensCompra: {
                    create: itensCompra
                }
            },
        });
        console.log("Nova compra criada (ID):", compra.id);
        return compra;
    }
    catch (error) {
        console.error("Erro ao criar compra:", error);
    }
};
const editarNomeProdutoPorId = async (id, nome) => {
    const produto = await prismaClient.produto.update({
        where: {
            id,
        },
        data: {
            nome: nome
        }
    });
};
const editarSubCategoriaProdutoPorId = async (id, sub_categoria_id) => {
    const produto = await prismaClient.produto.update({
        where: {
            id,
        },
        data: {
            sub_categoria_id: sub_categoria_id
        }
    });
};
const removerProdutoId = async (id) => {
    const produto = await prismaClient.produto.delete({
        where: {
            id
        }
    });
};
const editarCategoria = async (id, nome) => {
    try {
        const categoria = await prismaClient.categoria.update({
            where: {
                id,
            },
            data: {
                nome,
            }
        });
        console.log(categoria);
    }
    catch (err) {
        console.error(err);
    }
};
const removerCategoria = async (id) => {
    try {
        const produtos = await prismaClient.produto.findMany({
            where: {
                categoria_id: id,
            },
        });
        if (produtos.length > 0) {
            console.error("There's products in this category, leading to inconsistencies");
            return;
        }
        else {
            await prismaClient.categoria.delete({
                where: {
                    id
                }
            });
        }
    }
    catch (err) {
        console.error(err);
    }
};
const editarSubCategoria = async (id, nome) => {
    try {
        const subcategoria = await prismaClient.subCategoria.update({
            where: {
                id,
            },
            data: {
                nome,
            }
        });
        console.log(subcategoria);
    }
    catch (err) {
        console.error(err);
    }
};
const editarSubCategoriaCategoria = async (id, novaCategoria_id) => {
    try {
        const produtos = await prismaClient.produto.findMany({
            where: {
                sub_categoria_id: id,
            },
        });
        if (produtos.length > 0) {
            console.error("This will lead to serius misconducts");
            return;
        }
        const subCategoria = await prismaClient.subCategoria.update({
            where: {
                id,
            },
            data: {
                categoria_id: novaCategoria_id
            }
        });
    }
    catch (err) {
        console.error(err);
    }
};
const removerSubCategoria = async (id) => {
    try {
        const produtos = await prismaClient.produto.findMany({
            where: {
                categoria_id: id,
            },
        });
        if (produtos.length > 0) {
            console.error("There's products in this subcategory, leading to inconsistencies");
            return;
        }
        else {
            await prismaClient.subCategoria.delete({
                where: {
                    id
                }
            });
        }
    }
    catch (err) {
        console.error(err);
    }
};
const atualizarItensCompra = async (id, itensCompra) => {
    try {
        //Calcula o preco final com base nos novos 
        const precoTotal = itensCompra.reduce((total, item) => {
            const precoUnitario = item.data.preco_unitario || 0;
            return total + item.data.quantidade * precoUnitario;
        }, 0);
        // Atualiza a compra com os novos itens de compra e o preço total calculado
        const compraAtualizada = await prismaClient.compra.update({
            where: {
                id,
            },
            data: {
                itensCompra: {
                    update: itensCompra,
                },
                preco_final: precoTotal, // Atualizando o preço total calculado
            },
            include: {
                itensCompra: true, // Inclui os itens de compra atualizados na resposta
            },
        });
        console.log(compraAtualizada); // Retorna a compra atualizada
    }
    catch (err) {
        console.error('Erro ao atualizar itens de compra e preço:', err);
        throw err;
    }
};
const removerCompra = async (idCliente, idCompra) => {
    try {
        await prismaClient.compra.delete({
            where: {
                id: idCompra,
                cliente_id: idCliente
            },
        });
    }
    catch (error) {
        console.error(error);
    }
};
async function main() {
    // Cadastro de usuario
    const usuario = await criarCliente("Roberto", "Lucio", "123.456.678-90", new Date("2005-05-10T00:00:00"), "lucio2004@gmail.com", "9298445467880");
    //Cadastro de Endereco
    const endereco = await criarEndereco(usuario.id, // ID do cliente
    "Rua Coroa de Espinhos", 124, "69798560", "Rua Coroa de Espinhos, 124", "Proximo a Igreja Adventista", "Manaus", "Amazonas", "Coroado");
    //Cadastro de Categoria 
    const categoria = await criarCategoria("Vestuário");
    // Cadastro de SubCategoria
    const subCategoria = await criarSubCategoria("Roupas de Inverno", categoria.id);
    //Cadastro de Fabricante
    const fabricante = await criarFabricante("Alfa Confecções");
    //Cadastro de Produto
    const produto = await criarProduto("Casaco de Veludo", new library_1.Decimal(299.99), subCategoria.id, categoria.id, fabricante.id);
    //Cadastro de Modelos
    const modelo = await criarModelo("Azul M", produto.id);
    //Cadastro de Compra
    const compra = await criarCompra(usuario.id, endereco.id, new library_1.Decimal(20.00), [{
            modelo_id: modelo.id,
            produto_id: modelo.produto_id,
            quantidade: 3,
        }]);
    console.log(compra);
}
/*  atualizarItensCompra(1, [{
   where: {
      id: 1,
   },
   data: {
      quantidade: 4,
      preco_unitario: 400
   },
}]).then(async () => {
   await prismaClient.$disconnect();
}).catch(async (err) => {
   console.log(err);
   await prismaClient.$disconnect();
}) */
removerCompra(1, 1).then(async () => {
    await prismaClient.$disconnect();
}).catch(async (err) => {
    console.log(err);
    await prismaClient.$disconnect();
});
/* pegarComprasCliente(1).then(async () => {
   await prismaClient.$disconnect();
}).catch(async (err) => {
   console.log(err);
   await prismaClient.$disconnect();
}) */
/* main().then( async () =>{
   await prismaClient.$disconnect();
}).catch(async(e) => {
   console.log(e);
   await prismaClient.$disconnect();
}); */ 
