import questionDiv from "./QuestionDiv.js";

/**Classe que representa os objetos extraídos do JSON da API. Possui também métodos estáticos para manipualção das suas instâncias.*/
class Question
{
  /**Identificador da questão. @type {number}*/ 
  id; 
  
  /**Enunciado da questão. @type {string}*/
  text;

  /**Alternativa certa. @type {string}*/
  correctAnswer;

  /**Alternativa marcada. @type {string} */
  selectedOption;

  optionA;
  optionB;
  optionC;
  optionD;



  /**Contém todas as instâncias de Question criadas. 
   * @type {Array<{instancia: Question, local: HTMLDivElement, numero: number}>}*/
  static #instances = [];
  
  /**@param {{instancia: Question, local: HTMLDivElement}} instance*/
  static set instances(instance)
  {
    instance.instancia.selectedOption = null;
    instance.numero = Question.instances.length + 1;
    this.#instances.push(instance);
  }

  /**Retorna todas as instâncias de Question criadas. Ela relaciona a questão ao seu respectivo elemento HTML na página.
   * @returns {Array<{instancia: Question, local: HTMLDivElement, numero: number}>}*/
  static get instances()
  {
    return this.#instances;
  }



  /**Seleciona uma instância de Question com base no seu ID. Retorna um objeto contendo a instância e seu respectivo elemento HTML.
   * @param {number} id @returns {{instancia: Question, local: HTMLDivElement, numero: number} | null}*/
  static getOneInstance(id)
  {
    for (let question of Question.instances)
    {
      if (question.instancia.id === id)
      {
        return question;
      }
      
    }
    
    return null;
  }



  /**Salva a opção marcada na memória, dentro do Question.instances. Pega o ID e salva a letra da opção marcada.
   * @param {HTMLInputElement} element ID do elemento HTML em formato string. @returns {void}*/
  static selectOption(element)
  {
    //console.log(element);
    let question = Question.getOneInstance(parseInt(element.id.match(/\d+/g)[0]));
    question.instancia.selectedOption = element.value.toUpperCase();
    //console.log(question);
  }



  /**@param {Question} quest @param {HTMLDivElement} element*/
  constructor(quest, element = document.createElement("div"))
  {
    //Transfusão do JSON para um objeto de Question
    for (let q in quest)
    {
      this[q] = quest[q];
    }
    
    //Criando o elemento HTMl da pergunta
    element.replaceChildren();
    element.className = "question-div";
    questionDiv(this, element);
    
    console.error([this, element]);
    Question.instances = {"instancia": this, "local": element};
  }

}

export default Question;