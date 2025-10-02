let formCadastro = document.getElementById("formCadastro");
let nome = document.getElementById("nome");
let preco = document.getElementById("preco");
let quantidade = document.getElementById("quantidade");
let categoria = document.getElementById("categoria");
let oridoproduto = document.getElementById("oridoproduto");
let lotedoproduto = document.getElementById("lotedoproduto");
let validadedoproduto = document.getElementById("validadedoproduto");

function handleCadastro(event){
    // Previnir o envio padrão (para a página não recarregar)
    event.preventDefault(); 
    
    //Verifica a validade dos campos HTML5 antes de prosseguir
    if (!formCadastro.checkValidity()) {
        alert("Por favor, preencha todos os campos corretamente.");
        return; // Sai da função se a validação HTML falhar
    }

    // Coleta os dados do novo produto
    const novoProduto = {
        nome: nome.value,
        preco: parseFloat(preco.value),
        quantidade: parseInt(quantidade.value),
        categoria: categoria.value,
        origem: oridoproduto.value,
        lote: lotedoproduto.value,
        validade: validadedoproduto.value
    };

    // Salva no localStorage
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.push(novoProduto);
    localStorage.setItem("produtos", JSON.stringify(produtos));

    alert(`Produto '${novoProduto.nome}' cadastrado com sucesso!`);
    // Limpar o formulário
    formCadastro.reset();
    // Redireciona para lista.html
    window.location.href = "lista.html";
}

//Ligar a função ao evento 'submit' do formulário
formCadastro.addEventListener("submit", handleCadastro);