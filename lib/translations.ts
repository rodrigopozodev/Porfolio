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
      cta: "Realizar Recomendación",
      nameLabel: "Tu nombre",
      lastNameLabel: "Tus apellidos",
      selectFile: "Seleccionar archivo",
      textareaPlaceholder: "Escribe tu recomendación profesional aquí...",
      send: "Enviar recomendación",
      signOut: "Cerrar sesión",
      jobTitleLabel: "Tu cargo (opcional)",
      photoLabel: "Foto (opcional)",
    },
    portfolio: {
      title: "Proyectos Destacados",
      featuredTitle: "Proyecto Destacado",
      seeAll: "Ver Todos",
      allTitle: "Todos los Proyectos",
      projects: [
        {
          title: "League tracker",
          description: "App web Next.js para consultar y comparar perfiles de LoL (Solo/Q y Flex) con datos en tiempo real vía APIs de Riot. Autenticación y gestión de usuarios con Supabase.",
          slug: "league-tracker",
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
      cta: "Make Recommendations",
      nameLabel: "Your name",
      lastNameLabel: "Your last name(s)",
      selectFile: "Select file",
      textareaPlaceholder: "Write your professional recommendation here...",
      send: "Send recommendation",
      signOut: "Sign out",
      jobTitleLabel: "Your job title (optional)",
      photoLabel: "Photo (optional)",
    },
    portfolio: {
      title: "Featured Projects",
      featuredTitle: "Featured Project",
      seeAll: "See All",
      allTitle: "All Projects",
      projects: [
        {
          title: "E-commerce Platform",
          description: "Complete e-commerce platform with payment gateway",
          slug: "ecommerce-platform",
        },
        {
          title: "Analytics Dashboard",
          description: "Real-time analytics panel with interactive visualizations",
          slug: "analytics-dashboard",
        },
        {
          title: "Social Mobile App",
          description: "Social application with real-time chat and notifications",
          slug: "social-mobile-app",
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
