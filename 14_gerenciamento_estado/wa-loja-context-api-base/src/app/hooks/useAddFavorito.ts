import { useMutation } from "@tanstack/react-query";
import { addFavorito } from "../services/favoritos";

export const useAddFavorito = (onSuccess: () => void, onError: () => void) => {
    const {mutate, isPending} = useMutation({
        mutationFn: (produto: Produto) => addFavorito(produto),
        onSuccess,
        onError
    });

    return {
        addFavorito: mutate,
        isAddFavoritoPending: isPending
    }
}