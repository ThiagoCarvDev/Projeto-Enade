import Ajax from "./ajax.js";

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
            let httpStatus = resposta.message.match(/d+/g)[0];
            switch (httpStatus)
            {
                case "404":
                    alert("Não há nenhum usuário com esse email cadastrado.");
                    break;

                case null:
                    alert("Erro de conexão. Verifique sua rede.");
                    break;

                default:
                    alert("Ouve instabilidades no sistema. Tente novamente mais tarde.");
                    break;
            }
        }
        else
        {
            alert('Email enviado com sucesso! Verifique seu email.');
            console.log(resposta);
            // Opcional: Limpar o formulário após o envio
            forgotPasswordForm.reset();
            window.location.href = 'index.html';
        }
        
        /*fetch('http://3.82.216.128:8080/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: emailInput.value, 
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao solicitar a recuperação de senha.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Forgot Password Response:', data);
            alert('Email enviado com sucesso! Verifique seu email.');
            // Opcional: Limpar o formulário após o envio
            forgotPasswordForm.reset();
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Erro ao solicitar recuperação de senha:', error);
            alert('Falha ao solicitar recuperação de senha. Tente novamente.');
        });*/
    });
});
