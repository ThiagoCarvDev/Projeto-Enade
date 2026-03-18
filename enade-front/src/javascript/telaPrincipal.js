import Ajax from "./modules/Ajax.js";

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

    
    document.querySelectorAll(".categoria button.entra").forEach(botao => botao.addEventListener("click", async event =>
    {
        const {id, courseId} = Ajax.parseJWT(Ajax.readCookie("token"));
        let link = event.currentTarget.parentElement.querySelector(".categoria-title").innerText == 
        "Gerais" ? `quiz/general?userid=${id}` : `quiz/technical?userid=${id}&courseid=${courseId}`;
        history.pushState(link, "", "./perguntas.html");
        window.location.reload();
    }));

    document.getElementById("logout-btn").addEventListener("click", () =>
    {
        if (window.confirm("Certeza que deseja sair da sua conta?"))
        {
            try 
            {
                Ajax.updateCookie("token", null, -1);
                window.location.href = "../../index.html";
            } 
            catch (error) 
            {
                window.alert("Erro ao deslogar.");
                console.error(error);
            }
        }
    });

    document.getElementById("profile-btn").addEventListener("click", 
    () => window.location.href = "../pages/perfil.html");

    if (Ajax.readCookie("token") == null) window.location.href='../../index.html';
});