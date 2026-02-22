/* ============================================================
   scripts.js – Portfolio ManeBG
   Sections:
     1. i18n  (runs first so text is correct before paint)
     2. Particles  (desktop full / mobile lite / reduced-motion off)
     3. AOS
   ============================================================ */

// ── 1. i18n ────────────────────────────────────────────────────
// Nested dictionary – supports both "flat.key" flat lookups
// AND true nested objects via split('.') + reduce for future-proofing.

const i18n = {
  es: {
    nav: {
      inicio: "Inicio",
      proyectos: "Proyectos",
      habilidades: "Habilidades",
      contacto: "Contacto"
    },
    hero: {
      badge: "Disponible para proyectos",
      title: { line1: "Desarrollo web y sistemas", line2: "a la medida" },
      subtitle: "Construyo aplicaciones web, APIs y sistemas de gestión que ayudan a negocios locales y remotos a digitalizar procesos y crecer con tecnología confiable.",
      cta: { projects: "Ver proyectos", whatsapp: "Contactar por WhatsApp", cv: "Descargar CV" }
    },
    projects: {
      title: "Proyectos",
      subtitle: "Algunos trabajos que demuestran lo que puedo construir para ti.",
      view: "Ver proyecto",
      p1: { title: "Tienda Online – Mango Manía", desc: "Plataforma de ventas en línea con catálogo dinámico, carrito y gestión de pedidos." },
      p2: { title: "Nube Delivery", desc: "Sistema de pedidos en línea con integración a Telegram. Gestión de repartidores y seguimiento en tiempo real." },
      p3: { title: "Lavado de Motocicletas", desc: "Web informativa con Google Maps, galería de servicios y botón directo a WhatsApp para agendar citas." }
    },
    skills: {
      title: "Habilidades",
      subtitle: "Tecnologías y herramientas que uso en mis proyectos.",
      python: "Backend, automatización y procesamiento de datos.",
      flask: "Creación de APIs REST y aplicaciones web dinámicas.",
      js: "DOM, eventos, lógica de frontend y consumo de APIs.",
      mysql: "Diseño y gestión de bases de datos relacionales.",
      bootstrap: "Diseño web responsivo y estilización rápida de UI.",
      git: "Control de versiones y colaboración en equipo.",
      linux: "Administración de servidores y línea de comandos.",
      docker: "Contenedores y despliegue de aplicaciones.",
      apis: "Diseño, documentación y consumo de APIs.",
      vue: "SPAs reactivas y componentes interactivos."
    },
    contact: {
      title: "Contacto",
      subtitle: "¿Tienes un proyecto en mente? Hablemos.",
      body: "Respondo en menos de 24 h · Presupuesto sin compromiso\nTrabajo con clientes locales y a distancia.",
      cta: { whatsapp: "WhatsApp directo", cv: "Descargar CV", github: "GitHub" }
    },
    footer: "© 2025 Manuel BG · Todos los derechos reservados."
  },

  en: {
    nav: {
      inicio: "Home",
      proyectos: "Projects",
      habilidades: "Skills",
      contacto: "Contact"
    },
    hero: {
      badge: "Available for projects",
      title: { line1: "Custom web development", line2: "& software systems" },
      subtitle: "I build web apps, REST APIs and management systems that help local and remote businesses streamline operations and grow with reliable technology.",
      cta: { projects: "View projects", whatsapp: "Contact via WhatsApp", cv: "Download CV" }
    },
    projects: {
      title: "Projects",
      subtitle: "Selected work that shows what I can build for you.",
      view: "View project",
      p1: { title: "Online Store – Mango Manía", desc: "E-commerce with dynamic catalogue, shopping cart and integrated payment gateway." },
      p2: { title: "Nube Delivery", desc: "Online ordering system with Telegram integration for automatic notifications and real-time order tracking." },
      p3: { title: "Motorcycle Wash", desc: "Informational website with Google Maps, service gallery and a direct WhatsApp button to book appointments." }
    },
    skills: {
      title: "Skills",
      subtitle: "Technologies and tools I use in my projects.",
      python: "Backend development, automation and data processing.",
      flask: "Building REST APIs and dynamic web applications.",
      js: "DOM manipulation, events, frontend logic and API consumption.",
      mysql: "Relational database design and management.",
      bootstrap: "Responsive web design and rapid UI styling.",
      git: "Version control and team collaboration.",
      linux: "Server administration and command-line usage.",
      docker: "Containerisation and application deployment.",
      apis: "API design, documentation and integration.",
      vue: "Reactive SPAs and interactive components."
    },
    contact: {
      title: "Contact",
      subtitle: "Have a project in mind? Let's talk.",
      body: "I reply within 24 h · No-commitment quote\nI work with local and remote clients.",
      cta: { whatsapp: "WhatsApp direct", cv: "Download CV", github: "GitHub" }
    },
    footer: "© 2025 Manuel BG · All rights reserved."
  }
};

