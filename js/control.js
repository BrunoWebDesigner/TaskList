let contador = 0;
let input = document.getElementById("inputTarefa");
let btnAdd = document.getElementById("btn-add");
let main = document.getElementById("areaLista");

// Função para salvar as tarefas no Local Storage
function salvarTarefasNoLocalStorage() {
  const tarefas = Array.from(main.children).map(item => ({
    id: item.id,
    nome: item.querySelector('.item-nome').textContent,
    marcada: item.querySelector('.mdi-circle-outline').classList.contains('marcada')
  }));

  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para restaurar as tarefas do Local Storage
function restaurarTarefasDoLocalStorage() {
  const tarefas = JSON.parse(localStorage.getItem('tarefas'));

  if (tarefas) {
    tarefas.forEach(tarefa => {
      const novoItem = `<div id="${tarefa.id}" class="item">
        <div onclick="marcarTarefa(${tarefa.id})" class="item-icone">
          <i id="icone_${tarefa.id}" class="mdi mdi-circle-outline ${tarefa.marcada ? 'marcada' : ''}"></i>
        </div>
        <div onclick="marcarTarefa(${tarefa.id})" class="item-nome">
          ${tarefa.nome}
        </div>
        <div class="item-botao">
          <button onclick="deletar(${tarefa.id})" class="delete"><i class="mdi mdi-delete"></i> Deletar</button>
        </div>
      </div>`;

      main.innerHTML += novoItem;
    });
  }
}

// Função para remover uma tarefa do Local Storage pelo ID
function removerTarefaDoLocalStorage(id) {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  
  // Encontrar e remover a tarefa com o ID correspondente
  const novaListaTarefas = tarefas.filter(tarefa => tarefa.id != id);
  
  // Salvar a nova lista no Local Storage
  localStorage.setItem('tarefas', JSON.stringify(novaListaTarefas));
}

function addTarefa() {
  //PEGAR O VALOR DIGITADO NO INPUT
  let valorInput = input.value;

  //SE NÃO FOR VAZIO, NEM NULO, NEM INDEFINIDO
  if (valorInput !== "" && valorInput !== null && valorInput !== undefined) {
    ++contador;

    let novoItem = `<div id="${contador}" class="item">
        <div onclick="marcarTarefa(${contador})" class="item-icone">
            <i id="icone_${contador}" class="mdi mdi-circle-outline"></i>
        </div>
        <div onclick="marcarTarefa(${contador})" class="item-nome">
            ${valorInput}
        </div>
        <div class="item-botao">
            <button onclick="deletar(${contador})" class="delete"><i class="mdi mdi-delete"></i> Deletar</button>
        </div>
    </div>`;

    //ADICIONAR NOVO ITEM NO MAIN
    main.innerHTML += novoItem;

    // SALVAR TAREFAS NO LOCAL STORAGE
    salvarTarefasNoLocalStorage();

    //APAGAR CAMPOS
    input.value = "";
    input.focus();
  }
}

function deletar(id) {
  var tarefa = document.getElementById(id);
  tarefa.remove();

    // Remover a tarefa do Local Storage
    removerTarefaDoLocalStorage(id);
}

function marcarTarefa(id) {
  var item = document.getElementById(id);
  var classe = item.getAttribute("class");
  console.log(classe);

  if (classe == "item") {
    item.classList.add("clicado");

    var icone = document.getElementById("icone_" + id);
    icone.classList.remove("mdi-circle-outline");
    icone.classList.add("mdi-check-circle");

    item.parentNode.appendChild(item);

    removerTarefaDoLocalStorage(id);

  } else {
    item.classList.remove("clicado");

    var icone = document.getElementById("icone_" + id);
    icone.classList.remove("mdi-check-circle");
    icone.classList.add("mdi-circle-outline");

    salvarTarefasNoLocalStorage()
  }
}

input.addEventListener("keyup", function (event) {
  //SE TECLOU ENTER (TECLA 13 NO TECLADO)
  if (event.keyCode === 13) {
    event.preventDefault();
    btnAdd.click();
  }
});


// Função para salvar o estado do modo escuro no Local Storage
function salvarModoEscuroNoLocalStorage() {
  const modoEscuroAtivo = document.body.classList.contains("dark-mode");
  localStorage.setItem("modoEscuro", modoEscuroAtivo);
}

// Função para restaurar o estado do modo escuro do Local Storage
function restaurarModoEscuroDoLocalStorage() {
  const modoEscuroAtivo = JSON.parse(localStorage.getItem("modoEscuro"));

  if (modoEscuroAtivo) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}


const nightMode = document.querySelector('#night-mode')

// ao clicar mudaremos as cores
function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

restaurarTarefasDoLocalStorage();
restaurarModoEscuroDoLocalStorage();