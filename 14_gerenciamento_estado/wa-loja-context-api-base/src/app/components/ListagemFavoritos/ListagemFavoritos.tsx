import ItemFavorito from "../ItemFavorito/ItemFavorito";
import { useFavoritosContext } from "@/app/provider/FavoritosProvider";



export default function ListagemFavoritos() {
  const {favoritos, valorTotalFavoritos, isGetFavoritosPending, isFavoritosError} = useFavoritosContext();
   const valorTotal = valorTotalFavoritos();
  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-bold">Lista de favoritos:</h5>
        {isGetFavoritosPending &&
         ( <div className="spinner-border" role="status"></div>)
        }
        {isFavoritosError && (
          <div><h5>Algo deu</h5></div>
        )
        
        }
        {favoritos && (
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Desconto</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {favoritos.map((item) => (
                  <ItemFavorito
                    key={item.id}
                    itemFavorito={item}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) }
      </div>
      <div className="card-footer d-flex flex-column">
       {favoritos && 
        <small className="text-muted">
          Quantidade de produtos: {favoritos.length}
        </small>}

        <small className="text-muted">
          Valor total: R$ {valorTotal.toFixed(2)}
        </small>
      </div>
    </div>
  );
}
