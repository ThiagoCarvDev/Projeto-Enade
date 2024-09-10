
// Captura o token da query string
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token'); 



document.getElementById('reset-password-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const password = document.getElementById('password').value;
    
    // corpo da requisição com o token e a nova senha
    const requestBody = {
        token: token,
        newPassword: password
    };
    
    try {
        const response = await fetch('URL_DO_BACKEND', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        if (response.ok) {
            // Redirecione ou exiba mensagem de sucesso
            console.log('Senha redefinida com sucesso!');
        } else {
            // Tratar erros
            console.error('Erro ao redefinir senha');
        }
    } catch (error) {
        console.error('Erro de rede', error);
    }
});
