const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

document.getElementById('reset-password-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }
    
    // Corpo da requisição com o token e a nova senha
    const requestBody = {
        token: token,
        newPassword: password
    };
    
    try {
        const response = await fetch('http://localhost:8080/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        if (response.ok) {
            // Exibir mensagem de sucesso e redirecionar ou limpar o formulário
            alert('Senha redefinida com sucesso!');
            // Redirecionar para a página de login ou outra página
            window.location.href = 'index.html';
        } else {
            // Tratar erros
            alert('Erro ao redefinir senha. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro de rede', error);
        alert('Erro de rede. Tente novamente mais tarde.');
    }
});
