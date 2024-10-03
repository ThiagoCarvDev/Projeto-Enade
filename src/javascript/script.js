/**/
$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop+ section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        })

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.sobre', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    })




    $(document).ready(function () {
        // Função para extrair o token (JWT) dos cookies ou localStorage
        function getToken() {
            return localStorage.getItem('token'); // Ou use outra forma se o token estiver nos cookies
        }
    
        // Função para extrair o userid e courseid do token JWT (se necessário)
        function parseJWT(token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
    
            return JSON.parse(jsonPayload);
        }
    
        // Ao clicar no botão "Técnicas"
        $('.btn-entrar').on('click', function (event) {
            event.preventDefault();
            
            const isTechnical = $(this).closest('.categoria').find('h3').text() === 'Técnicas';
            const token = getToken(); // Extrai o token
    
            if (token) {
                const { userid, courseid } = parseJWT(token); // Extrai userid e courseid do token
    
                const url = isTechnical
                    ? `http://localhost:8080/api/quiz/technical?userid=${userid}&courseid=${courseid}`
                    : `http://localhost:8080/api/quiz/general?userid=${userid}`;
    
                // Faz a requisição ao back-end
                $.ajax({
                    url: url,
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho
                    },
                    success: function (response) {
                        window.location.href='/src/perguntas.html';
                        // Redireciona ou exibe as perguntas do quiz baseado na resposta do back-end
                        console.log('Quiz carregado:', response);
                       
                        // Aqui você pode redirecionar para uma página de perguntas ou renderizar as perguntas dinamicamente
                    },
                    error: function (err) {
                        console.error('Erro ao carregar o quiz:', err);
                        // Lidar com o erro, como exibir uma mensagem para o usuário
                    }
                });
            } else {
                console.error('Token não encontrado');
                // Redirecionar o usuário para a página de login ou mostrar uma mensagem de erro
            }
        });
    });
    
});