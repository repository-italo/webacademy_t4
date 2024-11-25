import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import { useFavoritosContext } from "@/app/provider/FavoritosProvider";
import Image from "next/image";

interface IItemFavoritoProps {
  itemFavorito: Produto;
}

export default function ItemFavorito({
  itemFavorito,
}: IItemFavoritoProps) {
  const {removerDosFavoritos, isRemoveFavoritoPending} = useFavoritosContext();

  return (
    <tr key={itemFavorito.id}>
      <td className="d-flex flex-row">
        <Image
          className="rounded"
          src={itemFavorito.fotos[0].src}
          alt={itemFavorito.fotos[0].titulo}
          width={50}
          height={50}
        />
        <div className="d-flex flex-column ms-2">
          <span className="">{itemFavorito.nome}</span>
          <small className="text-muted">{itemFavorito.descricao}</small>
        </div>
      </td>

      <td>
        R${" "}
        {calculaValorComPorcentagemDeDesconto(
          Number(itemFavorito.preco),
          itemFavorito.desconto
        ).toFixed(2)}
      </td>

      <td>{itemFavorito.desconto}%</td>

      <td>
        <button
          onClick={() => removerDosFavoritos(itemFavorito.id)}
          className="btn btn-outline-danger btn-sm"
          disabled={isRemoveFavoritoPending}
        >
          {isRemoveFavoritoPending ? "Removendo" : "Remover"}
        </button>
      </td>
    </tr>
  );
}
