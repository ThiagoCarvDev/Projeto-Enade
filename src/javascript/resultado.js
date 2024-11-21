import {Question, QuestResult} from "./Question.js";


window.onload = () => 
{
  // Obtém os dados de resultados armazenados no localStorage (ou vindos da resposta do backend diretamente)
  const resultados = JSON.parse(sessionStorage.getItem("quizResultados"));
  function scoreSpan(nome, numero)
  {
    const scoreSpan = document.createElement("span");
    scoreSpan.textContent = nome;
    
    const boldElement = document.createElement("b");
    boldElement.textContent = numero;
    scoreSpan.appendChild(boldElement);

    return scoreSpan;
  }
  
  document.querySelector("main > h2").textContent = "TIPO DO QUIZ";
  document.querySelector("header h2").textContent = ((resultados.correctCount / 10) * 100).toFixed(2) + "%";
  document.querySelector(".exit").addEventListener("click", () => window.location.href = "./telaPrincipal.html")

  
  
  
  
  
  

  document.querySelector(".stats").replaceChildren(scoreSpan("Acertos: ", resultados.correctCount), scoreSpan("Erros: ", resultados.incorrectCount));
  
  console.log(resultados);
  
  
  for (let question of resultados.results)
  {
    const pergunta = new QuestResult(question);
    //console.log([question, pergunta, Question.instances]);
    //console.warn(Question.getOneInstance(36));
    document.querySelector("main").appendChild(Question.getOneInstance(pergunta.questionId).local);
  }

  if (resultados) {
    // Extrai a quantidade de acertos, erros e calcula a porcentagem
    let correctCount = resultados.correctCount;
    let incorrectCount = resultados.incorrectCount;
    let totalQuestions = correctCount + incorrectCount;
    let porcentagem = ((correctCount / totalQuestions) * 100).toFixed(2);

    

    
    
    //console.log(Question.instances);
    
    /*let quadroResultados2 = document.querySelector(".question-card");
    console.warn(quadroResultados2);
    new QuestResult(resultados.results[0], quadroResultados2);*/
    
  } else {
    alert("Não foi possível carregar os resultados.");
  }
};
