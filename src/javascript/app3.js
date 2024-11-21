import Ajax from "./ajax.js";


const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
console.log(token);

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
        const response = await Ajax.request({method: "POST", url: "auth/reset-password", body: requestBody}); 
       
        
        if (!(response instanceof Error)) {
            // Exibir mensagem de sucesso e redirecionar ou limpar o formulário
            alert('Senha redefinida com sucesso!');
            // Redirecionar para a página de login ou outra página
            window.location.href = '../../index.html';
        } else {
            // Tratar erros
            console.error(response);
            alert('Erro de conexão. Tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro de rede', error);
        alert('Erro de rede. Tente novamente mais tarde.');
    }
});
