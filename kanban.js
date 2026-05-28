// lista onde ficam as tarefas
var listaDeTarefas = [];

// id das tarefas 
var contadorId = 1;

// qual coluna a tarefa vai entrar
var qualColuna = "a-fazer";

// pegando o formulário do html
var formulario = document.getElementById("formtaf");

// input do título
var campoTitulo = document.getElementById("titulo");

// input da prioridade
var campoPrioridade = document.getElementById("prioridade");

// botão de fechar o form
var botaoFechar = document.getElementById("fecharForm");

// overlay do modal
var overlay = document.getElementById("overlay");

// coluna "a fazer"
var colunaAFazer = document.getElementById("afazer");

// coluna "fazendo"
var colunaFazendo = document.getElementById("progresso");

// coluna "concluido"
var colunaConcluido = document.getElementById("concluido");


// abre o formulário pra criar tarefa
function abrirFormulario(status) {
    qualColuna = status;
    overlay.classList.add("aberto");
    campoTitulo.focus();
}

// fecha o formulário
botaoFechar.onclick = function () {
    overlay.classList.remove("aberto");
    campoTitulo.value = "";
};

// fecha clicando fora do form
overlay.onclick = function (e) {
    if (e.target === overlay) {
        overlay.classList.remove("aberto");
        campoTitulo.value = "";
    }
};

// quando envia o formulário
formulario.addEventListener("submit", function (e) {

    e.preventDefault();

    // pega o texto digitado
    var tituloDigitado = campoTitulo.value.trim();

    // se estiver vazio não faz nada
    if (tituloDigitado == "") return;

    // cria a tarefa
    var novaTarefa = {
        id: contadorId,
        titulo: tituloDigitado,
        prioridade: campoPrioridade.value,
        status: qualColuna
    };

    contadorId++;

    // coloca na lista
    listaDeTarefas.push(novaTarefa);

    // limpa input
    campoTitulo.value = "";

    // fecha o modal
    overlay.classList.remove("aberto");

    // atualiza a tela
    mostrarTarefas();
});


// mostra as tarefas na tela
function mostrarTarefas() {

    // limpa as colunas antes
    colunaAFazer.innerHTML = "";
    colunaFazendo.innerHTML = "";
    colunaConcluido.innerHTML = "";

    for (var i = 0; i < listaDeTarefas.length; i++) {

        var tarefa = listaDeTarefas[i];

        // cria o card
        var card = criarCard(tarefa);

        // coloca na coluna certa
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


// cria o card da tarefa
function criarCard(tarefa) {

    // cor padrão
    var corDaBorda = "#999";

    // muda cor dependendo da prioridade
    if (tarefa.prioridade == "alta") {
        corDaBorda = "red";
    }

    if (tarefa.prioridade == "media") {
        corDaBorda = "goldenrod";
    }

    if (tarefa.prioridade == "baixa") {
        corDaBorda = "green";
    }

    // cria a div do card
    var card = document.createElement("div");

    card.classList.add("card-tarefa");

    // estilo do card
    card.style.cssText = `
        border: 2px solid ${corDaBorda};
        border-radius: 5px;
        background-color: white;
        padding: 10px;
        margin: 8px;
    `;

    // título da tarefa
    var titulo = document.createElement("p");

    titulo.textContent = tarefa.titulo;

    titulo.style.fontWeight = "bold";

    titulo.style.margin = "0 0 4px 0";

    // risca se estiver concluido
    if (tarefa.status == "concluido") {
        titulo.style.textDecoration = "line-through";
        titulo.style.color = "#888";
    }

    // texto da prioridade
    var textoBadge = "";

    if (tarefa.prioridade == "alta") textoBadge = "Alta";
    if (tarefa.prioridade == "media") textoBadge = "Média";
    if (tarefa.prioridade == "baixa") textoBadge = "Baixa";

    // badge da prioridade
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
    `;

    // div dos botões
    var divBotoes = document.createElement("div");

    divBotoes.style.cssText = `
        display: flex;
        gap: 5px;
        margin-top: 6px;
    `;

    // botão avançar (só se não estiver concluido)
    if (tarefa.status != "concluido") {

        var botaoAvancar = document.createElement("button");

        botaoAvancar.textContent = "Avançar";

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
        `;

        botaoAvancar.onclick = function () {
            avancarTarefa(tarefa.id);
        };

        divBotoes.appendChild(botaoAvancar);
    }

    // botão excluir
    var botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";

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
    `;

    botaoExcluir.onclick = function () {
        excluirTarefa(tarefa.id);
    };

    // adiciona botões no card
    divBotoes.appendChild(botaoExcluir);

    // monta o card
    card.appendChild(titulo);
    card.appendChild(badge);
    card.appendChild(divBotoes);

    return card;
}


// avança tarefa de status
function avancarTarefa(id) {

    for (var i = 0; i < listaDeTarefas.length; i++) {

        if (listaDeTarefas[i].id == id) {

            if (listaDeTarefas[i].status == "a-fazer") {
                listaDeTarefas[i].status = "fazendo";
            }

            else if (listaDeTarefas[i].status == "fazendo") {
                listaDeTarefas[i].status = "concluido";
            }
        }
    }

    // atualiza a tela
    mostrarTarefas();
}


// exclui tarefa da lista
function excluirTarefa(id) {

    var novaLista = [];

    for (var i = 0; i < listaDeTarefas.length; i++) {

        if (listaDeTarefas[i].id != id) {
            novaLista.push(listaDeTarefas[i]);
        }
    }

    listaDeTarefas = novaLista;

    // atualiza a tela
    mostrarTarefas();
}


// atualiza a tela
mostrarTarefas();
