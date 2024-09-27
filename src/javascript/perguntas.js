import { get } from "./ajax.js";
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

window.onload = async () =>
{
    let divs = Array.from(document.querySelectorAll(".question-div"));
    //console.log(divs);
    
    
    let resposta = 0; //await get("https://mspfa.com");
    if (resposta instanceof Error) 
    { 
      console.warn(resposta);
      alert("Ocorreu um erro. Verifique sua conexão ou tente novamente mais tarde.");
    }
    else
    {
      //alert(resposta);
      let questArray = [];
      jsonteste.forEach((json, index, jsonteste)=>
      {
        questArray.push(new Question(json, divs[index]))
      }) 
      //console.log(Question.getOneInstance(7));
      //console.log(Question.selectOption(document.querySelectorAll(".input-div input")[0]));
    }
    
    
}