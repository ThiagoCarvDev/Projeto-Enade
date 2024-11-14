/**Classe estática que manipula cookies, tokens e faz requisições a APIs.*/
class Ajax
{
  /**@readonly @type {string} URL mãe do projeto*/
  static #URLbase = "http://54.165.34.4:8080/api/";


  /**Função que desemcripta o token e retorna seu valor.
   * @param {string} token
   * @returns {object}
  */
  static parseJWT(token) 
  {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }



  /**Método que busca um cookie pelo seu nome.
   * @param {string} name 
   * @returns {any | null}
   */
  static readCookie(name) 
  {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) 
    {
      const cookie = cookies[i].split('=');
      if (cookie[0] === name) return JSON.parse(cookie[1]);
    }

    return null;
  }



  /**Método para atualizar cookie. Ele verifica se o cookie existe primeiro. Se não, não executa nada.
   * @param {string} name Nome do cookie pré-existente.
   * @param {any} value Novo valor a ser atribuído.
   * @param {number} ttl Novo tempo de vida. Ele será sobrescrito ao tempo original. Você pode colocar um valor negativo para deletar o cookie.
  */
  static updateCookie(name, value, ttl)
  {
    if (Ajax.readCookie(name) == null) console.info("O cookie não existe.");
    else Ajax.createCookie(name, value, ttl);
  }



  /**Método para criar um cookie globalmente no domínio.
   * @param {string} name Nome do cookie.
   * @param {any} value Valor dele. Pode ser objeto, array, string, e afins.
   * @param {number} ttl Tempo de vida do cookie em dias.
  */
  static createCookie(name, value, ttl = 0)
  {
    let lifetime = new Date();
    lifetime.setTime(lifetime.getTime() + ttl * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${JSON.stringify(value)}; ${ttl == 0 ? "" : "expires=" + lifetime.toUTCString(lifetime)}; path=/;`;
  }



  /**Método para realizar requisições. Retorna a resposta da requisição em objeto caso você espere usando await. Se não, retorna uma
   * promise. Pode retornar um erro caso a requisição falhe.
   * @param {object} req 
   * @param {string} req.method Método HTTP da requisição.
   * @param {string} req.url Caminho da requisição. Ele já é adicionado em cima da URL base do projeto, definida na classe ajax.
   * @param {string} req.auth Token de autorização, se necessário.
   * @param {object} req.body Corpo da requisição, caso haja.
   * 
   * @returns {Promise<object | Error>}
   */
  static async request({method, url, auth, body})
  {
    //Preparando a requisição
    let reqInit = {"method": method};
    body == undefined ? "nada acontece" : reqInit = {...reqInit, "headers": {"Content-Type": "application/json"}, "body": JSON.stringify(body)};
    auth == undefined ? "nada acontece" : reqInit.headers = {...reqInit.headers, "Authorization": "Bearer " + auth};
    //reqInit.headers = { ...reqInit.headers, "Content-Type": "application/json"}
    //console.warn(reqInit);


    //Requisição
    return fetch(this.#URLbase + url, reqInit).then(resposta =>
    {
      if (resposta.ok)
      {
        return resposta.json();
      }
      else
      {
        //Avisa quando der erro com requisição bem sucedida. É necessário + 1 log para ser mostrado
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
      //Avisa quando dá erro de não conseguir fazer a requisição.
      if (!/erro:/.test(erro.message)) {console.error("ERRO NO FECTH:\n" + erro + 
        "\n\n Dados da requisição:" + 
        "\n\n url: " + url +
        "\n ReqInit: " + JSON.stringify(reqInit));}
      return erro;
    });
  }
}

export default Ajax;