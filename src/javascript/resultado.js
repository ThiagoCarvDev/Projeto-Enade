window.onload = () => {
  // Obtém os dados de resultados armazenados no localStorage (ou vindos da resposta do backend diretamente)
  let resultados = JSON.parse(localStorage.getItem("resultadosQuiz"));

  if (resultados) {
    // Extrai a quantidade de acertos, erros e calcula a porcentagem
    let correctCount = resultados.correctCount;
    let incorrectCount = resultados.incorrectCount;
    let totalQuestions = correctCount + incorrectCount;
    let porcentagem = ((correctCount / totalQuestions) * 100).toFixed(2);

    // Exibe o quadro de resultados com a quantidade de acertos, erros e porcentagem
    let quadroResultados = document.querySelector("#quadroResultados");
    quadroResultados.innerHTML = `
      <p>Acertos: ${correctCount}</p>
      <p>Erros: ${incorrectCount}</p>
      <p>Porcentagem de Acertos: ${porcentagem}%</p>
    `;

    // Exibe cada pergunta e a resposta do usuário, destacando acertos e erros
    let perguntasContainer = document.querySelector("#perguntasResultados");
    resultados.results.forEach((pergunta, index) => {
      let cor = pergunta.isCorrect ? "green" : "red"; // Mude para `isCorrect` ou `correct` conforme o backend define
      perguntasContainer.innerHTML += `
        <div style="color:${cor}; margin-bottom: 15px;">
          <p>Pergunta ${index + 1}: ${pergunta.questionText}</p>
          <p>Sua resposta: ${pergunta.userAnswer}</p>
          <p>Resposta correta: ${pergunta.correctAnswer}</p>
        </div>
      `;
    });
  } else {
    alert("Não foi possível carregar os resultados.");
  }
};
