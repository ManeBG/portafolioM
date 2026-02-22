document.addEventListener("DOMContentLoaded", function () {
  // ── AOS animations ─────────────────────────────────────────
  AOS.init({ once: true, offset: 60 });

  // ── Particles (blue accent palette) ────────────────────────
  particlesJS("particles-js", {
    particles: {
      number: { value: 55, density: { enable: true, value_area: 900 } },
      color:  { value: "#2563EB" },
      shape:  { type: "circle" },
      opacity: { value: 0.35, random: true, anim: { enable: false } },
      size:    { value: 2.5, random: true },
      line_linked: {
        enable:   true,
        distance: 140,
        color:    "#2563EB",
        opacity:  0.18,
        width:    1
      },
      move: { enable: true, speed: 2.5, random: true, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick:  { enable: true, mode: "push" },
        resize:   true
      },
      modes: {
        grab:  { distance: 160, line_linked: { opacity: 0.4 } },
        push:  { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
});
