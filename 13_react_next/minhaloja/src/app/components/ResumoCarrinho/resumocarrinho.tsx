
interface ResumoCarrinhoProps {
  valorTotal: number;
  quantidadeTotal: number;
}

export const ResumoCarrinho = (props: ResumoCarrinhoProps) => {
    return (
        <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
              <p className="card-text fw-medium">Quantidade total: {props.quantidadeTotal}</p>
              <p className="card-text fw-medium">
                Valor total: R${props.valorTotal.toFixed(2)}
              </p>
            </div>
        </div>
    )
}