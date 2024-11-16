import {useQuery} from "@tanstack/react-query";
import { getListaFavoritos } from "../services/favorito";

const useListaFavoritos = () => {
   const {data, isPending, isError, refetch} = useQuery({
      queryKey:["listaFavoritos"],
      queryFn: () => getListaFavoritos(),
   });
   return {favoritos:data, isPendingFetching:isPending, isError, refetchFavoritos:refetch};
}

export default useListaFavoritos;