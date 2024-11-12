"use client";
import React, { useEffect, useState } from "react";
import { ListagemCarrinho, ResumoCarrinho } from "../components";
import { mockItensCarrinho } from "@/app/mocks/itensCarrinho";
import { calculoQuantidadeTotal, calculoValorTotal } from "../utils/helpers/carrinhoHelpers";

export default function Carrinho() {
   const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>(mockItensCarrinho);
   const [valorCompra, setValorCompra] = useState<number>(0);
   const [quantidadeItens, setQuantidadeItens] = useState<number>(0);

   useEffect(() => {
      setQuantidadeItens(calculoQuantidadeTotal(itensCarrinho));
      setValorCompra(calculoValorTotal(itensCarrinho));
   }, [itensCarrinho]);

   const removerItemCarrinho = (id: string) => {
      setItensCarrinho((itens) => {
         return itens.filter(i => i.id != id);
      });
   }

  return (
    <>
      <main>
        <ResumoCarrinho quantidadeTotal={quantidadeItens} valorTotal={valorCompra}  />
        <ListagemCarrinho removerItemCarrinho={removerItemCarrinho} itens={itensCarrinho} />
      </main>
    </>
  );
}