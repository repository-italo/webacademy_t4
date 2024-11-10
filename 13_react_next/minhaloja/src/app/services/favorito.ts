import { apiFavoritos } from "./api";


export async function getListaFavoritos(): Promise<Produto[]>{
   const response = await apiFavoritos.get("/favoritos");
   return response.data;
}

export async function getFavoritoById(id: string): Promise<Produto>{
   const response = await apiFavoritos.get(`/favoritos/${id}`);
   return response.data;
}

