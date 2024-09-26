import { Aluno, Turma } from "./main.js";
const randomNumber = () => Math.floor(Math.random() * 10000) + 100;
const alunos = [];
const turma = new Turma(randomNumber(), "Turma de Educação Física", alunos);
const estatisticaContainer = (estatistica) => {
    let element = document.createElement("div");
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
    return element;
};
const atualizarCampos = () => {
    let estatisticas = [];
    estatisticas.push({
        nome: "Média de Alturas",
        numero: turma.getMediaAlturas().toFixed(2),
    }, {
        nome: "Média de Peso dos Alunos",
        numero: turma.getMediaPesos().toFixed(2),
    }, {
        nome: "Média de Idades",
        numero: turma.getMediaIdades().toFixed(2),
    });
    let wrapper = document.querySelector("#estatisticas-wrapper");
    wrapper.innerHTML = `<h1 class="text-md-center">Estatísticas</h1>`;
    estatisticas.forEach((estatistica) => {
        wrapper?.appendChild(estatisticaContainer(estatistica));
    });
};
const inserirAluno = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let inputNomeAluno = document.querySelector("input#nomeAluno");
    let inputIdadeAluno = document.querySelector("input#idadeAluno");
    let inputAlturaAluno = document.querySelector("input#alturaAluno");
    let inputPesoAluno = document.querySelector("input#pesoAluno");
    if (inputNomeAluno?.value
        && inputIdadeAluno?.value
        && Number.isInteger(parseInt(inputIdadeAluno.value))
        && (parseInt(inputIdadeAluno.value) > 0)
        && inputAlturaAluno?.value
        && !Number.isNaN(parseFloat(inputAlturaAluno.value))
        && inputPesoAluno?.value
        && !Number.isNaN(parseFloat(inputPesoAluno.value))
        && (parseFloat(inputPesoAluno.value) > 0.0)
        && (parseFloat(inputAlturaAluno.value) > 0.0)) {
        const alunoNovo = new Aluno(randomNumber(), inputNomeAluno?.value, parseInt(inputIdadeAluno?.value), parseFloat(parseFloat(inputAlturaAluno?.value).toFixed(2)), parseFloat(parseFloat(inputPesoAluno?.value).toFixed(2)));
        turma.adicionarAluno(alunoNovo);
        console.log(turma.alunos);
        const inputs = document.querySelectorAll("form#formAdicionarEstudante > .col > input");
        inputs.forEach((i) => {
            i.value = "";
        });
    }
    atualizarCampos();
    mostrarTurma();
    const buttonDeletar = document.querySelectorAll("button.delete");
    buttonDeletar?.forEach((b) => b.addEventListener("click", deletarAluno));
    const buttonEditar = document.querySelectorAll("button.edit");
    buttonEditar?.forEach((b) => b.addEventListener("click", modalCampos));
};
const alunoContainer = (aluno) => {
    const elementLi = document.createElement("li");
    elementLi.classList.add("list-group-item", "list-group-item-info");
    elementLi.innerText = aluno.nomeCompleto;
    elementLi.innerHTML +=
        `<button class="delete" style="margin-left: 60px;"></button`;
    elementLi.innerHTML +=
        `<button class="edit" style="margin: 0 40px;" 
      data-bs-toggle="modal" data-bs-target="#modal-update-aluno"></button`;
    elementLi.setAttribute("aluno-id", `${aluno.id}`);
    return elementLi;
};
const mostrarTurma = () => {
    let ul = document.querySelector(".list-group");
    ul.innerHTML = "";
    turma.alunos.forEach((aluno) => {
        let ul = document.querySelector(".list-group");
        ul?.appendChild(alunoContainer(aluno));
    });
    const buttonDeletar = document.querySelectorAll("button.delete");
    buttonDeletar?.forEach((b) => b.addEventListener("click", deletarAluno));
    const buttonEditar = document.querySelectorAll("button.edit");
    buttonEditar?.forEach((b) => b.addEventListener("click", modalCampos));
};
const deletarAluno = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.target.parentElement?.getAttribute("aluno-id");
    turma.alunos = turma.alunos.filter((aluno) => `${aluno.id}` !== id);
    console.log(turma.alunos);
    mostrarTurma();
    atualizarCampos();
};
const editarAluno = (id, fields) => {
    turma.alunos = turma.alunos.map((aluno) => {
        if (`${aluno.id}` === id) {
            return {
                ...aluno, ...fields,
            };
        }
        return aluno;
    });
    mostrarTurma();
    atualizarCampos();
};
const modalCampos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.target.parentElement?.getAttribute("aluno-id");
    let inputNomeAtualizar = document.querySelector("#nome-update");
    let inputIdadeAtualizar = document.querySelector("#idade-update");
    let inputAlturaAtualizar = document.querySelector("#altura-update");
    let inputPesoAtualizar = document.querySelector("#peso-update");
    const aluno = turma.alunos.find((aluno) => `${aluno.id}` === id);
    inputNomeAtualizar.value = aluno.nomeCompleto;
    inputAlturaAtualizar.value = aluno.altura.toString();
    inputIdadeAtualizar.value = aluno.idade.toString();
    inputPesoAtualizar.value = aluno.peso.toString();
    let buttonModal = document.querySelector("button#btn-editar");
    buttonModal?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        editarAluno(id, {
            nomeCompleto: inputNomeAtualizar?.value,
            idade: parseInt(inputIdadeAtualizar?.value),
            peso: parseFloat(inputPesoAtualizar?.value),
            altura: parseFloat(inputAlturaAtualizar?.value),
        });
        console.log(turma.alunos);
    });
};
const buttonAdicionar = document.querySelector("#adicionarAluno");
buttonAdicionar?.addEventListener("click", inserirAluno);
