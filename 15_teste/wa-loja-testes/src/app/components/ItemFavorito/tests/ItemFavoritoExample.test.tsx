import {screen, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockProdutos } from "@/app/mocks/produtos";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import ItemFavorito from "../ItemFavorito";
import { exec } from "child_process";
describe("ItemFavorito", () => {
    it("deve renderizarr corretamente as informações de favorito", () => {
        const favoritoMock = mockProdutos[0];
        const {nome, preco, fotos, desconto, descricao} = favoritoMock;

        const precoComDesconto = calculaValorComPorcentagemDeDesconto(
            Number(favoritoMock.preco),
            favoritoMock.desconto
        ).toFixed(2);
        render(
            <ItemFavorito itemFavorito={favoritoMock} setFavoritos={() => {}} />
        )

        expect(screen.getByText(nome)).toBeInTheDocument();
        expect(screen.getByText(descricao)).toBeInTheDocument();
        expect(screen.getByText(`R$ ${precoComDesconto}`)).toBeInTheDocument();
        expect(screen.getByText(`${desconto}%`)).toBeInTheDocument();
        expect(screen.getByAltText(fotos[0].titulo)).toBeInTheDocument();

    });

    it("deve ser possível clicar no botão Remover.", async () => {
        const setFavoritos = jest.fn();
    })
})