import { useMutation } from "@tanstack/react-query"
import { removeFavorito } from "../services/favoritos"

const useRemoveFavorito = (onSuccess: () => void, onError: () => void) => {
   const {mutate, isPending} = useMutation({
      mutationFn: (id: string) => removeFavorito(id),
      onSuccess,
      onError
   });

   return {
      removeFavorito:mutate,
      isRemoveFavoritoPending: isPending,
   }
};

export default useRemoveFavorito;