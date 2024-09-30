import { get, post} from "./ajax.js";
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
  "username": "Teste Ando Undois",
  "email:": "testando@gmail.com",
  "password": "testando123",
  "role": ["user"],
  "courseId": "24"
}

window.onload = async () =>
{
    let divs = Array.from(document.querySelectorAll(".question-div"));
    
    
    
    let resposta = 0; // await post("http://3.82.216.128:8080/api/auth/register", "", apiteste);
    if (resposta instanceof Error) 
    { 
      console.warn(resposta);
      alert("Ocorreu um erro. Verifique sua conexão ou tente novamente mais tarde.");
    }
    else
    {
      //console.warn(resposta);
      let questArray = [];
      jsonteste.forEach((json, index, jsonteste)=>
      {
        questArray.push(new Question(json, divs[index]))
      }) 
    }
    
    
}