let tarefas = [];
let proximoId = 1;
let statusPendente = "a-fazer";

const form             = document.getElementById("formtaf");
const inputTitulo      = document.getElementById("titulo");
const selectPrioridade = document.getElementById("prioridade");
const btnFechar        = document.getElementById("fecharForm");

const colAfazer    = document.getElementById("afazer");
const colProgresso = document.getElementById("progresso");
const colConcluido = document.getElementById("concluido");

colAfazer.addEventListener("click", handleClickColuna);
colProgresso.addEventListener("click", handleClickColuna);
colConcluido.addEventListener("click", handleClickColuna);

function handleClickColuna(e) {

    const btn = e.target.closest("button");

    if (!btn)
        return;

    if (btn.classList.contains("btn-avancar")) {
        avancarStatus(Number(btn.dataset.id));
    }

    else if (btn.classList.contains("btn-excluir")) {
        excluirTarefa(Number(btn.dataset.id));
    }
}

function abrirFormulario(status) {

    statusPendente = status;

    form.style.display = "flex";

    inputTitulo.focus();
}

btnFechar.addEventListener("click", () => {

    form.style.display = "none";

    inputTitulo.value = "";
});

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const titulo = inputTitulo.value.trim();

    if (!titulo)
        return;

    const novaTarefa = {
        id: proximoId++,
        titulo: titulo,
        prioridade: selectPrioridade.value,
        status: statusPendente,
    };

    tarefas.push(novaTarefa);

    inputTitulo.value = "";

    form.style.display = "none";

    renderizarTarefas();
});

function renderizarTarefas() {

    colAfazer.innerHTML    = "";
    colProgresso.innerHTML = "";
    colConcluido.innerHTML = "";

    tarefas.forEach((tarefa) => {

        const card = criarCard(tarefa);

        if (tarefa.status === "a-fazer")
            colAfazer.appendChild(card);

        else if (tarefa.status === "fazendo")
            colProgresso.appendChild(card);

        else if (tarefa.status === "concluido")
            colConcluido.appendChild(card);
    });
}

function criarCard(tarefa) {

    const coresBorda       = { alta: "red", media: "goldenrod", baixa: "green" };
    const labelsPrioridade = { alta: "Alta", media: "Média", baixa: "Baixa" };

    const card = document.createElement("div");

    card.classList.add("card-tarefa");

    card.dataset.id = tarefa.id;

    card.style.cssText = `
        border: 2px solid ${coresBorda[tarefa.prioridade] || "#999"};
        border-radius: 5px;
        background-color: white;
        padding: 10px;
        margin: 8px;
    `;

    const titulo = document.createElement("p");

    titulo.textContent = tarefa.titulo;

    titulo.style.fontWeight = "bold";
    titulo.style.margin = "0 0 4px 0";

    if (tarefa.status === "concluido") {

        titulo.style.textDecoration = "line-through";
        titulo.style.color = "#888";
    }

    const badge = document.createElement("span");

    badge.textContent = labelsPrioridade[tarefa.prioridade];

    badge.style.cssText = `
        font-size: 11px;
        padding: 2px 6px;
        border-radius: 10px;
        color: white;
        background-color: ${coresBorda[tarefa.prioridade] || "#999"};
        display: inline-block;
        margin-bottom: 8px;
    `;

    const botoesDiv = document.createElement("div");

    botoesDiv.style.cssText = `
        display:flex;
        gap:5px;
        margin-top:6px;
    `;

    if (tarefa.status !== "concluido") {

        const btnAvancar = document.createElement("button");

        btnAvancar.textContent = "Avançar";

        btnAvancar.classList.add("btn-avancar");

        btnAvancar.dataset.id = tarefa.id;

        estilizarBotaoAcao(btnAvancar, "#7878d1");

        botoesDiv.appendChild(btnAvancar);
    }

    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";

    btnExcluir.classList.add("btn-excluir");

    btnExcluir.dataset.id = tarefa.id;

    estilizarBotaoAcao(btnExcluir, "#e05252");

    botoesDiv.appendChild(btnExcluir);

    card.appendChild(titulo);
    card.appendChild(badge);
    card.appendChild(botoesDiv);

    return card;
}

function estilizarBotaoAcao(btn, cor) {

    btn.style.cssText = `
        display: inline-block;
        width: auto;
        height: auto;
        border-radius: 4px;
        padding: 3px 8px;
        font-size: 11px;
        background-color: ${cor};
        color: white;
        border: none;
        cursor: pointer;
    `;
}

function avancarStatus(id) {

    const index = tarefas.findIndex((t) => t.id === id);

    if (index === -1)
        return;

    const fluxo = {
        "a-fazer": "fazendo",
        "fazendo": "concluido"
    };

    if (fluxo[tarefas[index].status]) {

        tarefas[index].status = fluxo[tarefas[index].status];

        renderizarTarefas();
    }
}

function excluirTarefa(id) {

    tarefas = tarefas.filter((t) => t.id !== id);

    renderizarTarefas();
}

renderizarTarefas();