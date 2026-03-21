import Ajax from "./modules/Ajax.js";
import Question from "./modules/Question.js";
import QuestQuiz from "./modules/QuestQuiz.js";
import { jsonteste } from "./modules/teste.js";

const MOCK = true;

window.onbeforeunload = event => 
{
  let confirmationMessage = "Tem certeza que deseja sair desta página?";
  event.returnValue = confirmationMessage; 
  return confirmationMessage;
};

window.addEventListener('popstate', event => 
{
  window.location.reload();
});

window.onload = async () =>
{
    let divs = Array.from(document.querySelectorAll(".question-div"));
    let questArray = [];
    const token = Ajax.readCookie("token"); 
    
    let resposta = MOCK ? jsonteste : await Ajax.request({method: "GET", url: history.state, auth: token}); 
    
    const state = MOCK ? "técnicas" : (/general/g.test(window.history.state) ? "gerais" : "técnicas");
    document.querySelector(".quiz-type").textContent += " " + state;
    window.history.replaceState(null, "", window.location.pathname);

    if (resposta instanceof Error) 
    { 
      console.error(resposta);
      alert("Ocorreu um erro. Verifique sua conexão ou tente novamente mais tarde.");
      window.location.href = "./telaPrincipal.html";
    }
    else
    {
      resposta.forEach((json, index) =>
      {
        questArray.push(new QuestQuiz(json, divs[index]));
      });

      document.querySelector(".btn").addEventListener("click", async () =>
      {
        let quiz = [];
        let emBranco = 0;
        for (let question of Question.instances)
        {
          quiz.push({"questionId": question.instancia.id, "selectedOption": question.instancia.selectedOption});
          if (question.instancia.selectedOption === null) emBranco++;
        }

        let aviso = emBranco === 0 ? "Certeza que deseja concluir o quiz?" : "Você possui " + emBranco + 
        " questões não respondidas. Enviar mesmo assim?";

        if (window.confirm(aviso))
        {
          if (MOCK)
          {
            const results = jsonteste.map(q =>
            {
              const instancia = Question.instances.find(i => i.instancia.id === q.id)?.instancia;
              const selected = instancia?.selectedOption || null;
              return {
                questionId: q.id,
                questionText: q.text,
                optionA: q.optionA,
                optionB: q.optionB,
                optionC: q.optionC,
                optionD: q.optionD,
                correctAnswer: q.correctAnswer,
                selectedOption: selected,
                correct: selected === q.correctAnswer
              };
            });

            const correctCount = results.filter(r => r.correct).length;

            const resultadoMock = {
              correctCount: correctCount,
              incorrectCount: results.length - correctCount,
              results: results
            };

            sessionStorage.setItem("quizResultados", JSON.stringify([resultadoMock, state]));
            window.onbeforeunload = null;
            window.location.href = "./resultado.html";
          }
          else
          {
            let resultados = await Ajax.request({method: "POST", url: `quiz/submit?userid=${Ajax.parseJWT(token).id}`, body: quiz, auth: token});
            if (resultados instanceof Error) alert("Falha de conexão.");
            else
            {
              sessionStorage.setItem("quizResultados", JSON.stringify([resultados, state]));
              window.onbeforeunload = null;
              window.location.href = "./resultado.html";
            }
          }
        }
      });
    }

    window.scrollTo(0,0);
}