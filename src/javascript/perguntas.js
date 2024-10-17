import Ajax from "./ajax.js";
import Question from "./Question.js";

let jsonteste = 
[
  {
      "id": 10,
      "text": "O que é uma chave estrangeira em um banco de dados relacional?",
      "optionA": "Uma tabela auxiliar",
      "optionB": "Uma restrição para valores únicos",
      "optionC": "Um campo que referencia uma chave primária de outra tabela",
      "optionD": "Uma tabela temporária",
      "optionE": "testando123",
      "correctAnswer": "C"
  },

  {
      "id": 7,
      "text": "O que é um banco de dados NoSQL?",
      "optionA": "Um banco de dados relacional",
      "optionB": "Uma banco de dados hierárquico",
      "optionC": "Um banco de dados que não usa SQL",
      "optionD": "Um banco de dados que armazena imagens",
      "correctAnswer": "C"
  }
];

let apiteste = 
{
  "username": "TesteAndoUndois",
  "email": "testando@gmail.com",
  "password": "testando123",
  "role": ["user"],
  "courseId": 24
}

let apiteste2 = 
{
 "username": "posteste2",
  "email": "testevaipostman2@gmail.com",
  "password": "12345678",
  "role": ["user"],
  "courseId": 17
}

let apiteste3 =
{
  "username": "TesteAndoUndois",
  "password": "testando123"
}

window.onload = async () =>
{
    let divs = Array.from(document.querySelectorAll(".question-div"));
    let questArray = [];
    let token = Ajax.readCookie("token");
    alert(JSON.stringify(Ajax.parseJWT(token)))
    alert(window.history.state); // <---- o link da requisição
    console.warn(token)
    
    
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
          quiz.push({"questionId:" : question.instancia.id, "selectedOption": question.marcada});
        }

        let resultados = await Ajax.request({method: "POST", url: `quiz/submit?userid=${Ajax.parseJWT(token).id}`, body: quiz, auth: token});
        if (resultados instanceof Error) alert("Deu errado");
        else
        {
          console.warn(resultados);
        }
      });
    }
    
    
}