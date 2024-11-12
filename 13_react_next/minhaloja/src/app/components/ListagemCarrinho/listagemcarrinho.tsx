import { ItemCarrinho } from "../ItemCarrinho/itemcarrinho"

interface ListagemCarrinhoProps {
  itens: Array<ItemCarrinho>;
  removerItemCarrinho: (id: string) => void;
}


export const ListagemCarrinho = (props: ListagemCarrinhoProps) => {
   return (
      <div className="container p-5">
          <div className="card mb-4">
            <div className="row card-body">
              <h5 className="card-title mb-4 fw-light">
                Produtos selecionados
              </h5>
              <div className="table-responsive">
                <table className="table ">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Valor Unitário</th>
                      <th>Quantidade</th>
                      <th>Valor Total</th>
                      <th>Opções</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        props.itens.map((item) => {
                           return <ItemCarrinho 
                                       removerItemCarrinho={props.removerItemCarrinho} 
                                       itemCarrinho={item} 
                                       key={item.id} 
                                       />
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
   )
}