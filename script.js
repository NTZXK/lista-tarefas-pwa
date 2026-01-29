// ===============================
// SELEÇÃO DOS ELEMENTOS
// ===============================
const input = document.getElementById("tarefa");
const lista = document.getElementById("lista");

// ===============================
// ADICIONAR TAREFA
// ===============================
function adicionarTarefa() {
  const texto = input.value.trim();

  // Evita adicionar tarefa vazia
  if (texto === "") return;

  // Cria o item da lista
  const li = document.createElement("li");

  // Texto da tarefa
  const span = document.createElement("span");
  span.textContent = texto;
  span.onclick = () => alternarConclusao(span);

  // Botão remover
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "❌";
  btnRemover.onclick = () => removerItem(li);

  // Monta o item
  li.appendChild(span);
  li.appendChild(btnRemover);
  lista.appendChild(li);

  // Limpa o input
  input.value = "";

  salvarTarefas();
  atualizarContador();
}

// ===============================
// MARCAR / DESMARCAR COMO CONCLUÍDA
// ===============================
function alternarConclusao(elemento) {
  elemento.classList.toggle("concluida");
  salvarTarefas();
  atualizarContador();
}

// ===============================
// REMOVER ITEM
// ===============================
function removerItem(li) {
  li.remove();
  salvarTarefas();
  atualizarContador();
}

// ===============================
// SALVAR NO LOCALSTORAGE
// ===============================
function salvarTarefas() {
  const tarefas = [];

  lista.querySelectorAll("li").forEach(li => {
    const texto = li.querySelector("span").textContent;
    const concluida = li.querySelector("span").classList.contains("concluida");

    tarefas.push({ texto, concluida });
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// ===============================
// CARREGAR DO LOCALSTORAGE
// ===============================
function carregarTarefas() {
  const dados = JSON.parse(localStorage.getItem("tarefas")) || [];

  lista.innerHTML = "";

  dados.forEach(item => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = item.texto;
    if (item.concluida) span.classList.add("concluida");
    span.onclick = () => alternarConclusao(span);

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "❌";
    btnRemover.onclick = () => removerItem(li);

    li.appendChild(span);
    li.appendChild(btnRemover);
    lista.appendChild(li);
  });

  atualizarContador();
}

// ===============================
// CONTADOR DE TAREFAS
// ===============================
function atualizarContador() {
  const total = lista.querySelectorAll("li").length;
  const pendentes = lista.querySelectorAll("span:not(.concluida)").length;

  document.getElementById("contador").textContent =
    `${pendentes} pendente(s) de ${total}`;
}

// ===============================
// LIMPAR CONCLUÍDAS
// ===============================
function limparConcluidas() {
  lista.querySelectorAll("li").forEach(li => {
    const span = li.querySelector("span");
    if (span.classList.contains("concluida")) {
      li.remove();
    }
  });

  salvarTarefas();
  atualizarContador();
}

// ===============================
// RESETAR TUDO
// ===============================
function resetarTudo() {
  localStorage.clear();
  lista.innerHTML = "";
  atualizarContador();
}

// ===============================
// MODO ESCURO
// ===============================
function alternarTema() {
  document.body.classList.toggle("dark");
}

// ===============================
// ADICIONAR COM ENTER
// ===============================
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});

// ===============================
// INICIALIZAÇÃO
// ===============================
carregarTarefas();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log("Erro:", err));
}
const clickSound = document.getElementById("clickSound");

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function adicionarTarefa() {
  const input = document.querySelector("input");
  const texto = input.value.trim();

  if (texto === "") return;

  playSound();

  const li = document.createElement("li");
  li.textContent = texto;

  li.addEventListener("click", () => {
    li.classList.toggle("concluida");
    playSound();
  });

  li.addEventListener("dblclick", () => {
    playSound();
    li.classList.add("remover");
    setTimeout(() => li.remove(), 300);
  });

  document.querySelector("ul").appendChild(li);
  input.value = "";
}
