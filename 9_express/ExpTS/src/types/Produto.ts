export interface Produto{
    nome: string;
    id: number;
    preco: number;
    estoque: number;
}

//export type CreateProdutoDTO = Pick<Produto, "nome" | "preco" | "estoque">;

export type CreateProdutoDTO = Required<Omit<Produto, "id">>;