document.addEventListener("DOMContentLoaded", function () {
    AOS.init();

    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "anim": { "enable": false } },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 6 }
        },
        "interactivity": {
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": true, "mode": "push" }
            }
        },
        "retina_detect": true
    });

    const darkModeBtn = document.getElementById("dark-mode");
    const langToggleBtn = document.getElementById("lang-toggle");
    const title = document.getElementById("inicio-title");
    const introText = document.getElementById("intro-text");
    const body = document.body;

    // Modo oscuro
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Cambio de idioma y color del tema
    langToggleBtn.addEventListener("click", () => {
        if (langToggleBtn.textContent === "English") {
            langToggleBtn.textContent = "Español";
            title.textContent = "Home";
            introText.textContent = "Hello! I'm Manuel, a Computer Systems Engineering student...";
            body.classList.remove("es");
            body.classList.add("en");
        } else {
            langToggleBtn.textContent = "English";
            title.textContent = "Inicio";
            introText.textContent = "¡Hola! Soy Manuel, estudiante de Ingeniería en Sistemas Computacionales...";
            body.classList.remove("en");
            body.classList.add("es");
        }
    });
});
