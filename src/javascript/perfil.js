import Ajax from "./modules/Ajax.js";
import { cursos } from "./modules/teste.js";

function tableRow()
{
    const trow = document.createElement("tr");
    let i = 0;
    while (i < 3)
    {
        trow.appendChild(document.createElement("td"));
        i++;
    }
    return trow;
}

window.onload = async () =>
{
    if (Ajax.readCookie("token") == null) window.location.href = '../../index.html';

    const token = Ajax.readCookie("token");
    const {id, courseId} = Ajax.parseJWT(token);
    
    let perfil = await Ajax.request({method: "GET", url: "users/profile?userid=" + id, auth: token});
    if (perfil instanceof Error) alert("Ocorreu um problema. Cheque sua conexão ou tente novamente mais tarde.");
    else
    {
        document.querySelector(".inf_perfil h2").textContent = perfil.username;
        document.getElementsByClassName("email")[0].textContent = perfil.email;
        document.getElementsByClassName("course")[0].textContent = cursos[courseId];
    }
    
    let ranking = await Ajax.request({method: "GET", url: "users/ranking", auth: token});
    if (ranking instanceof Error) alert("Deu errado o ranking");
    else
    {
        document.querySelector(".ranking-table tbody").replaceChildren();
        for (let trow = 0; trow < ranking.length; trow++)
        {
            let medal = "";
            switch (trow)
            {
                case 0:
                    medal = "🥇";
                    break;

                case 1: 
                    medal = "🥈";
                    break;

                case 2:
                    medal = "🥉";
                    break;

                default:
                    medal = (trow + 1) + "º";
                    break;
            }

            const tr = tableRow();
            const tdown = tr.children;
            tdown[0].textContent = medal;
            tdown[1].textContent = ranking[trow].username;
            tdown[2].textContent = ranking[trow].score;
            document.querySelector(".ranking-table tbody").appendChild(tr);
        }
    }
}