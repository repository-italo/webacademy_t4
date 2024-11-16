import { useQuery } from "@tanstack/react-query"
import { getProdutoById } from "../services/produto"

const useSingleProduto = (id: string) => {
   const {data, isPending, isError} = useQuery({
      queryKey:["singleProduto", id],
      queryFn: () => getProdutoById(id),
   });
   return {
      produto:data,
      isError,
      isPending
   }
}

export default useSingleProduto;