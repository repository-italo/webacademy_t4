
export interface Produto {
    id: string;
    nome: string;
    preco: number | string;
    quantidade: number;
    descricao: string;
    vendido: boolean;
    usuario_id: string;
    fotos: Array<Foto>;

}
