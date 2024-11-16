"use client";
import useListaFavoritos from "../hooks/useListaFavoritos";
import { ItemFavorito } from "../components"; 

export default function ListFavoritos (){
   const {favoritos, isPendingFetching, isError, refetchFavoritos} = useListaFavoritos();
   return (
      <div className="container p-5">
          <div className="card mb-4">
            <div className="row card-body">
              <h5 className="card-title mb-4 fw-light">
                Produtos Favoritados
              </h5>
              <div className="table-responsive">
                <table className="table ">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Valor </th>
                      <th>Opções</th>
                    </tr>
                  </thead>
                  <tbody>
                     {isPendingFetching && <p>Carregando...</p>}
                     {isError && <p>Algo deu errado.</p>} 
                     {favoritos && favoritos.map((favorito) => {
                        return <ItemFavorito
                                 key={favorito.id}
                                 favorito={favorito}
                                 refetchFavoritos={refetchFavoritos}
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