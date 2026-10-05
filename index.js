const inputCep = document.getElementById("cep");
const inputLogradouro = document.getElementById("logradouro");
const inputBairro = document.getElementById("bairro");
const inputLocalidade = document.getElementById("localidade");
const inputEstado = document.getElementById("estado");
const mensagemErro = document.getElementById("mensagem-erro");

async function buscarEndereco(cep) {

  const cepLimpo = String(cep).replace(/\D/g, "");

  mensagemErro.textContent = "";

  if (cepLimpo.length !== 8) {
    limparCampos();
    return;
  }

  preencherCampos("Carregando...", "Carregando...", "Carregando...", "...");

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      mensagemErro.textContent = "CEP não encontrado.";
      limparCampos();
      return;
    }

    preencherCampos(
      dados.logradouro || "Não informado",
      dados.bairro || "Não informado",
      dados.localidade,
      dados.uf
    );

  } catch (erro) {
    mensagemErro.textContent = "Erro ao conectar com o serviço de CEP.";
    limparCampos();
    console.error("Erro na busca do CEP:", erro);
  }
}

function preencherCampos(logradouro, bairro, localidade, estado) {
  inputLogradouro.value = logradouro;
  inputBairro.value = bairro;
  inputLocalidade.value = localidade;
  inputEstado.value = estado;
}

function limparCampos() {
  preencherCampos("", "", "", "");
}

inputCep.addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, "");
  
  if (valor.length > 5) {
    valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
  }

  e.target.value = valor;

  if (valor.replace(/\D/g, "").length === 8) {
    buscarEndereco(valor);
  } else if (valor.replace(/\D/g, "").length < 8) {
    limparCampos();
    mensagemErro.textContent = "";
  }
});