export type Language = "pt" | "en" | "fr";

export const translations: Record<Language, Record<string, string>> = {
  pt: {
    /* nav */
    "nav-portfolio": "PORTFÓLIO",
    "menu-home": "Início",
    "menu-about": "Sobre",
    "menu-projects": "Projetos",
    "menu-contact": "Contato",

    /* hero */
    "hero-available": "Disponível para Projetos",
    "profession": "Engenheiro de Complexidade",
    "hero-desc": "Projeto e implemento sistemas de automação inteligentes que transformam complexidade em controle preciso. Do sensor ao algoritmo.",
    "hero-cta-projects": "Ver projetos",
    "hero-cta-contact": "Entrar em contato",

    /* stats */
    "stat-study": "Anos de estudo",
    "stat-countries": "Países estudados",
    "stat-systems": "Sistemas a automatizar",
    "stat-open": "Para projetos",

    /* about */
    "about-label": "Sobre mim",
    "about-title": "Fernando Machado Neto",
    "about-text": "Tenho 20 anos e uma trajetória marcada por experiências internacionais: estudei no Colégio Santa Maria, fiz intercâmbio no Canadá onde finalizei o ensino médio, e participei de um acampamento de verão na Inglaterra. Essa bagagem multicultural alimenta minha visão sistêmica — especializo-me em transformar complexidade em soluções de automação elegantes e eficientes.",

    /* projects */
    "projects-label": "Portfólio",
    "projects-heading": "Projetos em destaque",
    "project-drone-title": "Projeto Drone",
    "project-drone-text": "Sistema de controle autônomo para drone com navegação baseada em sensores e tomada de decisão em tempo real.",
    "project-boat-title": "Projeto Barco",
    "project-boat-text": "Embarcação com sistema de navegação automatizado, monitoramento de condições e controle remoto via IoT.",
    "project-soon-title": "Em breve...",
    "project-soon-text": "Novo projeto em desenvolvimento. Fique de olho!",

    /* contact */
    "contact-label": "Vamos entrar em contato?",
    "contact-title": "Tem um projeto para <span>automatizar?</span>",
    "contact-sub": "Vamos transformar seu sistema em algo que funciona sozinho.",
    "contact-cta": "Falar no Instagram ou Linkedin. →",

    /* footer */
    "footer-tagline": "Engenharia de Automação · Sistemas Complexos",
    "footer-nav-title": "Navegação",
    "footer-skills-title": "Especialidades",
    "footer-skills-list": "Automação Industrial | Controle PID | IoT & Sensores | Sistemas Embarcados | Redes Industriais",
    "footer-cta-title": "Vamos trabalhar juntos",
    "footer-cta-text": "Aberto para projetos em automação, controle e sistemas inteligentes.",
    "footer-cta-btn": "Entrar em contato →",
    "footer-role": "Engenheiro de Complexidade",

  },

  en: {
    /* nav */
    "nav-portfolio": "PORTFOLIO",
    "menu-home": "Home",
    "menu-about": "About",
    "menu-projects": "Projects",
    "menu-contact": "Contact",

    /* hero */
    "hero-available": "Available for projects",
    "profession": "Complexity Engineer",
    "hero-desc": "I design and implement intelligent automation systems that transform complexity into precise control. From sensor to algorithm.",
    "hero-cta-projects": "View projects",
    "hero-cta-contact": "Get in touch",

    /* stats */
    "stat-study": "Years of study",
    "stat-countries": "Countries studied",
    "stat-systems": "Systems to automate",
    "stat-open": "For projects",

    /* about */
    "about-label": "About me",
    "about-title": "Fernando Machado Neto",
    "about-text": "I'm 20 years old with a path marked by international experiences: I studied at Colégio Santa Maria, took part in an exchange program in Canada where I finished high school, and attended a summer camp in England. This multicultural background fuels my systemic thinking — I specialize in turning complexity into elegant, efficient automation solutions.",

    /* projects */
    "projects-label": "Portfolio",
    "projects-heading": "Featured projects",
    "project-drone-title": "Drone Project",
    "project-drone-text": "Autonomous control system for a drone with sensor-based navigation and real-time decision making.",
    "project-boat-title": "Boat Project",
    "project-boat-text": "Vessel with automated navigation system, condition monitoring and remote control via IoT.",
    "project-soon-title": "Coming soon...",
    "project-soon-text": "New project in development. Stay tuned!",

    /* contact */
    "contact-label": "Let´s chat!",
    "contact-title": "Have a project to <span>automate?</span>",
    "contact-sub": "Let's turn your system into something that runs itself.",
    "contact-cta": "Message on Instagram or Linkedin →",

    /* footer */
    "footer-tagline": "Automation Engineering · Complex Systems",
    "footer-nav-title": "Navigation",
    "footer-skills-title": "Specialties",
    "footer-skills-list": "Industrial Automation | PID Control | IoT & Sensors | Embedded Systems | Industrial Networks",
    "footer-cta-title": "Let's work together",
    "footer-cta-text": "Open to freelance projects in automation, control and intelligent systems.",
    "footer-cta-btn": "Get in touch →",
    "footer-role": "Complexity Engineer",
  },

  fr: {
    /* nav */
    "nav-portfolio": "PORTFOLIO",
    "menu-home": "Accueil",
    "menu-about": "À propos",
    "menu-projects": "Projets",
    "menu-contact": "Contact",

    /* hero */
    "hero-available": "Disponible en Projets",
    "profession": "Ingénieur de Complexité",
    "hero-desc": "Je conçois et implémente des systèmes d'automatisation intelligents qui transforment la complexité en contrôle précis. Du capteur à l'algorithme.",
    "hero-cta-projects": "Voir les projets",
    "hero-cta-contact": "Me contacter",

    /* stats */
    "stat-study": "Années d'études",
    "stat-countries": "Pays étudiés",
    "stat-systems": "Systèmes à automatiser",
    "stat-open": "Pour des projets",

    /* about */
    "about-label": "À propos",
    "about-title": "Fernando Machado Neto",
    "about-text": "J'ai 20 ans et un parcours marqué par des expériences internationales : j'ai étudié au Colégio Santa Maria, participé à un programme d'échange au Canada où j'ai terminé le lycée, et assisté à un camp d'été en Angleterre. Ce bagage multiculturel nourrit ma vision systémique — je me spécialise dans la transformation de la complexité en solutions d'automatisation élégantes et efficaces.",

    /* projects */
    "projects-label": "Portfolio",
    "projects-heading": "Projets en vedette",
    "project-drone-title": "Projet Drone",
    "project-drone-text": "Système de contrôle autonome pour drone avec navigation par capteurs et prise de décision en temps réel.",
    "project-boat-title": "Projet Bateau",
    "project-boat-text": "Embarcation avec système de navigation automatisé, surveillance des conditions et contrôle à distance via IoT.",
    "project-soon-title": "Bientôt...",
    "project-soon-text": "Nouveau projet en cours de développement. Restez à l'écoute !",

    /* contact */
    "contact-label": "On prend contact?",
    "contact-title": "Vous avez un projet à <span>automatiser?</span>",
    "contact-sub": "Transformons votre système en quelque chose qui fonctionne tout seul.",
    "contact-cta": "Message sur Instagram →",

    /* footer */
    "footer-tagline": "Ingénierie d'Automatisation · Systèmes Complexes",
    "footer-nav-title": "Navigation",
    "footer-skills-title": "Spécialités",
    "footer-skills-list": "Automatisation Industrielle | Contrôle PID | IoT & Capteurs | Systèmes Embarqués | Réseaux Industriels",
    "footer-cta-title": "Travaillons ensemble",
    "footer-cta-text": "Ouvert aux projets freelance en automatisation, contrôle et systèmes intelligents.",
    "footer-cta-btn": "Me contacter →",
    "footer-role": "Ingénieur de Complexité",
  },
};