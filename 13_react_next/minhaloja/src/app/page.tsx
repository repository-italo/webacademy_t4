"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ListagemProdutos, ResumoCarrinho } from "./components";
import { produtosMock } from "./mocks/produtos";


export default function Produtos(){
  const [valorCompra, setValorCompra] = useState<number>(0);
  const [quantidadeItens, setQuantidadeItens] = useState<number>(0);

  const adicionarProdutoCarrinho = (produto: Produto) => {
    setQuantidadeItens((quantidade) => quantidade + 1);
    setValorCompra((valor) => valor + produto.preco);
  }

  const removerProdutoCarrinho = (produto: Produto) => {
    setQuantidadeItens((quantidadeItens) => quantidadeItens - 1);
  }

  return (
    <>
      <main>
          <ResumoCarrinho quantidadeTotal={quantidadeItens} valorTotal={valorCompra} />
          <ListagemProdutos adicionarProduto={adicionarProdutoCarrinho} produtos={produtosMock} />
      </main>
    </>
  );
}
