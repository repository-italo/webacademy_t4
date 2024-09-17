interface Tarefa {
   titulo: string;
   dataHora: Date;
   descricao: string;
}

let tarefasUsuario: Array<Tarefa> = [];

function listTarefas(tarefa: Tarefa): HTMLElement{
   let element = document.createElement("div");
   element.classList.add("tarefaDiv");

   let titulo = document.createElement("h3");
   titulo.innerText = tarefa.titulo;

   let data = document.createElement("h5");
   data.innerText = tarefa.dataHora.toISOString();

   let descricao = document.createElement("p");
   descricao.innerText = tarefa.descricao;

   element.appendChild(titulo);
   element.appendChild(document.createElement("hr"));
   element.appendChild(data);
   element.appendChild(descricao);

   return element;
}
// jeito mais simples de pegar os elementos da arvore DOM me javas... typescript
let inputTitulo: HTMLInputElement | null = document.querySelector("#tituloTarefa");
let inputDataTarefa: HTMLInputElement | null = document.querySelector("#dataTarefa");
let inputdescricaoTarefa: HTMLInputElement | null = document.querySelector("#descricaoTarefa");
let buttonForm = document.querySelector("#butao");
let listaTarefas = document.querySelector("div.listaTarefas")
//lamento, essa foi a melhor abordagem
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
  
   tarefasUsuario.push({
      titulo: titulo,
      dataHora: dataTarefa,
      descricao: descricao
   })
   let tarefasDiv = tarefasUsuario.map((t) => {
      return listTarefas(t);
   })
   tarefasDiv.forEach((t) => listaTarefas?.appendChild(t));
}
console.log(tarefasUsuario);
})
