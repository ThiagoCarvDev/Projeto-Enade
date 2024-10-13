import Ajax from "./ajax.js";


//Obs.: esse script ainda não foi importado, e também não testado
window.onload = async () =>
{
    if (Ajax.readCookie("token") == null) window.location.href = '../../index.html';

    let perfil = await Ajax.request({method: "GET", url: "users/profile?userid=", auth: Ajax.readCookie("token")});
    if (perfil instanceof Error) alert("Ocorreu um problema. Cheque sua conexão ou tente novamente mais tarde.");
    else
    {
        //Insere os dados no HTML
    }
}