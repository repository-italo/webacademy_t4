import { useQuery } from "@tanstack/react-query";
import { getFavoritos } from "../services/favoritos";

function useFavoritos(){
    const {data, isPending, isError, refetch} = useQuery<Produto[]>({
        queryKey:["listaFavoritos"],
        queryFn: () => getFavoritos(),
    });

    return {
        favoritos: data || [], 
        isFavoritosError: isError, 
        isGetFavoritosPending: isPending,
        refetchFavoritos: refetch
    };
}

export default useFavoritos;

