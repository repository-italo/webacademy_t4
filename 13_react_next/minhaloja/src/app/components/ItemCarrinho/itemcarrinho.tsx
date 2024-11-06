

interface ItemCarrinhoProps {
   produto: Produto;
}

export const ItemCarrinho = (props: ItemCarrinhoProps) => {
   return (
      <tr key={props.produto.id}>
         <td>{props.produto.nome}</td>
         <td>R$ {props.produto.preco}</td>
         <td>2</td>

         <td>R$ {props.produto.preco}</td>
         <td>
            <button className="btn btn-danger btn-sm">
               Remover
            </button>
         </td>
      </tr>
   )
}