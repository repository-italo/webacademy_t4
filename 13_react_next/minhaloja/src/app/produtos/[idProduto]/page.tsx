"use client";
import useSingleProduto from "@/app/hooks/useSingleProduto";
import Image from "next/image";
import { useParams } from "next/navigation"

export default function Produto (){
   const {idProduto} = useParams();
   const {produto, isError, isPending} = useSingleProduto(idProduto as string);

   
   return (
      <main>
        { produto && 
      <div className="container p-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>
  
              <h5 className="card-title mb-4 fw-bold">{produto.nome}</h5>
  
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
                  {produto.fotos.map((foto) => {
                     return <Image 
                              key={`${produto.id} - ${foto.titulo}`} 
                              src={foto.src} 
                              alt={foto.titulo} 
                              width={300} 
                              height={320} />
                  })}
              </div>
  
              <p className="card-text fw-medium">
                Valor: R${parseFloat(produto.preco as string).toFixed(2)}
              </p>
              <p className="card-text fw-medium">Descrição: {produto.descricao}</p>
              <p className="card-text fw-medium">Anunciado por: {produto.usuario_id}</p> 
            </div>
          </div>
        </div>}
      {isPending && <h5 className="card-title mb-4 fw-bold">Carregando...</h5>}
      {isError && <h5>Algo deu errado</h5>}
      </main>
      
    );
}