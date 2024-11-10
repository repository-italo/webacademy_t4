import { useQuery } from "@tanstack/react-query";
import {getListaProdutos}  from "../services/produto";


const useListaProdutos = () => {
   const {data, isPending, isError} = useQuery({
      queryKey: ["listaProdutos"],
      queryFn: () => getListaProdutos(),
   })
   return {produtos:data, isPending, isError};
}

export {useListaProdutos};