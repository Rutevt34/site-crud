let produtos = [];

document.addEventListener("DOMContentLoaded", () => {
  // Carrega os produtos do localStorage ao iniciar a página
  const dadosSalvos = localStorage.getItem("produtos");
  if (dadosSalvos) {
    produtos = JSON.parse(dadosSalvos);
    atualizarTabela();
  }

  // Configura o envio do formulário
  document.getElementById("formProduto").addEventListener("submit", salvarProduto);
});

function salvarProduto(event) {
  event.preventDefault();

  const indiceEdicao = document.getElementById('indiceEdicao').value;
  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const categoria = document.getElementById('categoria').value;
  // Os IDs no lista.html (origem, lote, validade) são diferentes dos IDs no cadastro.html
  // Certifique-se de que os IDs abaixo correspondem aos inputs no lista.html
  const origem = document.getElementById('origem').value;
  const lote = document.getElementById('lote').value; 
  const validade = document.getElementById('validade').value;

  const produto = { nome, preco, quantidade, categoria, origem, lote, validade };

  if (indiceEdicao === "") {
    produtos.push(produto);
  } else {
    produtos[indiceEdicao] = produto;
    document.getElementById('indiceEdicao').value = "";
  }

  document.getElementById("formProduto").reset();
  salvarNoLocalStorage();
  atualizarTabela();
}

function atualizarTabela() {
  const corpo = document.getElementById("corpoTabela");
  corpo.innerHTML = "";

  produtos.forEach((produto, index) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${produto.nome}</td>
      <td>R$ ${produto.preco.toFixed(2)}</td>
      <td>${produto.quantidade}</td>
      <td>${produto.categoria}</td>
      <td>${produto.origem}</td>
      <td>${produto.lote}</td>
      <td>${produto.validade}</td>
      <td>
        <button onclick="editarProduto(${index})">Editar</button>
        <button onclick="excluirProduto(${index})">Excluir</button>
      </td>
    `;

    corpo.appendChild(linha);
  });
}

function editarProduto(index) {
  const produto = produtos[index];

  document.getElementById("nome").value = produto.nome;
  document.getElementById("preco").value = produto.preco;
  document.getElementById("quantidade").value = produto.quantidade;
  document.getElementById("categoria").value = produto.categoria;
  document.getElementById("origem").value = produto.origem;
  document.getElementById("lote").value = produto.lote;
  document.getElementById("validade").value = produto.validade;
  document.getElementById("indiceEdicao").value = index;
}

function excluirProduto(index) {
  if (confirm("Deseja realmente excluir este produto?")) {
    produtos.splice(index, 1);
    salvarNoLocalStorage();
    atualizarTabela();
  }
}

function salvarNoLocalStorage() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}