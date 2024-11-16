
import { Produto } from "@/app/utils/types/Produto";
import Image from "next/image"
import useAddFavorito from "../../hooks/useAddFavorito";
import { toast } from "react-toastify";
interface CardProdutoProps {
  produto: Produto;
  adicionarProduto: (produto: Produto) => void
}

export const CardProduto = (props: CardProdutoProps) => {
   const {isPending, addFavorito} = useAddFavorito(
      () => toast.success("Produto favoritado com sucesso!"),
      () => toast.error("Algo deu errado ao favoritar")
   );
   return (
      <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={props.produto.fotos[0].src}
          className="card-img-top"
          alt={props.produto.fotos[0].titulo}
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
          <button 
          className="btn btn-light d-block w-100 mt-2"
          type="button"
          onClick={() => addFavorito(props.produto)}
          >
            {isPending ? "Favoritando" : "Favoritar"}
          </button>
        </div>
      </div>
    </div>
   )
}