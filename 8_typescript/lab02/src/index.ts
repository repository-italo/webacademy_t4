import { Aluno, Turma } from "./main"

interface Estatistica {
   nome: string;
   numero: number;
}

const randomNumber = (): number => Math.floor(Math.random() * 10000) + 100;
const alunos: Array<Aluno> = []
const turma = new Turma(randomNumber(), "Turma de Educação Física", alunos);

const estatisticaContainer = (estatistica: Estatistica): HTMLElement => {
   let element: HTMLElement = document.createElement("div");
element.classList.add("card", "text-bg-light", "mb-3");
   element.style.maxWidth = "18rem";
   element.innerHTML = 
   `  <div class="card-body">
         <p class="card-text text-center" style="font-size: 16px;">
            ${estatistica.nome}
         </p>
         <h5 class="card-text text-center" style="font-size: 32px;">
            ${estatistica.numero}
         </h5>
      </div>`;
   return element
}
const atualizarCampos = (): void => {
   let estatisticas: Array<Estatistica> = [];
   estatisticas.push(
      {
         nome: "Média de Alturas",
         numero: turma.getMediaAlturas(),
      }, 
      {
         nome: "Média de Peso dos Alunos",
         numero: turma.getMediaPesos(),
      },
      {
         nome: "Média de Idades",
         numero: turma.getMediaIdades(),
      }
   );
   let wrapper: HTMLElement | null = document.querySelector("#estatisticas-wrapper");
   (wrapper as HTMLElement).innerHTML = `<h1 class="text-md-center">Estatísticas</h1>`;
   estatisticas.forEach((estatistica) => {
      wrapper?.appendChild(estatisticaContainer(estatistica));

   })
}

const inserirAluno = (e: MouseEvent) => {
   e.preventDefault();
   e.stopPropagation();
   let inputNomeAluno: HTMLInputElement | null = document.querySelector("input#nomeAluno");
   let inputIdadeAluno: HTMLInputElement | null = document.querySelector("input#idadeAluno");
   let inputAlturaAluno: HTMLInputElement | null = document.querySelector("input#alturaAluno");
   let inputPesoAluno: HTMLInputElement | null = document.querySelector("input#pesoAluno");

   if (inputNomeAluno?.value
       && inputIdadeAluno?.value 
       && Number.isInteger(parseInt(inputIdadeAluno.value)) 
       && (parseInt(inputIdadeAluno.value) > 0)
       && inputAlturaAluno?.value
       && !Number.isNaN(parseFloat(inputAlturaAluno.value)) 
       && inputPesoAluno?.value
       && !Number.isNaN(parseFloat(inputPesoAluno.value))
       && (parseFloat(inputPesoAluno.value) > 0.0)
       && (parseFloat(inputAlturaAluno.value) > 0.0)
      ){
      const alunoNovo = 
      new Aluno(
         randomNumber(),
         inputNomeAluno?.value,
         parseInt(inputIdadeAluno?.value),
         parseFloat(parseFloat(inputAlturaAluno?.value).toFixed(2)),
         parseFloat(parseFloat(inputPesoAluno?.value).toFixed(2))
      );
      turma.adicionarAluno(alunoNovo);
      console.log(turma.alunos);
      const inputs = document.querySelectorAll("form#formAdicionarEstudante > .col > input");
      inputs.forEach((i) => {
         (i as HTMLInputElement).value = "";
      })
   }
   atualizarCampos();
   mostrarTurma();
   const buttonDeletar = document.querySelectorAll("button.delete");
   buttonDeletar?.forEach((b) => (b as HTMLButtonElement).addEventListener("click", deletarAluno))
   const buttonEditar = document.querySelectorAll("button.edit");
   buttonEditar?.forEach((b) => (b as HTMLButtonElement).addEventListener("click", modalCampos))
   
}

const alunoContainer = (aluno: Aluno): HTMLElement => {
   const elementLi = document.createElement("li");
      elementLi.classList.add("list-group-item", "list-group-item-info");
      elementLi.innerText = aluno.nomeCompleto;
      elementLi.innerHTML+= 
      `<button class="delete" style="margin-left: 60px;"></button` ;
      elementLi.innerHTML+= 
      `<button class="edit" style="margin: 0 40px;" 
      data-bs-toggle="modal" data-bs-target="#modal-update-aluno"></button`;
      elementLi.setAttribute("aluno-id", `${aluno.id}`);
      return elementLi;
}

const mostrarTurma = () => {
   let ul = document.querySelector(".list-group");
   (ul as HTMLElement).innerHTML = "";
   turma.alunos.forEach((aluno) => {
      let ul = document.querySelector(".list-group");
      ul?.appendChild(alunoContainer(aluno));
   })
}

const deletarAluno = (e: MouseEvent) => {
   e.preventDefault();
   e.stopPropagation();
   const id = (<HTMLElement> e.target).parentElement?.getAttribute("aluno-id");
   turma.alunos = turma.alunos.filter((aluno) => `${aluno.id}` !== id);
   mostrarTurma();
   atualizarCampos();
}

const editarAluno = (id: string, fields: Partial<Aluno>) => {
   turma.alunos = turma.alunos.map((aluno) => {
      if(`${aluno.id}` === id){
         return {
            ...aluno, ...fields,
         } 
      }
      return aluno
   })
   mostrarTurma();
   atualizarCampos();
}

const modalCampos = (e: MouseEvent) => {
   e.preventDefault();
   e.stopPropagation();
   const id = (<HTMLElement> e.target).parentElement?.getAttribute("aluno-id");
   let inputNomeAtualizar: HTMLInputElement | null = document.querySelector("#nome-update");
   let inputIdadeAtualizar: HTMLInputElement | null = document.querySelector("#idade-update");
   let inputAlturaAtualizar: HTMLInputElement | null = document.querySelector("#altura-update");
   let inputPesoAtualizar: HTMLInputElement | null = document.querySelector("#peso-update");
   let modal: HTMLElement | null = document.getElementById("modal-update-aluno");
   const aluno = turma.alunos.find((aluno) => `${aluno.id}` === id);
   (inputNomeAtualizar as HTMLInputElement).value = (aluno as Aluno).nomeCompleto;
   (inputAlturaAtualizar as HTMLInputElement).value = (aluno as Aluno).altura.toString();
   (inputIdadeAtualizar as HTMLInputElement).value = (aluno as Aluno).idade.toString();
   (inputPesoAtualizar as HTMLInputElement).value = (aluno as Aluno).peso.toString();

   let buttonModal: HTMLButtonElement | null = document.querySelector("button#btn-editar");
   buttonModal?.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      editarAluno((id as string),
         {
            nomeCompleto: inputNomeAtualizar?.value,
            idade:parseInt( inputIdadeAtualizar?.value as string),
            peso: parseFloat(inputPesoAtualizar?.value as string),
            altura: parseFloat(inputAlturaAtualizar?.value as string),

         }
      );
   });
}

const buttonAdicionar: HTMLButtonElement | null = document.querySelector("#adicionarAluno");
buttonAdicionar?.addEventListener("click", inserirAluno);
