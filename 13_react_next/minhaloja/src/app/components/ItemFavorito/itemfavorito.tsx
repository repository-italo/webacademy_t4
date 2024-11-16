import useRemoveFavorito from "@/app/hooks/useRemoveFavorito";
import { Produto } from "@/app/utils/types/Produto"
import { toast } from "react-toastify";

interface ItemFavoritoProps {
   favorito: Produto;
   refetchFavoritos: () => void;
}

export const ItemFavorito = ({favorito, refetchFavoritos}: ItemFavoritoProps) => {

   const {removeFavorito, isPending} = useRemoveFavorito(
      () => {
         toast.success("Produto Favorito Removido com sucesso");
         refetchFavoritos();
      },
      () => toast.error("Algo deu errado")
   );
   return (
      <tr key={favorito.id}>
         <td>{favorito.nome}</td>
         <td>R$ {favorito.preco}</td>
         <td>
            <button 
            className="btn btn-danger btn-sm"
            onClick={() => removeFavorito(favorito.id)}
            >  
               {isPending ? "Removendo..." : "Remover"}
            </button>
         </td>
      </tr>
   )
}