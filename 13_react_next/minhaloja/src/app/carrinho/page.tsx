"use client";
import React from "react";
import { ListagemCarrinho, ResumoCarrinho } from "../components";
import { produtosMock } from "../mocks/produtos";
export default function Carrinho() {


  const valorTotalProduto = (
    precoUnitario: number,
    quantidade: number
  ): number => precoUnitario * quantidade;

  return (
    <>
      <main>
        <ListagemCarrinho produtos={produtosMock} />
        <ResumoCarrinho quantidadeTotal={10} valorTotal={1500.00}  />
      </main>
    </>
  );
}