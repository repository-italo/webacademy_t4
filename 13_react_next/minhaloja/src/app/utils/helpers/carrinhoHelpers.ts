const calculoValorTotal = (itens: ItemCarrinho[]) =>{
   return itens.reduce((total, item) => {
      return total + item.preco * item.quantidade;
   },0)
}
const calculoQuantidadeTotal = (itens: ItemCarrinho[]) =>{
   return itens.reduce((total, item) => {
      return total + item.quantidade;
   },0)
}

export {calculoQuantidadeTotal, calculoValorTotal};