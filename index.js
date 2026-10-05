async function buscarEndereco(cep) {
  // Limpa o CEP
  cep = String(cep).replace(/\D/g, "");

  // Valida se tem exatamente 8 dígitos
  if (cep.length !== 8) return;

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      alert("CEP não encontrado!");
      return;
    }

    // Preenche os campos do formulário diretamente no HTML
    document.getElementById("logradouro").value = dados.logradouro || "";
    document.getElementById("bairro").value = dados.bairro || "";
    document.getElementById("localidade").value = dados.localidade || "";
    document.getElementById("estado").value = dados.uf || ""; // ViaCEP usa 'uf' para o estado

  } catch (erro) {
    console.error("Erro ao buscar o CEP:", erro);
  }
}

// Ouve a digitação no input do CEP
const inputCep = document.getElementById("cep");

inputCep.addEventListener("input", (e) => {
  buscarEndereco(e.target.value);
});