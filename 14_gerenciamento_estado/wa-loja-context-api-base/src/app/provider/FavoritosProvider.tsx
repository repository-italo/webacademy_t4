"use client";
import { createContext, useContext, useEffect} from "react";
import { calculaValorComPorcentagemDeDesconto } from "../helpers";
import useFavoritos from "../hooks/useFavoritos";
import { useAddFavorito } from "../hooks/useAddFavorito";
import { toast } from "react-toastify";
import useRemoveFavorito from "../hooks/useRemoveFavorito";

interface IFavoritosContext{
   favoritos: Produto[] | [];
   verificarSeFavorito: (id: string) => boolean;
   valorTotalFavoritos: () => number;
   isAddFavoritoPending: boolean;
   isRemoveFavoritoPending: boolean;
   isGetFavoritosPending: boolean
   adicionarAosFavoritos: (favorito: Produto) => void;
   removerDosFavoritos: (id: string) => void;
   isFavoritosError: boolean;
}

interface IFavoritosProvider{
   children: React.ReactNode;
}

const FavoritosContext = createContext<IFavoritosContext>({
   favoritos: [],
   verificarSeFavorito: () => false,
   valorTotalFavoritos: () => 0,
   isAddFavoritoPending: false,
   isRemoveFavoritoPending: false,
   isGetFavoritosPending: false,
   isFavoritosError: false,
   adicionarAosFavoritos: () => {},
   removerDosFavoritos: () => {}
})

export const FavoritosProvider = (
   {children}: IFavoritosProvider
) => {
   const {favoritos, isGetFavoritosPending, refetchFavoritos, isFavoritosError} = useFavoritos();

   const {addFavorito, isAddFavoritoPending} = useAddFavorito(
      () => {
         refetchFavoritos();
         toast.success("Adição de Favorito concluída com sucesso.");
      },
      () =>  {
         toast.error("Algo deu errado!");
      }
   );

   const adicionarAosFavoritos = (favorito: Produto) => {
      addFavorito(favorito);
   }
   const removerDosFavoritos = (id: string) => {
      removeFavorito(id);
   }

   const {removeFavorito, isRemoveFavoritoPending} = useRemoveFavorito(
      () => {
         refetchFavoritos();
         toast.success("Remoção de Favorito Concluída com sucesso");
      },
      () => {
         toast.error("Algo deu errado!");
      }
   );
   const verificarSeFavorito = (id: string) => {
      return (favoritos as Produto[]).some((item) => item.id === id);
   };
   const valorTotalFavoritos = () => {
      const total = favoritos!.reduce((total, item) => {
         return (total + calculaValorComPorcentagemDeDesconto(
            parseFloat(item.preco), item.desconto))
      }, 0);
      return total;
   }
   const value = {
      favoritos, 
      verificarSeFavorito,
      valorTotalFavoritos,
      isAddFavoritoPending,
      isRemoveFavoritoPending,
      isGetFavoritosPending,
      adicionarAosFavoritos,
      removerDosFavoritos,
      isFavoritosError,
   };
   return (
      <FavoritosContext.Provider value={value}>
         {children}
      </FavoritosContext.Provider>
   )
}

export const useFavoritosContext = () => {
   const context = useContext(FavoritosContext);
   return context;
}