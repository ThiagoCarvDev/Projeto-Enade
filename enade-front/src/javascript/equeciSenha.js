import Ajax from "./modules/Ajax.js";

// Selecionando os elementos corretos
document.addEventListener('DOMContentLoaded', () => {
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const emailInput = forgotPasswordForm.querySelector('input[type="email"]');
const emailError = document.getElementById('emailError');

// Adicionando a funcionalidade de "Esqueci a Senha"

    forgotPasswordForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log("cliocu");

        // Limpar mensagens de erro
        emailError.textContent = ''; 

        if (!emailInput.value) {
            emailError.textContent = 'Por favor, insira seu email.';
            return;
        }

        // Enviando a requisição
        let resposta = await Ajax.request({method: "POST", url: "auth/forgot-password", body: {email: emailInput.value}});
        if (resposta instanceof Error) 
        {   
            console.error(resposta);
            let httpStatus = error.message.match(/\d+/)?.[0];
            switch (httpStatus)
            {
                case "404":
                    alert("Não há nenhum usuário com esse email cadastrado.");
                    break;

                case null:
                    alert("Erro de conexão. Verifique sua rede.");
                    break;

                default:
                    alert("Houve instabilidades no sistema. Tente novamente mais tarde.");
                    break;
            }
        }
        else
        {
            alert('Email enviado com sucesso! Verifique seu email.');
            console.log(resposta);
            // Opcional: Limpar o formulário após o envio
            forgotPasswordForm.reset();
            window.location.href = '../../index.html';
        }
    });
});
