import Question from "./modules/Question.js";
import QuestResult from "./modules/QuestResult.js";


window.onload = () => 
{
  // Obtém os dados de resultados armazenados no localStorage (ou vindos da resposta do backend diretamente)
  const [resultados, tipo] = JSON.parse(sessionStorage.getItem("quizResultados"));

  function scoreSpan(nome, numero)
  {
    const scoreSpan = document.createElement("span");
    scoreSpan.textContent = nome;
    
    const boldElement = document.createElement("b");
    boldElement.textContent = numero;
    scoreSpan.appendChild(boldElement);

    return scoreSpan;
  }
  
  
  document.querySelector("main > h2").textContent = "Perguntas " + tipo;
  document.querySelector(".result-header h2").textContent = ((resultados.correctCount / 10) * 100).toFixed(2) + "%";
  document.querySelector(".exit").addEventListener("click", () => window.location.href = "./telaPrincipal.html");
  document.querySelector(".stats").replaceChildren(scoreSpan("Acertos: ", resultados.correctCount), scoreSpan("Erros: ", resultados.incorrectCount));
  
  
  for (let question of resultados.results)
  {
    const pergunta = new QuestResult(question);
    document.querySelector("main").appendChild(Question.getOneInstance(pergunta.questionId).local);
  }
};
