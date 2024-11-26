import { screen, render } from "@testing-library/react";
import { FavoritosContext, useFavoritosContext } from "@/app/State/FavoritosProvider";
jest.mock("../../../State/FavoritosProvider", () => ({
    ...jest.requireActual("../../../State/FavoritosProvider"),
    useFavoritosContext: jest.fn(),
}))
describe("Listagem de Favoritos", () => {
    it("deve renderizar coretamente os Favoritos.", () => {
        const useFavoritosContextMock = useFavoritosContext as jest.Mock;
        
    })
})