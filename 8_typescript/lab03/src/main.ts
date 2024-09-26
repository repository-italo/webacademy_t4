abstract class Produto {
   constructor(
       public id: number,
       public modelo: string,
       public fabricante: string,
       public valor: number
   ) {
      this.id = id
      this.valor = valor;
      this.fabricante = fabricante;
      this.modelo = modelo;
   }
}

class Tv extends Produto{
   constructor(public id: number,
   public valor: number,
   public fabricante: string,
   public modelo: string,
   public polegadas: number,
)
   { 
      super(id, modelo, fabricante, valor);
      this.polegadas = polegadas;
   }
   
}
class Celular extends Produto{
   constructor(
   public id: number,
   public nome: string,
   public valor: number,
   public fabricante: string,
   public modelo: string,
   public memoria: string,
)
   {  
      super(id, modelo, fabricante, valor);
      this.memoria = memoria;
   }
   
}

class Bicicleta extends Produto{
   constructor(public id: number,
   public nome: string,
   public valor: number,
   public fabricante: string,
   public modelo: string,
   public tamAro: number,
)
   {
      super(id, modelo, fabricante, valor);
      this.tamAro = tamAro;
   }
   
}
 
// Definição da interface Observador
interface Observer {
   update(): void;
}

// Classe Carrinho que implementa o padrão Observer
class Carrinho {
   private produtos: Produto[] = []; // Lista de produtos no carrinho
   private observers: Observer[] = []; // Lista de observadores (interessados nas mudanças)

   addObserver(observer: Observer): void {
       this.observers.push(observer);
   }

   removeObserver(observer: Observer): void {
       const index = this.observers.indexOf(observer);
       if (index !== -1) {
           this.observers.splice(index, 1);
       }
   }

   notifyObservers(): void {
       this.observers.forEach(observer => observer.update());
   }

   // Adiciona um produto ao carrinho e notifica os observadores
   adicionarProduto(produto: Produto): void {
       this.produtos.push(produto);
       console.log(`${produto.modelo} adicionado ao carrinho.`);
       this.notifyObservers();
   }

   // Remove um produto do carrinho e notifica os observadores
   removerProduto(produto: Produto): void {
       const index = this.produtos.indexOf(produto);
       if (index !== -1) {
           this.produtos.splice(index, 1);
           console.log(`${produto.modelo} removido do carrinho.`);
           this.notifyObservers();
       }
   }

   // Retorna a lista de produtos no carrinho
   listarProdutos(): Produto[] {
       return this.produtos;
   }
}

const produtoContainer = (produto: Produto): HTMLElement => {
   const element = document.createElement("li");
   element.classList.add("list-group-item");
   element.innerHTML = 
   `
   <li class="list-group-item">
      ${produto.modelo}- R$${produto.valor} 
      <button class="btn btn-primary btn-sm float-right" id="adicionar-${produto.id}">Adicionar</button>
   </li>
   `
   return element;
}

const itemCarrinho = (produto: Produto): HTMLElement => {
   const cartItem = document.createElement('li');
   cartItem.className = 'list-group-item';
   cartItem.innerText = `${produto.modelo} - $${produto.valor}`;
   return cartItem;
}

const addToCart = (): void => {
   const cart = document.getElementById("card-list");

   cart.
}





