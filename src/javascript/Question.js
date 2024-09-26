class Question
{
  /**@type {number}*/ 
  id; 
  
  text;
  optionA;
  optionB;
  optionC;
  optionD;
  correctAnswer;


  //O atributo instances vai armazenar TODAS as instâncias criadas de Question. Isso vai servir para a gente 
  //rastrear mais fácil no código onde cada questão está
  /**@type {Array<{instancia: Question, local: HTMLDivElement}>}*/
  static #instances = [];
  
  /**@param {{instancia: Question, local: HTMLDivElement}} instance*/
  static set instances(instance)
  {
    this.#instances.push(instance);
  }

  /**@returns {Array<{instancia: Question, local: HTMLDivElement}>}*/
  static get instances()
  {
    return this.#instances;
  }



  /**@param {number} id @returns {{instancia: Question, local: HTMLDivElement} | null}*/
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

  /**@param {string} id @returns {void}*/
  static selectOption(id)
  {
    return Question.getOneInstance(parseInt(id.match(/\d+/g)[0]));
  }



  /**@param {Question} quest @param {HTMLDivElement} element*/
  constructor(quest, element)
  {
    //Transfusão do JSON para um objeto de Question
    for (let q in quest)
    {
      this[q] = quest[q];
    }
    

    //Pegando o conteúdo da questão e inserindo no elemento
    element.querySelector(".name").innerText = this.text;
    let choices = document.createElement("div");
    choices.className = "choices";
    element.appendChild(choices);


    //Pega todas os atributos com "option" no nome, até mesmo caso haja alguma opcao a mais (tipo, uma optionE)
    let opcoes = [];
    for (let atributo in this)
    {
      let match = atributo.match(/option./);
      match === null ? "nada acontece" : opcoes.push(match[0]);
      //console.log(opcoes);
    }
    

    //Cria uma div para cada opcao e adiciona ao elemento choices
    opcoes.forEach((opcao, index) =>
    {
      let divOpcao = document.createElement("div");
      divOpcao.className = "option";
      divOpcao.id = opcao + this.id;

      divOpcao.innerText = this[opcao];
      choices.appendChild(divOpcao);
    })

    
    
    Question.instances = {"instancia": this, "local": element};
  }

}

export default Question;