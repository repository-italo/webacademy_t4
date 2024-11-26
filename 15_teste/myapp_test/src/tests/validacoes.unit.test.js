const validacoes = require("../utils/validacoes.js");
describe("primeironome(),", () => {
    it("deve retornar o primeiro nome quando o nome completo é fornecido", () => {
        const fullName = "John Doe Etc";
        const result = validacoes.primeiroNome(fullName);
        expect(result).toBe("John");
    });

    it("deve retornar o mesmo nome quando não há espaço em branco", () => {
        const name = "Antonio";
        const result = validacoes.primeiroNome(name);
        expect(result).toBe(name);
    });

    it("deve retornar o primeiro nome corretamente quando há espaços em branco no início", () => {
        const name = " Antonio Test";
        const result = validacoes.primeiroNome(name);

        expect(result).toBe("Antonio");
    });

    it("deve retornar o primeiro nome corretamente quando há espaço em branco no final", () => {
        const name = "Antonio Lucio ";
        const result = validacoes.primeiroNome(name);

        expect(result).toBe("Antonio");
    })
})

describe("verificarDisponibilidadeEstoque(), ", () => {
    it("deve retornar false para quantidade de estoque igual a zero.", () => {
        const result = validacoes.verificarDisponibilidadeEstoque("livro", 20);
        const otherResult = validacoes.verificarDisponibilidadeEstoque("livro", 1);
        expect(result).toBeFalsy();
        expect(otherResult).toBeFalsy();
    });

    it("deve retornar true se quantidade for menor que a quantidade disponível.", () => {
        const result = validacoes.verificarDisponibilidadeEstoque("smartphone", 19);
        expect(result).toBeTruthy();
    });

    it("deve retornar true se quantidade for igual a quantidade disponível.", () => {
        const result = validacoes.verificarDisponibilidadeEstoque("smartphone", 20);
        expect(result).toBeTruthy();
    });

    it("deve retornar false se a quantidade exceder a quantidade disponível.", () => {
        const result = validacoes.verificarDisponibilidadeEstoque("headphone", 6);
        expect(result).toBeFalsy();
    });
});

describe("calculaPrecoTotal(),", () => {
    it("deve retornar o produto do preço pela quantidade dos produtos.", () => {
        const produtos = [
            {nome: "Celular", preco: 1500, quantidade: 4},
            {nome: "Geladeira", preco: 2000, quantidade: 6},
        ];

        const result = validacoes.calcularPrecoTotal(produtos);
        expect(result).toBe(1500*4 + 2000*6);
    });

    it("deve retornar zero quando for um array vazio.", () => {
        const produtos = [];

        const result = validacoes.calcularPrecoTotal(produtos);
        expect(result).toBe(0);
    });
})