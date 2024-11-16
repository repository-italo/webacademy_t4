import { Produto } from "../utils/types/Produto";
import {api} from "./api";


async function getListaProdutos(): Promise<Produto[]> {
   const response = await api.get<Produto[]>("/produto");
   return response.data;
}

async function getProdutoById(id: string): Promise<Produto>{
   const response = await api.get<Produto>(`/produto/${id}`);
   return response.data;
}


export {getListaProdutos, getProdutoById};