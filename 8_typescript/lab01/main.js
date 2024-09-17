var tarefasUsuario = [];
function listTarefas(tarefa) {
    var element = document.createElement("div");
    element.classList.add("tarefaDiv");
    var titulo = document.createElement("h3");
    titulo.innerText = tarefa.titulo;
    var data = document.createElement("h5");
    data.innerText = tarefa.dataHora.toISOString();
    var descricao = document.createElement("p");
    descricao.innerText = tarefa.descricao;
    element.appendChild(titulo);
    element.appendChild(document.createElement("hr"));
    element.appendChild(data);
    element.appendChild(descricao);
    return element;
}
// jeito mais simples de pegar os elementos da arvore DOM me javas... typescript
var inputTitulo = document.querySelector("#tituloTarefa");
var inputDataTarefa = document.querySelector("#dataTarefa");
var inputdescricaoTarefa = document.querySelector("#descricaoTarefa");
var buttonForm = document.querySelector("#butao");
var listaTarefas = document.querySelector("div.listaTarefas");
//lamento, essa foi a melhor abordagem
buttonForm === null || buttonForm === void 0 ? void 0 : buttonForm.addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    //valida a existência dos atributos obrigatórios da interface Tarefa
    if ((inputDataTarefa === null || inputDataTarefa === void 0 ? void 0 : inputDataTarefa.value) && (inputTitulo === null || inputTitulo === void 0 ? void 0 : inputTitulo.value) && (inputdescricaoTarefa === null || inputdescricaoTarefa === void 0 ? void 0 : inputdescricaoTarefa.value)) {
        var titulo = inputTitulo === null || inputTitulo === void 0 ? void 0 : inputTitulo.value;
        var descricao = inputdescricaoTarefa === null || inputdescricaoTarefa === void 0 ? void 0 : inputdescricaoTarefa.value;
        var dataTarefa = (inputDataTarefa === null || inputDataTarefa === void 0 ? void 0 : inputDataTarefa.value)
            ? new Date(inputDataTarefa.value)
            : new Date(Date.now() + (3600 * 1000 * 336));
        //se data for nulo, a data da tarefa será duas semanas depois do momento de cadastro da tarefa.
        tarefasUsuario.push({
            titulo: titulo,
            dataHora: dataTarefa,
            descricao: descricao
        });
        var tarefasDiv = tarefasUsuario.map(function (t) {
            return listTarefas(t);
        });
        tarefasDiv.forEach(function (t) { return listaTarefas === null || listaTarefas === void 0 ? void 0 : listaTarefas.appendChild(t); });
    }
    console.log(tarefasUsuario);
});
