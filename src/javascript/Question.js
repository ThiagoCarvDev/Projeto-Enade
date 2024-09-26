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



  /**@type {Array<{instancia: Question; local: HTMLDivElement;}>}*/
  static #instances = [];
  
  /**@param {{instancia: Question; local: HTMLDivElement;}} instance*/
  static set instances(instance)
  {
    this.#instances.push(instance);
  }

  /**@returns {Array<{instancia: Question; local: HTMLDivElement;}>}*/
  static get instances()
  {
    return this.#instances;
  }



  /**@param {Question} quest @param {HTMLDivElement} element*/
  constructor(quest, element)
  {
    for (let q in quest)
    {
      this[q] = quest[q];
    }
    //let array = [this, element];
    //console.log({"instancia": this, "local": element})
    Question.instances = {"instancia": this, "local": element};
  }

}

export default Question;