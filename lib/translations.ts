export const translations = {
  es: {
    hero: {
      name: "Rodrigo Pozo Sánchez",
      tagline: "Impulsando tu negocio con", // ✅ nueva frase
      animatedWords: ["Soluciones", "Calidad", "Innovación"],
      cta: "Ver Trabajos",
      aboutTitle: "Sobre mi",
      aboutText: "Hola, soy Rodrigo.\nTengo 22 años, soy de Madrid y me apasiona la programación.",
      aboutCta: "Saber más",
    },
    testimonials: {
      title: "Recomendaciones",
      subtitle: "Lo que dicen sobre mi trabajo",
    },
    portfolio: {
      title: "Proyectos Destacados",
      seeAll: "Ver Todos",
      allTitle: "Todos los Proyectos",
      projects: [
        {
          title: "E-commerce Platform",
          description: "Plataforma completa de comercio electrónico con pasarela de pagos",
        },
        {
          title: "Dashboard Analytics",
          description: "Panel de análisis en tiempo real con visualizaciones interactivas",
        },
        {
          title: "App Móvil Social",
          description: "Aplicación social con chat en tiempo real y notificaciones",
        },
      ],
      view: "Ver",
      visit: "Visitar",
      back: "Volver",
    },
    contact: {
      title: "Trabajemos Juntos",
      subtitle: "¿Tienes un proyecto en mente? Me encantaría escucharte",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "Tu email",
      messagePlaceholder: "Tu mensaje",
      send: "Enviar mensaje",
      connect: "Conecta conmigo",
      download: "Descargar CV",
      footer: "© 2025 Rodrigo Pozo Sánchez. Todos los derechos reservados.",
    },
    ui: {
      handedLeft: "Zurdo",
      handedRight: "Diestro",
    },
  },
  en: {
    hero: {
      name: "Rodrigo Pozo Sánchez",
      tagline: "Driving your business with", // ✅ versión en inglés
      animatedWords: ["Solutions", "Quality", "Innovation"],
      cta: "View work",
      aboutTitle: "About me",
      aboutText: "Hi, I'm Rodrigo.\nI'm 22, from Madrid, and I'm passionate about programming.",
      aboutCta: "Learn more",
    },
    testimonials: {
      title: "Recommendations",
      subtitle: "What people say about my work",
    },
    portfolio: {
      title: "Featured Projects",
      seeAll: "See All",
      allTitle: "All Projects",
      projects: [
        {
          title: "E-commerce Platform",
          description: "Complete e-commerce platform with payment gateway",
        },
        {
          title: "Analytics Dashboard",
          description: "Real-time analytics panel with interactive visualizations",
        },
        {
          title: "Social Mobile App",
          description: "Social application with real-time chat and notifications",
        },
      ],
      view: "View",
      visit: "Visit",
      back: "Back",
    },
    contact: {
      title: "Let's Work Together",
      subtitle: "Have a project in mind? I'd love to hear from you",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Your message",
      send: "Send message",
      connect: "Connect with me",
      download: "Download CV",
      footer: "© 2025 Rodrigo Pozo Sánchez. All rights reserved.",
    },
    ui: {
      handedLeft: "Left-handed",
      handedRight: "Right-handed",
    },
  },
}

export type Language = keyof typeof translations
