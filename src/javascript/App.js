import Ajax from "./ajax.js";

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

document.addEventListener('DOMContentLoaded', () => {
  const signInForm = document.querySelector('.sign-in-form');
  const signUpForm = document.querySelector('.sign-up-form');

  // Validação para o formulário de login
  signInForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = signInForm.querySelector('input[type="text"]').value;
    const password = signInForm.querySelector('input[type="password"]').value;

    if (!username || !password) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    let resposta = await Ajax.request(
    {
      method: "POST", 
      url: "auth/login", 
      body: {username: username, password: password}
    });

    if (resposta instanceof Error) alert('Falha no login. Verifique suas credenciais.');
    else
    {
      Ajax.createCookie("token", resposta.token, 1);
      window.location.href = "./src/pages/telaPrincipal.html";
    }
    /*
    fetch('http://3.82.216.128:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro no login');
      }
      return response.json();
    })
    .then(loginData => {
      console.log('Login Response:', loginData);
      alert('Login bem-sucedido!');
      // Redirecionar ou realizar outras ações após o login bem-sucedido
      window.location.href = '/src/pages/telaPrincipal.html';
    })
    .catch(error => {
      console.error('Erro no login:', error);
      alert('Falha no login. Verifique suas credenciais.');
    });
    */
  });

  // Validação para o formulário de cadastro
  signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;
    const courseId = signUpForm.querySelector('select[name="courseId"]').value;

    let isValid = true;

    if (!username || !email || !password || !courseId) {
      isValid = false;
      alert('Por favor, preencha todos os campos obrigatórios.');
    }

    if (username.length > 20) {
      isValid = false;
      alert('O nome de usuário deve ter no máximo 20 caracteres.');
    }

    if (email.length > 50) {
      isValid = false;
      alert('O e-mail deve ter no máximo 50 caracteres.');
    }

    if (password.length > 120) {
      isValid = false;
      alert('A senha deve ter no máximo 120 caracteres.');
    }

    if (!isValid) {
      return;
    }

    let resposta = await Ajax.request(
    {
      method: "POST",
      url: "auth/register",
      body: 
      {
        username: username,
        email: email,
        password: password,
        role: ["user"],
        courseId: courseId
      }
    });

    if (resposta instanceof Error) alert('Falha no cadastro. Verifique os dados e tente novamente.');
    else
    {
      let login = await Ajax.request({
        method: "POST",
        url: "auth/login",
        body: {username: username, password: password}
      });

      if (login instanceof Error) alert('Cadastro feito, porém falha no login.');
      else
      {
        Ajax.createCookie("token", login.token, 1);
        window.location.href = "./src/pages/telaPrincipal.html";
      }
    }


    /*
    fetch('http://3.82.216.128:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        role: ["user"],
        courseId: courseId
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro no cadastro');
      }
      return response.json();
    })
    .then(registerData => {
      console.log('Register Response:', registerData);
      alert('Cadastro bem-sucedido!');
      // Opcionalmente, você pode automaticamente logar o usuário após o cadastro
      // ou redirecioná-lo para a página de login.
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error('Erro no cadastro:', error);
      alert('Falha no cadastro. Verifique os dados e tente novamente.');
    });
    */
  });
});
