import { Question, QuestResult} from "./Question.js";

/**@param {QuestResult} thiss @param {HTMLDivElement} element*/
function questionCard(thiss, element) 
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
      
      optionsDiv.appendChild(label);
    })
  
    element.appendChild(optionsDiv);
}
  

export default questionCard;