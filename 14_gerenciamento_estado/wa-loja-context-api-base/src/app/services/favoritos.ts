import { api } from "./api";
async function getFavoritos(): Promise<Produto[] | []>{
    const response = await api.get<Produto[] | []>("/favoritos/");
    return response.data;
 }

async function addFavorito(favorito: Produto){
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return api.post<Produto>("/favoritos", favorito).then((response) => response.data);
}

async function removeFavorito(id: string): Promise<number>{
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await api.delete(`/favoritos/${id}`).then((response) => response.status);
};

export {getFavoritos, removeFavorito, addFavorito};