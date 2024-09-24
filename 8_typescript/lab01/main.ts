
interface Tarefa {
   id: Number
   titulo: string;
   dataHora: Date;
   dataInserida: Date;
   descricao: string;
}


let tarefas: Array<Tarefa> = [];

function tarefaComponent(tarefa: Tarefa): HTMLElement{
   // renderizar uma tarefa no html
   let element = document.createElement("div");
   element.classList.add("tarefa-div");
   element.setAttribute("tarefa-id", `${tarefa.id}`)
   element.id = `tarefa-${tarefa.id}`
   element.innerHTML = 
   `<h3>${tarefa.titulo}</h3>
   <div class="button-group">
      <button class="delete"></button>
      <button class="edit"></button>
   </div>
   <hr>
   <h5><strong>Data de Criação</strong></h5>
   <h5>${tarefa.dataInserida.toLocaleDateString()} - ${tarefa.dataInserida.toLocaleTimeString()}</h5>
   <hr>
   <h5><strong>Data Limite</strong></h5>
   <h5>${tarefa.dataHora.toLocaleDateString()} - ${tarefa.dataHora.toLocaleTimeString()}</h5>
   <hr>
   <p>${tarefa.descricao}</p>
   `
   return element;
}
// jeito mais simples de pegar os elementos da arvore DOM em typescript
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
      const dataAgora = new Date(Date.now());
      //se data for nulo, a data da tarefa será duas semanas depois do momento de cadastro da tarefa.
      tarefas.push({
         id: Math.floor(Math.random() * 200),
         titulo: titulo,
         dataHora: dataTarefa,
         descricao: descricao,
         dataInserida: dataAgora
      })
   }
      atualizarTarefas();
})

const deletarTarefa = () => {
   let buttonsDelete = document.querySelectorAll(".tarefa-div > div > button.delete");
   buttonsDelete.forEach(b => {
      (b as HTMLButtonElement).addEventListener("click", () => {
         const parentId = b.parentElement?.parentElement?.getAttribute("tarefa-id");
         tarefas = tarefas.filter((t) => `${t.id}` !== (parentId as string))
         atualizarTarefas();
      })
   })
}
const editarTarefa = () => {
   let buttonsEdit = document.querySelectorAll(".tarefa-div > div > button.edit");
   buttonsEdit.forEach((b) => {
      (b as HTMLButtonElement).addEventListener("click", (e: MouseEvent) => {
         e.preventDefault();
         e.stopPropagation();
         b.setAttribute("data-bs-toggle", "modal");
         b.setAttribute("data-bs-target", "#modalAtualizarTarefa");
         const parentId = b.parentElement?.parentElement?.getAttribute("tarefa-id");
         const tarefa = tarefas.find((t) => `${t.id}` === (parentId as string));
         if (!tarefa) {
            console.error("Tarefa não encontrada");
            return;
         }
         let inputTituloUpdate: HTMLInputElement | null = document.querySelector("input#titulo-update");
         let inputDataUpdate: HTMLInputElement | null = document.querySelector("input#data-update");
         let inputDescricaoUpdate: HTMLInputElement | null = document.querySelector("textarea#descricao-update");
         (inputDataUpdate as HTMLInputElement).value = tarefa.dataHora.toISOString().slice(0, 16);
         (inputTituloUpdate as HTMLInputElement).value = tarefa.titulo;
         (inputDescricaoUpdate as HTMLInputElement).value = tarefa.descricao;
         const editarFuncao = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            let tituloAtualizado = inputTituloUpdate?.value;
            let dataAtualizado = inputDataUpdate?.value;
            let descricaoAtualizado = inputDescricaoUpdate?.value;
            tarefas = tarefas.map((t) => {
               if (t.id === tarefa.id) {
                  return {
                     ...t,
                     titulo: tituloAtualizado,
                     dataHora: new Date(dataAtualizado),
                     descricao: descricaoAtualizado,
                  };
               }
               return t;
            });
            atualizarTarefas();
         };
         let buttonModalEditar = document.querySelector("button#btn-editar");
         buttonModalEditar?.addEventListener("click", editarFuncao);
      });
   });
};
const atualizarTarefas = () => {
   (listaTarefas as HTMLElement).innerHTML = `<h2 id="part-2-titulo">Tarefas</h2>`;
   tarefas.forEach((t) => {
      const tarefaDiv = tarefaComponent(t);
      listaTarefas?.appendChild(tarefaDiv)
      editarTarefa();
      deletarTarefa();
   })
}
