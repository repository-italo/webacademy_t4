var tarefas = [];
function tarefaComponent(tarefa) {
    // renderizar uma tarefa no html
    var element = document.createElement("div");
    element.classList.add("tarefa-div");
    element.innerHTML =
        "<h3>".concat(tarefa.titulo, "</h3>\n   <div class=\"button-group\">\n      <button class=\"delete\"></button>\n      <button class=\"edit\"></button>\n   </div>\n   <hr>\n   <h5>").concat(tarefa.dataHora.toLocaleDateString(), " - ").concat(tarefa.dataHora.toLocaleTimeString(), "</h5>\n   <p>").concat(tarefa.descricao, "</p>\n   ");
    return element;
}
// jeito mais simples de pegar os elementos da arvore DOM me javas... typescript
var inputTitulo = document.querySelector("#tituloTarefa");
var inputDataTarefa = document.querySelector("#dataTarefa");
var inputdescricaoTarefa = document.querySelector("#descricaoTarefa");
var buttonForm = document.querySelector("#butao");
var listaTarefas = document.querySelector("div.listaTarefas");
//adicionar tarefa na lista e renderizar no html
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
        tarefas.push({
            titulo: titulo,
            dataHora: dataTarefa,
            descricao: descricao
        });
        listaTarefas.innerHTML = "<h2 id=\"part-2-titulo\">Tarefas</h2>";
        tarefas.forEach(function (t) {
            var tarefaDiv = tarefaComponent(t);
            listaTarefas === null || listaTarefas === void 0 ? void 0 : listaTarefas.appendChild(tarefaDiv);
        });
    }
    console.log(tarefas);
});
