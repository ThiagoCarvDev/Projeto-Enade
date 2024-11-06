// Verifica se há resultados no sessionStorage
const resultados = JSON.parse(sessionStorage.getItem("quizResultados"));

if (resultados) {
  // Função para exibir os resultados na tela
  function atualizarResultados(resultados) {
    const resultadosDiv = document.querySelector(".resultados");
    let acertos = 0;

    resultados.forEach((resultado) => {
      const perguntaDiv = document.createElement("div");
      perguntaDiv.classList.add("pergunta");
      perguntaDiv.innerText = resultado.pergunta;  // Exibe a pergunta (pode precisar de ajuste dependendo dos dados)

      if (resultado.correta) {
        perguntaDiv.classList.add("correta");
        acertos++;
      } else {
        perguntaDiv.classList.add("incorreta");
      }

      resultadosDiv.appendChild(perguntaDiv);
    });

    const totalPerguntas = resultados.length;
    const erros = totalPerguntas - acertos;
    const percentualAcertos = ((acertos / totalPerguntas) * 100).toFixed(2);

    document.getElementById("acertos").innerText = acertos;
    document.getElementById("erros").innerText = erros;
    document.getElementById("percentual").innerText = percentualAcertos;
  }

  // Exibe os resultados na página
  atualizarResultados(resultados);
} else {
  // Caso não haja dados no sessionStorage, redireciona para a tela principal
  alert("Resultados não encontrados. Realize o quiz novamente.");
  window.location.href = "./telaPrincipal.html";
}
