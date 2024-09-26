async function get(url, auth)
{
  return fetch(url, 
    {
        method: "get",
        headers: {"Authorization": auth}
    }).then(resposta =>
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
      })
      .catch(erro => 
      {
        if (!/erro:/.test(erro.message)) console.error("ERRO NO FECTH:\n" + erro);
        return erro;
      });
}

async function post(url, auth, corpo)
{
    return fetch(url, 
    {
        method: "POST", 
        headers: {"Content-Type": "application/json", "Authorization": auth}, 
        body: JSON.stringify(corpo)
    }).then(resposta =>
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
      })
      .catch(erro => 
      {
        if (!/erro:/.test(erro.message)) console.error("ERRO NO FECTH:\n" + erro);
        return erro;
      });
}

export {post, get};