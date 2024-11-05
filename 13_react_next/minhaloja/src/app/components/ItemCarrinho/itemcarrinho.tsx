export const ItemCarrinho = ({item}) => {
   return (
      <tr key="1">
         <td>{item.nome}</td>
         <td>R$ {item.preco}</td>
         <td>2</td>

         <td>R$ {}</td>
         <td>
            <button className="btn btn-danger btn-sm">
               Remover
            </button>
         </td>
      </tr>
   )
}