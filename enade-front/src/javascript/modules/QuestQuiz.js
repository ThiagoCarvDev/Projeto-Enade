import Question from "./Question.js";

/**Classe para gerar questões na tela de perguntas e permitir a manipulação delas mediante a classe Question.*/
class QuestQuiz extends Question
{
  /**Identificador da questão. @type {number}*/ 
  id; 
  
  /**Enunciado da questão. @type {string}*/
  text;

  /**Gera o elemento HTML da questão, na tela de perguntas.
   * @param {QuestResult} thiss 
   * @param {HTMLDivElement} element
   **/
  static questionDiv(thiss, element)
  {
    //Texto da questão
    let name = document.createElement("div");
    name.className = "name";
    name.innerText = (Question.instances.length) + ". " + thiss.text;
    
    //Spam
    let span = document.createElement("span");
    span.className = "required";
    span.innerText = "*";

    //Adicionando o span ao texto e o texto à div
    name.appendChild(span);
    element.appendChild(name);

    //Criando o container input-div
    let inputDiv = document.createElement("div");
    inputDiv.className = "input-div";
    element.appendChild(inputDiv);
    


    //Pega todas os atributos com "option" no nome, até mesmo caso haja alguma opcao a mais (tipo, uma optionE)
    let opcoes = [];
    for (let atributo in thiss)
    {
    let match = atributo.match(/option./);
    match === null ? "nada acontece" : opcoes.push(match[0]);
    
    }
    

    //Cria uma label para cada opcao e adiciona ao input-div
    opcoes.forEach((opcao, index) =>
    {
    let label = document.createElement("label");
    let input = document.createElement("input");
    label.appendChild(input);
    inputDiv.appendChild(label);
    inputDiv.appendChild(document.createElement("br"));

    input.type = "radio";
    input.name = "q" + (Question.instances.length + 1);
    input.id = opcao + thiss.id;
    input.value = opcao.match(/[A-Z]/g)[0];
    label.append(thiss[opcao]);

    input.addEventListener("input", event => Question.selectOption(event.target))
    });
  }

  /**@param {Question} quest @param {HTMLDivElement} element*/
  constructor(quest, element = document.createElement("div"))
  {
    super(quest, element);
    this.id = quest.id;
    this.text = quest.text;
    element.className = "question-div";
    QuestQuiz.questionDiv(this, element);
  }
}

export default QuestQuiz;