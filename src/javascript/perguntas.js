import Ajax from "./modules/Ajax.js";
import Question from "./modules/Question.js";
import QuestQuiz from "./modules/QuestQuiz.js";


window.onbeforeunload = event => 
{
  let confirmationMessage = "Tem certeza que deseja sair desta página?";
  //event.returnValue = confirmationMessage; 
  return confirmationMessage;
};

window.addEventListener('popstate', event => 
{
  //console.log('URL:', document.location.href, 'State:', event.state);
  window.location.reload();
});

window.onload = async () =>
{
    let divs = Array.from(document.querySelectorAll(".question-div"));
    let questArray = [];
    let token = Ajax.readCookie("token"); 
    
    
    let resposta = await Ajax.request({method: "GET", url: history.state, auth: token}); 
    const state = /general/g.test(window.history.state) ? "gerais" : "técnicas";
    //console.error(window.history.state.match(/general/g)[1]); 
    window.history.replaceState(null, "", window.location.pathname);
    if (resposta instanceof Error) 
    { 
      alert("Ocorreu um erro. Verifique sua conexão ou tente novamente mais tarde.");
      window.location.href = "./telaPrincipal.html";
    }
    else
    {
      resposta.forEach((json, index, jsonteste)=>
      {
        questArray.push(new QuestQuiz(json, divs[index]))
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
          let resultados = await Ajax.request({method: "POST", url: `quiz/submit?userid=${Ajax.parseJWT(token).id}`, body: quiz, auth: token});
          if (resultados instanceof Error) alert("Falha de conexão.");
          else
          {
            // Salva os resultados no sessionStorage para serem acessados na tela de resultados
            sessionStorage.setItem("quizResultados", JSON.stringify([resultados, state]));

            // Redireciona para a tela de resultados
            window.onbeforeunload = null;
            window.location.href = "./resultado.html";
          }
        }
      });
    }
}