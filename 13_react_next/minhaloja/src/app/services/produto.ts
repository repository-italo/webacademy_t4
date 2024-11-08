import api from "./api";


const getListaProdutos = async (): Promise<Produto[]> => {
   return api.get<Produto[]>("/produto").then((response) => response.data)
}

export {getListaProdutos};