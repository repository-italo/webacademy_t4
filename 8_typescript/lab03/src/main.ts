abstract class Produto {
   constructor(
       public id: number,
       public modelo: string,
       public fabricante: string,
       public valor: number
   ) {}
}

type ClassesProdutos = "Celular" | "Bicicleta" | "TV";

class Tv extends Produto {
   constructor(
       public id: number,
       public modelo: string,
       public fabricante: string,
       public valor: number,
       public polegadas: number
   ) {
       super(id, modelo, fabricante, valor);
   }
}

class Celular extends Produto {
   constructor(
       public id: number,
       public modelo: string,
       public fabricante: string,
       public valor: number,
       public memoria: string
   ) {
       super(id, modelo, fabricante, valor);
   }
}

class Bicicleta extends Produto {
   constructor(
       public id: number,
       public modelo: string,
       public fabricante: string,
       public valor: number,
       public tamAro: number
   ) {
       super(id, modelo, fabricante, valor);
   }
}

class ProdutoFactory {
   static criarProduto<T extends Produto>(tipo: ClassesProdutos, dados: any): T {
       switch (tipo) {
           case "TV":
               return new Tv(
                  dados.id, 
                  dados.modelo, 
                  dados.fabricante, 
                  dados.valor, 
                  dados.polegadas) as unknown as T;
           case "Celular":
               return new Celular(
                  dados.id, 
                  dados.modelo, 
                  dados.fabricante, 
                  dados.valor, 
                  dados.memoria) as unknown as T;
           case "Bicicleta":
               return new Bicicleta(
                  dados.id, 
                  dados.modelo, 
                  dados.fabricante, 
                  dados.valor, 
                  dados.tamAro) as unknown as T;
           default:
               throw new Error("Tipo de produto desconhecido");
       }
   }
}

const produtos: Produto[] = [
   ProdutoFactory.criarProduto<Tv>("TV", {
       id: 1,
       modelo: "Samsung QLED",
       fabricante: "Samsung",
       valor: 2999.99,
       polegadas: 55
   }),
   ProdutoFactory.criarProduto<Celular>("Celular", {
       id: 2,
       modelo: "iPhone 13",
       fabricante: "Apple",
       valor: 5999.99,
       memoria: "128GB"
   }),
   ProdutoFactory.criarProduto<Bicicleta>("Bicicleta", {
       id: 3,
       modelo: "Caloi Elite",
       fabricante: "Caloi",
       valor: 1499.99,
       tamAro: 29
   }),
   ProdutoFactory.criarProduto<Celular>("Celular",{
      id: 4,
      modelo: "Xiaomi Mi 14",
      fabricante: "Xiaomi",
      valor: 2499.99,
      memoria: "512GB",
      
   })
];

interface Observer {
   update(): void;
}

class Carrinho {
   public produtos: Produto[] = [];
   private observers: Observer[] = [];
   addObserver(observer: Observer): void {
       this.observers.push(observer);
   }
   notifyObservers(): void {
       this.observers.forEach(observer => observer.update());
   }
   adicionarProduto(produto: Produto): void {
       this.produtos.push(produto);
       this.notifyObservers();
   }
   removerProduto(produto: Produto): void {
       const index = this.produtos.indexOf(produto);
       if (index !== -1) {
           this.produtos.splice(index, 1);
           this.notifyObservers();
       }
   }
   limparCarrinho(): void {
       this.produtos = [];
       this.notifyObservers();
   }
   calcularTotal(): number {
       return this.produtos.reduce((total, produto) => total + produto.valor, 0);
   }
}

const carrinho = new Carrinho();

const produtoContainer = (produto: Produto): HTMLElement => {
   const element = document.createElement("li");
   element.classList.add("list-group-item");
   if(produto instanceof Celular){
      element.innerHTML = `${produto.modelo},
       ${produto.memoria} - <strong>R$${produto.valor}</strong>
       <button class="btn btn-primary btn-sm float-right">Adicionar</button>`;
   }
   if(produto instanceof Tv){
      element.innerHTML = `${produto.modelo}
       ${produto.polegadas}' - <strong>R$${produto.valor}</strong>
       <button class="btn btn-primary btn-sm float-right">Adicionar</button>`;
   }
   if(produto instanceof Bicicleta){
      element.innerHTML = `${produto.modelo}, ${produto.tamAro}'' 
      - <strong>R$${produto.valor}</strong>
       <button class="btn btn-primary btn-sm float-right">Adicionar</button>`;
   }
   const addButton = element.querySelector("button");
   addButton?.addEventListener("click", () => carrinho.adicionarProduto(produto));
   return element;
};

const itemCarrinho = (produto: Produto): HTMLElement => {
   const element = document.createElement("li");
   element.classList.add("list-group-item");
   element.innerHTML = `${produto.modelo} - R$${produto.valor}
       <button class="btn btn-danger btn-sm float-right">Remover</button>`;
   
   const removeButton = element.querySelector("button");
   removeButton?.addEventListener("click", () => carrinho.removerProduto(produto));

   return element;
};

const renderizarProdutos = (): void => {
   const ulProdutos = document.getElementById("product-list");
   ulProdutos!.innerHTML = '';
   produtos.forEach((produto) => {
       ulProdutos?.appendChild(produtoContainer(produto));
   });
};

const renderizarCarrinho = (): void => {
   const ulCarrinho = document.getElementById("cart-list");
   ulCarrinho!.innerHTML = '';
   carrinho.produtos.forEach((produto) => {
       ulCarrinho?.appendChild(itemCarrinho(produto));
   });

   const totalElement = document.getElementById("total-value");
   totalElement!.innerText = `${carrinho.calcularTotal().toFixed(2)}`;
};

class CarrinhoObserver implements Observer {
   update(): void {
       renderizarCarrinho();
   }
}

const carrinhoObserver = new CarrinhoObserver();
carrinho.addObserver(carrinhoObserver);

const clearButton = document.getElementById("clear-cart");
clearButton?.addEventListener("click", () => carrinho.limparCarrinho());

renderizarProdutos();