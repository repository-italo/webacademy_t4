import { CardProduto } from "../CardProduto/cardproduto"


interface ListagemProdutosProps {
    produtos: Array<Produto>;
    adicionarProduto: (produtos: Produto) => void;
}


export const ListagemProdutos = (props: ListagemProdutosProps) => {
    return (
    <>
        <h5 className="mb-3">Produtos disponíveis:</h5>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">       
            {props.produtos.map((produto) => {
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