

interface ItemCarrinhoProps {
   itemCarrinho: ItemCarrinho;
   removerItemCarrinho: (item: ItemCarrinho) => void;
}

export const ItemCarrinho = (props: ItemCarrinhoProps) => {
   return (
      <tr key={props.itemCarrinho.id}>
         <td>{props.itemCarrinho.nome}</td>
         <td>R$ {props.itemCarrinho.preco}</td>
         <td>{props.itemCarrinho.quantidade}</td>

         <td>R$ {props.itemCarrinho.preco}</td>
         <td>
            <button 
            className="btn btn-danger btn-sm"
            onClick={() => props.removerItemCarrinho(props.itemCarrinho)}
            >
               Remover
            </button>
         </td>
      </tr>
   )
}