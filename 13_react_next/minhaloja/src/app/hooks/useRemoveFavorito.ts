import { useMutation } from "@tanstack/react-query"
import { removeFavorito } from "../services/favorito"

const useRemoveFavorito = (onSuccess: () => void, onError: () => void) => {
   const {mutate, isPending} = useMutation({
      mutationFn: (id: string) => removeFavorito(id),
      onSuccess,
      onError
   });

   return {
      removeFavorito:mutate,
      isPending,
   }
};

export default useRemoveFavorito;