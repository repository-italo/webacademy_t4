
import Image from "next/image"

interface CardProdutoProps {
  produto: Produto;
  adicionarProduto: (produto: Produto) => void
}

export const CardProduto = (props: CardProdutoProps) => {
   return (
      <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src="/placeholder.png"
          className="card-img-top"
          alt="imagem placeholder"
          width={300}
          height={320}
        />

        <div className="card-body bg-light">
          <h5 className="card-title">{props.produto.nome}</h5>
          <p className="card-text text-secondary">R$ {props.produto.preco}</p>
          <button 
          className="btn btn-dark d-block w-100" 
          type="button" onClick={() => props.adicionarProduto(props.produto)}>
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
   )
}