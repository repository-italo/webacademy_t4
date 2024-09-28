"use strict";
class Produto {
    constructor(id, modelo, fabricante, valor) {
        this.id = id;
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.valor = valor;
    }
}
class Tv extends Produto {
    constructor(id, modelo, fabricante, valor, polegadas) {
        super(id, modelo, fabricante, valor);
        this.id = id;
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.valor = valor;
        this.polegadas = polegadas;
    }
}
class Celular extends Produto {
    constructor(id, modelo, fabricante, valor, memoria) {
        super(id, modelo, fabricante, valor);
        this.id = id;
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.valor = valor;
        this.memoria = memoria;
    }
}
class Bicicleta extends Produto {
    constructor(id, modelo, fabricante, valor, tamAro) {
        super(id, modelo, fabricante, valor);
        this.id = id;
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.valor = valor;
        this.tamAro = tamAro;
    }
}
class ProdutoFactory {
    static criarProduto(tipo, dados) {
        switch (tipo) {
            case "TV":
                return new Tv(dados.id, dados.modelo, dados.fabricante, dados.valor, dados.polegadas);
            case "Celular":
                return new Celular(dados.id, dados.modelo, dados.fabricante, dados.valor, dados.memoria);
            case "Bicicleta":
                return new Bicicleta(dados.id, dados.modelo, dados.fabricante, dados.valor, dados.tamAro);
            default:
                throw new Error("Tipo de produto desconhecido");
        }
    }
}
const produtos = [
    ProdutoFactory.criarProduto("TV", {
        id: 1,
        modelo: "Samsung QLED",
        fabricante: "Samsung",
        valor: 2999.99,
        polegadas: 55
    }),
    ProdutoFactory.criarProduto("Celular", {
        id: 2,
        modelo: "iPhone 13",
        fabricante: "Apple",
        valor: 5999.99,
        memoria: "128GB"
    }),
    ProdutoFactory.criarProduto("Bicicleta", {
        id: 3,
        modelo: "Caloi Elite",
        fabricante: "Caloi",
        valor: 1499.99,
        tamAro: 29
    }),
    ProdutoFactory.criarProduto("Celular", {
        id: 4,
        modelo: "Xiaomi Mi 14",
        fabricante: "Xiaomi",
        valor: 2499.99,
        memoria: "512GB",
    })
];
class Carrinho {
    constructor() {
        this.produtos = [];
        this.observers = [];
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    notifyObservers() {
        this.observers.forEach(observer => observer.update());
    }
    adicionarProduto(produto) {
        this.produtos.push(produto);
        this.notifyObservers();
    }
    removerProduto(produto) {
        const index = this.produtos.indexOf(produto);
        if (index !== -1) {
            this.produtos.splice(index, 1);
            this.notifyObservers();
        }
    }
    limparCarrinho() {
        this.produtos = [];
        this.notifyObservers();
    }
    calcularTotal() {
        return this.produtos.reduce((total, produto) => total + produto.valor, 0);
    }
}
const carrinho = new Carrinho();
const produtoContainer = (produto) => {
    const element = document.createElement("li");
    element.classList.add("list-group-item");
    if (produto instanceof Celular) {
        element.innerHTML = `${produto.modelo},
       ${produto.memoria} - <strong>R$${produto.valor}</strong>
       <button class="btn btn-primary btn-sm float-right">Adicionar</button>`;
    }
    if (produto instanceof Tv) {
        element.innerHTML = `${produto.modelo}
       ${produto.polegadas}' - <strong>R$${produto.valor}</strong>
       <button class="btn btn-primary btn-sm float-right">Adicionar</button>`;
    }
    if (produto instanceof Bicicleta) {
        element.innerHTML = `${produto.modelo}, ${produto.tamAro}'' 
      - <strong>R$${produto.valor}</strong>
       <button class="btn btn-primary btn-sm float-right">Adicionar</button>`;
    }
    const addButton = element.querySelector("button");
    addButton?.addEventListener("click", () => carrinho.adicionarProduto(produto));
    return element;
};
const itemCarrinho = (produto) => {
    const element = document.createElement("li");
    element.classList.add("list-group-item");
    element.innerHTML = `${produto.modelo} - R$${produto.valor}
       <button class="btn btn-danger btn-sm float-right">Remover</button>`;
    const removeButton = element.querySelector("button");
    removeButton?.addEventListener("click", () => carrinho.removerProduto(produto));
    return element;
};
const renderizarProdutos = () => {
    const ulProdutos = document.getElementById("product-list");
    ulProdutos.innerHTML = '';
    produtos.forEach((produto) => {
        ulProdutos?.appendChild(produtoContainer(produto));
    });
};
const renderizarCarrinho = () => {
    const ulCarrinho = document.getElementById("cart-list");
    ulCarrinho.innerHTML = '';
    carrinho.produtos.forEach((produto) => {
        ulCarrinho?.appendChild(itemCarrinho(produto));
    });
    const totalElement = document.getElementById("total-value");
    totalElement.innerText = `${carrinho.calcularTotal().toFixed(2)}`;
};
class CarrinhoObserver {
    update() {
        renderizarCarrinho();
    }
}
const carrinhoObserver = new CarrinhoObserver();
carrinho.addObserver(carrinhoObserver);
const clearButton = document.getElementById("clear-cart");
clearButton?.addEventListener("click", () => carrinho.limparCarrinho());
renderizarProdutos();
