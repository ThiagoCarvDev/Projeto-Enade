class Ajax
{
  /**@type {string} URL mãe do projeto*/
  static #URLbase = "http://3.86.207.70:8080/api/";

  /** */
  static async request({method, url, auth, body})
  {
    //Preparando a requisição
    let reqInit = {"method": method};
    body == undefined ? reqInit.headers = {} : reqInit.headers = {"Content-Type": "application/json", "body": JSON.stringify(body)};
    auth == undefined ? "nada acontece" : reqInit.headers.Authorization = auth;
    JSON.stringify(reqInit.headers) == "{}" ? reqInit = {"method": method} : "nada acontece";
    //console.warn(reqInit);

    let reqInit2 = 
    {
      method: method,
      headers:
      {
        "Content-Type": "application/json",
        body: JSON.stringify(body)
      }
    }

    //Requisição
    return fetch(this.#URLbase + url, reqInit2).then(resposta =>
    {
      if (resposta.ok)
      {
        return resposta.json();
      }
      else
      {
        console.log("ERRO QUE NÃO É DE REDE: " + resposta.status);
        switch (resposta.status)
        {
          case 500:
            throw new Error("erro: Problemas no servidor " + resposta.status);
            break;

          case 405:
            throw new Error("erro: Método HTTP não permitido " + resposta.status);
            break;

          case 404:
            throw new Error("erro: Recurso não encontrado " + resposta.status);
            break;

          case 403:
            throw new Error("erro: Acesso negado " + resposta.status);
            break; 

          case 401:
            throw new Error("erro: Credenciais inválidas " + resposta.status);
            break;

          case 400:
            throw new Error("erro: Requisição inválida " + resposta.status);
            break;

          default:
            throw new Error("erro: Erro desconhecido " + resposta.status);
            break;  
        }
      }    
    }).catch(erro => 
    {
      if (!/erro:/.test(erro.message)) {console.error("ERRO NO FECTH:\n" + erro + 
        "\n\n Dados da requisição:" + 
        "\n\n url: " + url +
        "\n Corpo: " + JSON.stringify(reqInit));}
      return erro;
    });
  }
}

export default Ajax;