import { get } from "./ajax.js";

window.onload = async () =>
{
    let divs = Array.from(document.querySelector(".form").children);
    //divs = Array.prototype.slice.call(divs);
    divs.pop();
    divs.shift();
    console.log(divs);
    /*
    let resposta = await get("https://mspfa.com");
    if (resposta.constructor == Error || resposta.constructor == TypeError)
    {
      console.log(resposta);
      alert("Ocorreu um erro. Verifique sua conexão ou tente novamente mais tarde.");
    }
    else
    {
      alert(resp);  
    }
    
    */
}