const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_experience: "Experience",
        nav_skills: "Skills",
        nav_contact: "Contact",
        hero_hi: "Hi, I'm",
        hero_title: "Data Engineer | Big Data & Cloud",
        hero_desc: "Specialist in large-scale data pipelines, cloud architectures, and Big Data ecosystem (Scala, Python, Spark).",
        hero_btn_exp: "View Experience",
        hero_btn_contact: "Contact Me",
        about_title: "Professional Summary",
        about_p: "Data Engineer with extensive experience in building and optimizing large-scale data pipelines. Expert in designing efficient solutions within the Big Data ecosystem and cloud platforms like AWS and Azure. Focused on transforming complex data into strategic assets that generate real business value.",
        exp_title: "Professional Path",
        exp_indra_title: "Data Engineer | Indra (BBVA)",
        exp_indra_desc: "Developed high-performance pipelines for processing massive banking information. Workflow optimization and reduction of processing times.",
        exp_indra_date: "2020 – Present",
        exp_everis_title: "Data Engineer | Everis (NTT DATA)",
        exp_everis_desc: "Implementation of end-to-end pipelines and real-time processing solutions for the banking sector.",
        exp_everis_date: "2020 (Feb – Sept)",
        exp_bluetab_title: "Data Engineer | Bluetab (IBM Company)",
        exp_bluetab_desc: "Built robust financial data flows and automation of operational processes.",
        exp_bluetab_date: "2018 – 2019",
        skills_title: "Tech Stack",
        skills_langs: "Languages",
        skills_cloud: "Cloud",
        skills_bigdata: "Big Data",
        skills_principles: "Principles",
        contact_title: "Contact",
        contact_email: "Email",
        footer_copy: "Carlos Guzmán. Data Engineer Portfolio."
    },
    es: {
        nav_home: "Inicio",
        nav_about: "Sobre Mí",
        nav_experience: "Experiencia",
        nav_skills: "Skills",
        nav_contact: "Contacto",
        hero_hi: "Hola, soy",
        hero_title: "Ingeniero de Datos | Big Data & Cloud",
        hero_desc: "Especialista en pipelines de datos a gran escala, arquitecturas cloud y ecosistema Big Data (Scala, Python, Spark).",
        hero_btn_exp: "Ver Experiencia",
        hero_btn_contact: "Contáctame",
        about_title: "Resumen Profesional",
        about_p: "Ingeniero de Datos con amplia trayectoria en la construcción y optimización de pipelines de datos a gran escala. Experto en el diseño de soluciones eficientes bajo el ecosistema Big Data y plataformas cloud como AWS y Azure. Enfocado en transformar datos complejos en activos estratégicos que generen valor real para el negocio.",
        exp_title: "Trayectoria Profesional",
        exp_indra_title: "Ingeniero de Datos | Indra (BBVA)",
        exp_indra_desc: "Desarrollo de pipelines de alto rendimiento para procesamiento de información bancaria masiva. Optimización de flujos de trabajo y reducción de tiempos de procesamiento.",
        exp_indra_date: "2020 – Actualidad",
        exp_everis_title: "Ingeniero de Datos | Everis (NTT DATA)",
        exp_everis_desc: "Implementación de pipelines end-to-end y soluciones de procesamiento en tiempo real para el sector bancario.",
        exp_everis_date: "2020 (Feb – Sept)",
        exp_bluetab_title: "Ingeniero de Datos | Bluetab (IBM Company)",
        exp_bluetab_desc: "Construcción de flujos de datos robustos para información financiera y automatización de procesos operativos.",
        exp_bluetab_date: "2018 – 2019",
        skills_title: "Stack Tecnológico",
        skills_langs: "Lenguajes",
        skills_cloud: "Cloud",
        skills_bigdata: "Big Data",
        skills_principles: "Principios",
        contact_title: "Contacto",
        contact_email: "Email",
        footer_copy: "Carlos Guzmán. Portafolio de Ingeniero de Datos."
    },
    pt: {
        nav_home: "Início",
        nav_about: "Sobre Mim",
        nav_experience: "Experiência",
        nav_skills: "Habilidades",
        nav_contact: "Contato",
        hero_hi: "Olá, eu sou",
        hero_title: "Engenheiro de Dados | Big Data & Cloud",
        hero_desc: "Especialista em pipelines de dados em larga escala, arquiteturas em nuvem e ecossistema de Big Data (Scala, Python, Spark).",
        hero_btn_exp: "Ver Experiência",
        hero_btn_contact: "Contate-me",
        about_title: "Resumo Profissional",
        about_p: "Engenheiro de Dados com ampla experiência na construção e otimização de pipelines de dados em larga escala. Especialista no projeto de soluções eficientes no ecossistema de Big Data e plataformas em nuvem como AWS e Azure. Focado em transformar dados complexos em ativos estratégicos que geram valor real para o negócio.",
        exp_title: "Trajetória Profissional",
        exp_indra_title: "Engenheiro de Dados | Indra (BBVA)",
        exp_indra_desc: "Desenvolvimento de pipelines de alto desempenho para processamento de informações bancárias massivas. Otimização de fluxos de trabalho e redução de tempos de processamento.",
        exp_indra_date: "2020 – Atualidade",
        exp_everis_title: "Engenheiro de Dados | Everis (NTT DATA)",
        exp_everis_desc: "Implementação de pipelines ponta a ponta e soluções de processamento em tempo real para o setor bancário.",
        exp_everis_date: "2020 (Fev – Set)",
        exp_bluetab_title: "Engenheiro de Dados | Bluetab (IBM Company)",
        exp_bluetab_desc: "Construção de fluxos de dados robustos para informações financeiras e automação de processos operacionais.",
        exp_bluetab_date: "2018 – 2019",
        skills_title: "Stack Tecnológico",
        skills_langs: "Linguagens",
        skills_cloud: "Nuvem",
        skills_bigdata: "Big Data",
        skills_principles: "Princípios",
        contact_title: "Contato",
        contact_email: "E-mail",
        footer_copy: "Carlos Guzmán. Portfólio de Engenheiro de Dados."
    }
};

const flags = {
    en: "https://flagcdn.com/us.svg",
    es: "https://flagcdn.com/es.svg",
    pt: "https://flagcdn.com/br.svg"
};

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CUSTOM LANGUAGE DROPDOWN ---
    const langDropdown = document.getElementById('lang-dropdown');
    const selected = langDropdown.querySelector('.select-selected');
    const items = langDropdown.querySelector('.select-items');
    const currentFlag = document.getElementById('current-flag');
    const currentLangText = selected.querySelector('span');

    // Load saved lang
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    updateDropdownUI(savedLang);
    setLanguage(savedLang);

    selected.addEventListener('click', (e) => {
        e.stopPropagation();
        items.classList.toggle('select-hide');
    });

    items.querySelectorAll('div').forEach(item => {
        item.addEventListener('click', () => {
            const lang = item.getAttribute('data-value');
            updateDropdownUI(lang);
            setLanguage(lang);
            localStorage.setItem('preferredLang', lang);
            items.classList.add('select-hide');
        });
    });

    document.addEventListener('click', () => {
        items.classList.add('select-hide');
    });

    function updateDropdownUI(lang) {
        currentFlag.src = flags[lang];
        currentLangText.textContent = lang.toUpperCase();
    }

    function setLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        document.documentElement.lang = lang;
    }

    // --- 2. Menú Hamburguesa para Móviles ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- 3. Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
