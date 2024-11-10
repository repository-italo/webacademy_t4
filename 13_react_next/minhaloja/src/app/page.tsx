"use client";
import React, { useState } from "react";
import { ListagemProdutos, ResumoCarrinho } from "./components";


export default function Produtos(){

  const [valorCompra, setValorCompra] = useState<number>(0);
  const [quantidadeItens, setQuantidadeItens] = useState<number>(0);
  const adicionarProdutoCarrinho = (produto: Produto) => {
      setQuantidadeItens((quantidade) => quantidade + 1);
      setValorCompra((valor) => valor + parseFloat(produto.preco as string));
  }


  return (
    <>
      <main>

          <ResumoCarrinho 
          quantidadeTotal={quantidadeItens} 
          valorTotal={valorCompra} 
          />
          
          <ListagemProdutos 
          adicionarProduto={adicionarProdutoCarrinho} 
          />

      </main>
    </>
  );
}
