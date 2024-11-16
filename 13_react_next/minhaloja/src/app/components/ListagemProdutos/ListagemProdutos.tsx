"use client";
import { useListaProdutos } from "@/app/hooks/useListaProdutos";
import { CardProduto } from "../CardProduto/cardproduto"
import { Produto } from "@/app/utils/types/Produto";
interface ListagemProdutosProps {
    adicionarProduto: (produtos: Produto) => void;
}


export const ListagemProdutos = (props: ListagemProdutosProps) => {
   const {produtos, isPending, isError} = useListaProdutos();
   if (isPending) return <h5 className="font-weight-bold">Caregando...</h5>;

   if (isError) return <h5 className="font-weight-bold">Ocorreu um erro ao carregar produtos.</h5>

   if(!produtos) return <h5 className="font-weight-bold">Não há produtos listados.</h5>
    return (
    <>
        <h5 className="mb-3">Produtos disponíveis:</h5>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">       
            {produtos!.map((produto) => {
                return <CardProduto 
                           key={produto.id} 
                           adicionarProduto={props.adicionarProduto} 
                           produto={produto} 
                        />
            })}
        </div>

    </>
    )
}