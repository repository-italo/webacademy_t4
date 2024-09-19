interface Tarefa {
   titulo: string;
   dataHora: Date;
   descricao: string;
}

let tarefas: Array<Tarefa> = [];

function tarefaComponent(tarefa: Tarefa): HTMLElement{
   // renderizar uma tarefa no html
   let element = document.createElement("div");
   element.classList.add("tarefa-div");
   element.innerHTML = 
   `<h3>${tarefa.titulo}</h3>
   <div class="button-group">
      <button class="delete"></button>
      <button class="edit"></button>
   </div>
   <hr>
   <h5>${tarefa.dataHora.toLocaleDateString()} - ${tarefa.dataHora.toLocaleTimeString()}</h5>
   <p>${tarefa.descricao}</p>
   `
   return element;
}
// jeito mais simples de pegar os elementos da arvore DOM me javas... typescript
let inputTitulo: HTMLInputElement | null = document.querySelector("#tituloTarefa");
let inputDataTarefa: HTMLInputElement | null = document.querySelector("#dataTarefa");
let inputdescricaoTarefa: HTMLInputElement | null = document.querySelector("#descricaoTarefa");
let buttonForm = document.querySelector("#butao");
let listaTarefas = document.querySelector("div.listaTarefas");
//adicionar tarefa na lista e renderizar no html
buttonForm?.addEventListener("click", (e: Event) => {
      e.stopPropagation();
      e.preventDefault();
   //valida a existência dos atributos obrigatórios da interface Tarefa
   if(inputDataTarefa?.value && inputTitulo?.value && inputdescricaoTarefa?.value){

      const titulo = inputTitulo?.value;
      const descricao = inputdescricaoTarefa?.value;
      const dataTarefa: Date = inputDataTarefa?.value 
      ? new Date(inputDataTarefa.value) 
      : new Date(Date.now() + (3600 * 1000 * 336));
      //se data for nulo, a data da tarefa será duas semanas depois do momento de cadastro da tarefa.
   
      tarefas.push({
         titulo: titulo,
         dataHora: dataTarefa,
         descricao: descricao
      })

      listaTarefas.innerHTML = `<h2 id="part-2-titulo">Tarefas</h2>`;
      tarefas.forEach((t) => {
         const tarefaDiv = tarefaComponent(t);
         listaTarefas?.appendChild(tarefaDiv)
      })
   }
   console.log(tarefas);
})
