document.addEventListener('DOMContentLoaded', () => {

    // 1. Menú Hamburguesa para Móviles
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Smooth Scroll (Desplazamiento suave) para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Cerrar menú móvil si está abierto al hacer clic
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});