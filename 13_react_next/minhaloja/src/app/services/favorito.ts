import { Produto } from "../utils/types/Produto";
import { apiFavoritos } from "./api";


export async function getListaFavoritos(): Promise<Produto[]>{
   await new Promise((resolve) => setTimeout(resolve, 1000));
   const response = await apiFavoritos.get<Produto[]>("/favoritos/");
   return response.data;
}

export async function getFavoritoById(id: string): Promise<Produto>{
   const response = await apiFavoritos.get(`/favoritos/${id}`);
   return response.data;
}

export async function addProdutoFavorito(produto: Produto){
   await new Promise((resolve) => setTimeout(resolve, 1000));
   return apiFavoritos
   .post<Produto>("/favoritos", produto)
   .then((response) => response.data);
}

export async function removeFavorito (id: string){
   await new Promise((resolve) => setTimeout(resolve, 1000));
   return apiFavoritos
   .delete(`/favoritos/${id}`)
   .then((response) => response.status)
}