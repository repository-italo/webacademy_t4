import {useQuery} from "@tanstack/react-query";
import { getListaFavoritos } from "../services/favorito";

const useListaFavoritos = () => {
   const {data, isPending, isError} = useQuery({
      queryKey:["listaFavoritos"],
      queryFn: () => getListaFavoritos(),
   });
   return {favoritos:data, isPending, isError};
}

export default useListaFavoritos;