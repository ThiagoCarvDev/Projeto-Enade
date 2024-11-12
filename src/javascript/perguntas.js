import Ajax from "./ajax.js";
import Question from "./Question.js";


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
    //alert(JSON.stringify(Ajax.parseJWT(token)))
    //alert(window.history.state); // <---- o link da requisição
    //console.warn(token) 
    
    
    let resposta = await Ajax.request({method: "GET", url: history.state, auth: token}); 
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
        questArray.push(new Question(json, divs[index]))
      });

      document.querySelector(".btn").addEventListener("click", async () =>
      {
        let quiz = [];
        for (let question of Question.instances)
        {
          quiz.push({"questionId": question.instancia.id, "selectedOption": question.instancia.selectedOption});
        }

        let resultados = await Ajax.request({method: "POST", url: `quiz/submit?userid=${Ajax.parseJWT(token).id}`, body: quiz, auth: token});
        if (resultados instanceof Error) alert("Falha de conexão.");
        else
        {
          console.warn(resultados);

          resultados.results.forEach((pergunta) =>
          {
            let questao = Question.getOneInstance(pergunta.questionId);
            questao.instancia.correct = pergunta.correct;
          });

          
          // Salva os resultados no sessionStorage para serem acessados na tela de resultados
          sessionStorage.setItem("quizResultados", JSON.stringify(resultados));

          // Redireciona para a tela de resultados
          window.location.href = "./resultado.html";
        }
        
      });
    }
    
    
}