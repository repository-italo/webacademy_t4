import {screen, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockProdutos } from "@/app/mocks/produtos";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import ItemFavorito from "../ItemFavorito";

describe("ItemFavorito", () => {
    it("deve renderizar corretamente as informações de favorito", () => {
        const favoritoMock = mockProdutos[0];
        const {nome, preco, fotos, desconto, descricao} = favoritoMock;

        const precoComDesconto = calculaValorComPorcentagemDeDesconto(
            Number(preco),
            favoritoMock.desconto
        ).toFixed(2);
        render(
            <ItemFavorito itemFavorito={favoritoMock} setFavoritos={() => {}} />
        );

        expect(screen.getByText(nome)).toBeInTheDocument();
        expect(screen.getByText(descricao)).toBeInTheDocument();
        expect(screen.getByText(`R$ ${precoComDesconto}`)).toBeInTheDocument();
        expect(screen.getByText(`${desconto}%`)).toBeInTheDocument();
        expect(screen.getByAltText(fotos[0].titulo)).toBeInTheDocument();

    });

    it("deve ser possível clicar no botão Remover.", async () => {
        const setFavoritos = jest.fn();

        render(
            <ItemFavorito 
                itemFavorito={mockProdutos[0]} 
                setFavoritos={setFavoritos} />
        );

        const botao = screen.getByRole("button", {
            name: /Remover/i,
        });
        await userEvent.click(botao);
        expect(setFavoritos).toHaveBeenCalled();
    })
})