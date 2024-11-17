"use client";
import { createContext, SetStateAction, useContext, useEffect, useState } from "react";
import { calculaValorComPorcentagemDeDesconto } from "../helpers";

interface IFavoritosContext{
   favoritos: Produto[] | [];
   setFavoritos: React.Dispatch<SetStateAction<Produto[]>>;
   verificarSeFavorito: (id: string) => boolean;
   adicionarAosFavoritos: (produto: Produto) => void;
   removerDosFavoritos: (id: string) => void;
   valorTotalFavoritos: () => number;
}

interface IFavoritosProvider{
   children: React.ReactNode;
}

const FavoritosContext = createContext<IFavoritosContext>({
   favoritos: [],
   setFavoritos: () => {},
   verificarSeFavorito: () => false,
   adicionarAosFavoritos: () => {},
   removerDosFavoritos: () => {},
   valorTotalFavoritos: () => 0,
})

export const FavoritosProvider = (
   {children}: IFavoritosProvider
) => {
   const [favoritos, setFavoritos] = useState<Produto[]>([]);
   useEffect(() => {
      const favoritosLocalStorage = localStorage.getItem("favoritos");

      if(favoritosLocalStorage){
         setFavoritos(JSON.parse(favoritosLocalStorage));
      }
   }, [])
   const verificarSeFavorito = (id: string) => {
      return favoritos.some((item) => item.id === id);
   };

   const adicionarAosFavoritos = (produto: Produto) => {
      const novosFavoritos = [...favoritos, produto];
      setFavoritos(novosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
   };
   const removerDosFavoritos = (id: string) => {
      const novosFavoritos = favoritos.filter((item) => item.id != id);
      setFavoritos(novosFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
   }
   const valorTotalFavoritos = () => {
      const total = favoritos.reduce((total, item) => {
         return (total + calculaValorComPorcentagemDeDesconto(
            parseFloat(item.preco), item.desconto))
      }, 0);
      return total;
   }
   const value = {
      favoritos, 
      setFavoritos,
      verificarSeFavorito,
      adicionarAosFavoritos,
      removerDosFavoritos,
      valorTotalFavoritos
   };
   return (
      <FavoritosContext.Provider value={value}>
         {children}
      </FavoritosContext.Provider>
   )
}

export const useFavoritos = () => {
   const context = useContext(FavoritosContext);
   return context;
}
