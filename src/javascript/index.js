import Ajax from "./modules/Ajax.js";

window.addEventListener('popstate', function(event) {
  console.log('URL:', document.location.href, 'State:', event.state);
});

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
      Ajax.createCookie("token", resposta.token, 1 / 48);
      window.location.href = "./src/pages/telaPrincipal.html";
    }
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
        Ajax.createCookie("token", login.token, 1 / 48);
        window.location.href = "./src/pages/telaPrincipal.html";
      }
    }
  });
});
