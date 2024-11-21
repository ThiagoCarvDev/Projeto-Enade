import Ajax from "./modules/Ajax.js";


window.onload = async () =>
{
    if (Ajax.readCookie("token") == null) window.location.href = '../../index.html';

    let token = Ajax.readCookie("token");
    

    let perfil = await Ajax.request({method: "GET", url: "users/profile?userid=" + 
    Ajax.parseJWT(token).id, auth: token});

    if (perfil instanceof Error) alert("Ocorreu um problema. Cheque sua conexão ou tente novamente mais tarde.");
    else
    {
        console.log("Reposta do perfil: ");
        console.warn(perfil);
        console.log("Comparação com o token: ");
        console.error(Ajax.parseJWT(token));
    }

    let ranking = await Ajax.request({method: "GET", url: "users/ranking", auth: token});
    if (ranking instanceof Error) alert("Deu errado o ranking");
    else
    {
        console.log("Resposta do ranking: ");
        console.warn(ranking);
    }
}