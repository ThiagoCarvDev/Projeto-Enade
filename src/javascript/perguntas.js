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
    let divs = Array.from(document.querySelector(".form").children);
    //divs = Array.prototype.slice.call(divs);
    divs.pop();
    divs.shift();
    console.log(divs);

    

    /*let testao = new Question(jsonteste[0]);
    let testona = new Question(jsonteste[1]);
    //console.log(testao);
    console.log(Question.instances);*/
    
    
    let resposta = 0 //await get("https://mspfa.com");
    if (resposta.constructor == Error || resposta.constructor == TypeError)
    {
      console.log(resposta);
      alert("Ocorreu um erro. Verifique sua conexão ou tente novamente mais tarde.");
    }
    else
    {
      //alert(resposta);  
      new Question(jsonteste[0], divs[0]);
      Question.instances[0].local.children[0].innerText = Question.instances[0].instancia.text;
      //testao.text = "HUEHUEHUEHUHEUHEUEUHUE";
    }
    
    
}