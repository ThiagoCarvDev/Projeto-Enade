// Selecionando os elementos corretos
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const emailInput = forgotPasswordForm.querySelector('input[type="email"]');
const emailError = document.getElementById('emailError');

// Adicionando a funcionalidade de "Esqueci a Senha"
document.addEventListener('DOMContentLoaded', () => {
    forgotPasswordForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Limpar mensagens de erro
        emailError.textContent = '';

        if (!emailInput.value) {
            emailError.textContent = 'Por favor, insira seu email.';
            return;
        }

        // Enviando a requisição
        fetch('http://localhost:8080/api/auth/forgot-password', {
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
            alert('Se o email estiver registrado, você receberá instruções para redefinir sua senha.');
            // Opcional: Limpar o formulário após o envio
            forgotPasswordForm.reset();
        })
        .catch(error => {
            console.error('Erro ao solicitar recuperação de senha:', error);
            alert('Falha ao solicitar recuperação de senha. Tente novamente.');
        });
    });
});
