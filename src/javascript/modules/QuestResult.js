import Question  from "./Question.js";

/**Classe para gerar questões na tela de resultados e permitir a manipulação delas mediante a classe Question.*/
class QuestResult extends Question
{
  /**Identificador da questão. @type {number}*/ 
  questionId; 
  
  /**Enunciado da questão. @type {string}*/
  questionText;

  /**Indica se acertou ou errou. @type {boolean}*/
  correct;


  /**Gera o elemento HTML da questão, na tela de resultados.
   * @param {QuestResult} thiss 
   * @param {HTMLDivElement} element
   **/
  static questionCard(thiss, element) 
  {
      // Criando o título da pergunta
      const questionTitle = document.createElement("h3");
      questionTitle.textContent = "Pergunta " + Question.getOneInstance(thiss.questionId).numero;
      element.appendChild(questionTitle);
    
      // Criando os parágrafos
      const paragraph1 = document.createElement("p");
      const strongText = document.createElement("strong");
      strongText.textContent = "Texto: ";
      paragraph1.appendChild(strongText);
      paragraph1.insertAdjacentText("beforeend", thiss.questionText);
  
      // O texto que acompanha o strong será adicionado aqui
      element.appendChild(paragraph1);
    
      // Criando o container das opções
      const optionsDiv = document.createElement("div");
      optionsDiv.className = "options";
      
  
      //Pega todas os atributos com "option" no nome, até mesmo caso haja alguma opcao a mais (tipo, uma optionE)
      let opcoes = [];
      for (let atributo in thiss)
      {
        let match = atributo.match(/option./);
        match === null ? "nada acontece" : opcoes.push(match[0]);
        
      }
      
      // Criando as labels e inputs das opções
      opcoes.forEach(opcao =>
      {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.disabled = true;
        input.type = "radio";
        input.name = "question-" + Question.getOneInstance(thiss.questionId).numero;
        input.value = opcao.match(/[A-Z]/)[0];
        label.appendChild(input);
        label.append(opcao.match(/[A-Z]/)[0] +  ") " + thiss[opcao])
  
        //Aplicando as classes certas para cada opção, caso certa, errada ou marcada.
        if (thiss.correct && thiss.correctAnswer === input.value)
        {
          input.checked = true;
          label.className = "resposta-certa";
        }
        else 
        {
          if (thiss.selectedOption === input.value)
          {
            input.checked = true;
            label.className = "resposta-errada";
          }
          else if (thiss.correctAnswer === input.value)
          {
            label.className = "resposta-certa";
          }
        }
        
        optionsDiv.appendChild(label);
      })
    
      element.appendChild(optionsDiv);
  
      //Mostra se ele não respondeu a pergunta.
      if (thiss.selectedOption === null)
      {
        const irineu = document.createElement("p");
        irineu.textContent = "Você não respondeu essa pergunta.";
        element.appendChild(irineu);
      }
  }

  /**@param {Question} quest @param {HTMLDivElement} element*/
  constructor(quest, element = document.createElement("div"))
  {
    super(quest, element);

    this.questionId = quest.questionId;
    this.questionText = quest.questionText;
    this.correct = quest.correct;

    element.className = "question-card";
    QuestResult.questionCard(this, element);
  }
}

export default QuestResult;