/**
 * Resolve a dot-notation key (e.g. "projects.p1.title") from a nested object.
 * Returns undefined if the path doesn't exist.
 */
function getNestedValue(obj, dotKey) {
  return dotKey.split(".").reduce(function (acc, part) {
    return acc != null && typeof acc === "object" ? acc[part] : undefined;
  }, obj);
}

/**
 * Apply language to every [data-i18n] element.
 * Supports dot-notation keys mapping to nested dict values.
 * Special case: "contact.body" – preserves \n as <br>.
 */
function applyLang(lang) {
  var dict = i18n[lang] || i18n.es;

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    var value = getNestedValue(dict, key);
    if (value === undefined || typeof value !== "string") return;

    if (key === "contact.body") {
      el.innerHTML = value.replace(/\n/g, "<br>");
    } else {
      el.textContent = value;
    }
  });

  // Update <html lang>
  document.documentElement.lang = lang;

  // Toggle button shows the OTHER language you can switch TO
  var btn = document.getElementById("lang-toggle");
  if (btn) btn.textContent = lang === "es" ? "EN" : "ES";

  // Persist
  try { localStorage.setItem("mbg-lang", lang); } catch (e) { }
}

// Run i18n immediately (DOM is ready when this deferred script executes)
(function () {
  var saved = "es";
  try { saved = localStorage.getItem("mbg-lang") || "es"; } catch (e) { }
  applyLang(saved);

  document.getElementById("lang-toggle").addEventListener("click", function () {
    var current = "es";
    try { current = localStorage.getItem("mbg-lang") || "es"; } catch (e) { }
    applyLang(current === "es" ? "en" : "es");
  });
})();


// ── 2. Particles ───────────────────────────────────────────────
// Skipped entirely if user prefers reduced motion.
// Particle count halved on mobile (≤ 767px).

document.addEventListener("DOMContentLoaded", function () {

  // AOS
  AOS.init({ once: true, offset: 60 });

  // prefers-reduced-motion check
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    // Hide the canvas entirely – no animation at all
    var el = document.getElementById("particles-js");
    if (el) el.style.display = "none";
    return;
  }

  // Adaptive particle count
  var isMobile = window.matchMedia("(max-width: 767px)").matches;
  var particleCount = isMobile ? 22 : 55;
  var lineOpacity = isMobile ? 0.10 : 0.18;
  var speed = isMobile ? 1.5 : 2.5;

  particlesJS("particles-js", {
    particles: {
      number: { value: particleCount, density: { enable: true, value_area: 900 } },
      color: { value: "#2563EB" },
      shape: { type: "circle" },
      opacity: { value: 0.35, random: true, anim: { enable: false } },
      size: { value: 2.5, random: true },
      line_linked: {
        enable: !isMobile,       // no lines on mobile → fewer draw calls
        distance: 140,
        color: "#2563EB",
        opacity: lineOpacity,
        width: 1
      },
      move: { enable: true, speed: speed, random: true, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: !isMobile, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        grab: { distance: 160, line_linked: { opacity: 0.35 } },
        push: { particles_nb: isMobile ? 1 : 3 }
      }
    },
    retina_detect: true
  });
});
