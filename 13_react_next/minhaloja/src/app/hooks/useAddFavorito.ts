import {useMutation} from "@tanstack/react-query"
import {addProdutoFavorito} from "../services/favorito"
import { Produto } from "../utils/types/Produto";

const useAddFavorito = (onSuccess: () => void, onError: () => void) => {
   const {mutate, isPending} = useMutation({
      mutationFn: (produto: Produto) => addProdutoFavorito(produto),
      onSuccess,
      onError,
   });

   return {
      addFavorito: mutate,
      isPending,
   }
};

export default useAddFavorito;