// minhas tarefas ficam aqui
var listaDeTarefas = [];

// esse numero serve pra cada tarefa ter um numero unico
var contadorId = 1;

// aqui eu guardo qual coluna o usuario clicou pra adicionar tarefa
var qualColuna = "a-fazer";

// pegando os elementos da pagina
var formulario = document.getElementById("formtaf");
var campoTitulo = document.getElementById("titulo");
var campoPrioridade = document.getElementById("prioridade");
var botaoFechar = document.getElementById("fecharForm");

var colunaAFazer = document.getElementById("afazer");
var colunaFazendo = document.getElementById("progresso");
var colunaConcluido = document.getElementById("concluido");

// quando o usuario clica em algum botao dentro de uma coluna
colunaAFazer.addEventListener("click", function(e) {
    verificarClique(e);
});

colunaFazendo.addEventListener("click", function(e) {
    verificarClique(e);
});

colunaConcluido.addEventListener("click", function(e) {
    verificarClique(e);
});

// essa funcao verifica qual botao foi clicado
function verificarClique(e) {

    // se nao clicou em nenhum botao sai fora
    if (e.target.tagName != "BUTTON") {
        return;
    }

    var botao = e.target;
    var idDaTarefa = Number(botao.dataset.id);

    if (botao.classList.contains("btn-avancar")) {
        avancarTarefa(idDaTarefa);
    }

    if (botao.classList.contains("btn-excluir")) {
        excluirTarefa(idDaTarefa);
    }
}

// essa funcao abre o formulario
function abrirFormulario(status) {

    qualColuna = status;

    formulario.style.display = "flex";

    campoTitulo.focus();
}

// fechar o formulario quando clicar no botao fechar
botaoFechar.addEventListener("click", function() {

    formulario.style.display = "none";

    campoTitulo.value = "";
});

// quando o usuario envia o formulario
formulario.addEventListener("submit", function(e) {

    // evita a pagina recarregar
    e.preventDefault();

    var tituloDigitado = campoTitulo.value.trim();

    // se nao digitou nada nao faz nada
    if (tituloDigitado == "") {
        return;
    }

    // cria um objeto com os dados da nova tarefa
    var novaTarefa = {};
    novaTarefa.id = contadorId;
    novaTarefa.titulo = tituloDigitado;
    novaTarefa.prioridade = campoPrioridade.value;
    novaTarefa.status = qualColuna;

    contadorId = contadorId + 1;

    listaDeTarefas.push(novaTarefa);

    campoTitulo.value = "";

    formulario.style.display = "none";

    mostrarTarefas();
});

// essa funcao desenha todas as tarefas nas colunas
function mostrarTarefas() {

    // limpa as colunas primeiro
    colunaAFazer.innerHTML = "";
    colunaFazendo.innerHTML = "";
    colunaConcluido.innerHTML = "";

    // passa por cada tarefa e coloca na coluna certa
    for (var i = 0; i < listaDeTarefas.length; i++) {

        var tarefa = listaDeTarefas[i];
        var card = criarCard(tarefa);

        if (tarefa.status == "a-fazer") {
            colunaAFazer.appendChild(card);
        }

        if (tarefa.status == "fazendo") {
            colunaFazendo.appendChild(card);
        }

        if (tarefa.status == "concluido") {
            colunaConcluido.appendChild(card);
        }
    }
}

// essa funcao cria o card de uma tarefa
function criarCard(tarefa) {

    var corDaBorda = "#999";

    if (tarefa.prioridade == "alta") {
        corDaBorda = "red";
    }
    if (tarefa.prioridade == "media") {
        corDaBorda = "goldenrod";
    }
    if (tarefa.prioridade == "baixa") {
        corDaBorda = "green";
    }

    var card = document.createElement("div");
    card.classList.add("card-tarefa");
    card.dataset.id = tarefa.id;
    card.style.cssText = `
        border: 2px solid ${corDaBorda};
        border-radius: 5px;
        background-color: white;
        padding: 10px;
        margin: 8px;
    `;

    // titulo da tarefa
    var titulo = document.createElement("p");
    titulo.textContent = tarefa.titulo;
    titulo.style.fontWeight = "bold";
    titulo.style.margin = "0 0 4px 0";

    // se ja concluiu risca o texto
    if (tarefa.status == "concluido") {
        titulo.style.textDecoration = "line-through";
        titulo.style.color = "#888";
    }

    // badge de prioridade
    var textoBadge = "";

    if (tarefa.prioridade == "alta") {
        textoBadge = "Alta";
    }
    if (tarefa.prioridade == "media") {
        textoBadge = "Média";
    }
    if (tarefa.prioridade == "baixa") {
        textoBadge = "Baixa";
    }

    var badge = document.createElement("span");
    badge.textContent = textoBadge;
    badge.style.cssText = `
        font-size: 11px;
        padding: 2px 6px;
        border-radius: 10px;
        color: white;
        background-color: ${corDaBorda};
        display: inline-block;
        margin-bottom: 8px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    `;

    // div dos botoes
    var divBotoes = document.createElement("div");
    divBotoes.style.cssText = `
        display: flex;
        gap: 5px;
        margin-top: 6px;
    `;

    // botao de avancar (so aparece se nao estiver concluido)
    if (tarefa.status != "concluido") {

        var botaoAvancar = document.createElement("button");
        botaoAvancar.textContent = "Avançar";
        botaoAvancar.classList.add("btn-avancar");
        botaoAvancar.dataset.id = tarefa.id;
        botaoAvancar.style.cssText = `
            display: inline-block;
            width: auto;
            height: auto;
            border-radius: 4px;
            padding: 3px 8px;
            font-size: 11px;
            background-color: #7878d1;
            color: white;
            border: none;
            cursor: pointer;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        `;

        divBotoes.appendChild(botaoAvancar);
    }

    // botao de excluir
    var botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("btn-excluir");
    botaoExcluir.dataset.id = tarefa.id;
    botaoExcluir.style.cssText = `
        display: inline-block;
        width: auto;
        height: auto;
        border-radius: 4px;
        padding: 3px 8px;
        font-size: 11px;
        background-color: #e05252;
        color: white;
        border: none;
        cursor: pointer;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    `;

    divBotoes.appendChild(botaoExcluir);

    // juntando tudo no card
    card.appendChild(titulo);
    card.appendChild(badge);
    card.appendChild(divBotoes);

    return card;
}

// avanca o status da tarefa
function avancarTarefa(id) {

    // procura a tarefa pelo id
    var posicao = -1;

    for (var i = 0; i < listaDeTarefas.length; i++) {
        if (listaDeTarefas[i].id == id) {
            posicao = i;
        }
    }

    // se nao achou sai fora
    if (posicao == -1) {
        return;
    }

    // muda o status
    if (listaDeTarefas[posicao].status == "a-fazer") {
        listaDeTarefas[posicao].status = "fazendo";
    } else if (listaDeTarefas[posicao].status == "fazendo") {
        listaDeTarefas[posicao].status = "concluido";
    }

    mostrarTarefas();
}

// exclui a tarefa da lista
function excluirTarefa(id) {

    var novaLista = [];

    for (var i = 0; i < listaDeTarefas.length; i++) {
        if (listaDeTarefas[i].id != id) {
            novaLista.push(listaDeTarefas[i]);
        }
    }

    listaDeTarefas = novaLista;

    mostrarTarefas();
}

// chama a funcao pra mostrar as tarefas quando a pagina carrega
mostrarTarefas();