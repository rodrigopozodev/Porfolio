/**
 * Sistema de traducciones (i18n).
 * Centraliza todas las cadenas de texto traducibles de la aplicación.
 */

export type Language = "es" | "en"

export interface Translations {
  // Navegación
  nav: {
    inicio: string
    proyectos: string
    skipToContent: string
  }
  
  // Header
  header: {
    changeTheme: string
    changeHandedness: string
    changeLanguage: string
  }
  
  // Personal
  personal: {
    name: string
    verTrabajos: string
    conectaConmigo: string
  }
  
  // Proyectos
  proyectos: {
    destacado: string
    visitar: string
    informacion: string
    clickForDetails: string
  }
  
  // Testimonios
  testimonios: {
    titulo: string
    añadirReseña: string
    nuevaReseña: string
    nombre: string
    puesto: string
    recomendacion: string
    linkedin: string
    foto: string
    enviar: string
    cerrar: string
    nombrePlaceholder: string
    puestoPlaceholder: string
    recomendacionPlaceholder: string
    linkedinPlaceholder: string
    ningunaSeleccionada: string
    seleccionarFoto: string
  }
  
  // Conectar
  conectar: {
    github: string
    linkedin: string
    email: string
    descargarCV: string
  }
  
  // Errores
  errors: {
    algoSalióMal: string
    intentarDeNuevo: string
    recargarPágina: string
    detallesError: string
  }
  
  // Validación
  validation: {
    nombreRequerido: string
    puestoRequerido: string
    recomendacionRequerida: string
    urlInvalida: string
    archivoInvalido: string
    archivoMuyGrande: string
  }
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      inicio: "Inicio",
      proyectos: "Proyectos",
      skipToContent: "Saltar al contenido principal",
    },
    header: {
      changeTheme: "Cambiar tema",
      changeHandedness: "Cambiar lateralidad",
      changeLanguage: "Cambiar idioma",
    },
    personal: {
      name: "Rodrigo Pozo Sánchez",
      verTrabajos: "Ver Trabajos",
      conectaConmigo: "Conecta conmigo",
    },
    proyectos: {
      destacado: "Proyecto destacado",
      visitar: "Visitar",
      informacion: "Información",
      clickForDetails: "Click para ver detalles",
    },
    testimonios: {
      titulo: "Recomendaciones",
      añadirReseña: "Añadir reseña",
      nuevaReseña: "Nueva reseña",
      nombre: "Nombre y Apellidos",
      puesto: "Puesto",
      recomendacion: "Recomendación",
      linkedin: "LinkedIn (opcional)",
      foto: "Foto (opcional)",
      enviar: "Enviar",
      cerrar: "Cerrar",
      nombrePlaceholder: "Ej. Ana López García",
      puestoPlaceholder: "Ej. Frontend Engineer @ TechCo",
      recomendacionPlaceholder: "Ej. Trabajar con Rodrigo fue eficiente y agradable…",
      linkedinPlaceholder: "https://linkedin.com/in/usuario",
      ningunaSeleccionada: "Ninguna seleccionada",
      seleccionarFoto: "Seleccionar foto",
    },
    conectar: {
      github: "Visitar perfil de GitHub",
      linkedin: "Visitar perfil de LinkedIn",
      email: "Enviar correo electrónico",
      descargarCV: "Descargar CV",
    },
    errors: {
      algoSalióMal: "Algo salió mal",
      intentarDeNuevo: "Intentar de nuevo",
      recargarPágina: "Recargar página",
      detallesError: "Detalles del error (solo en desarrollo)",
    },
    validation: {
      nombreRequerido: "El nombre es requerido",
      puestoRequerido: "El puesto es requerido",
      recomendacionRequerida: "La recomendación es requerida",
      urlInvalida: "La URL no es válida",
      archivoInvalido: "Solo se permiten imágenes (JPEG, PNG, WebP, GIF)",
      archivoMuyGrande: "La imagen no puede exceder 5MB",
    },
  },
  en: {
    nav: {
      inicio: "Home",
      proyectos: "Projects",
      skipToContent: "Skip to main content",
    },
    header: {
      changeTheme: "Change theme",
      changeHandedness: "Change handedness",
      changeLanguage: "Change language",
    },
    personal: {
      name: "Rodrigo Pozo Sánchez",
      verTrabajos: "View Works",
      conectaConmigo: "Connect with me",
    },
    proyectos: {
      destacado: "Featured project",
      visitar: "Visit",
      informacion: "Information",
      clickForDetails: "Click to view details",
    },
    testimonios: {
      titulo: "Recommendations",
      añadirReseña: "Add review",
      nuevaReseña: "New review",
      nombre: "Full Name",
      puesto: "Position",
      recomendacion: "Recommendation",
      linkedin: "LinkedIn (optional)",
      foto: "Photo (optional)",
      enviar: "Submit",
      cerrar: "Close",
      nombrePlaceholder: "E.g. Ana López García",
      puestoPlaceholder: "E.g. Frontend Engineer @ TechCo",
      recomendacionPlaceholder: "E.g. Working with Rodrigo was efficient and pleasant…",
      linkedinPlaceholder: "https://linkedin.com/in/user",
      ningunaSeleccionada: "None selected",
      seleccionarFoto: "Select photo",
    },
    conectar: {
      github: "Visit GitHub profile",
      linkedin: "Visit LinkedIn profile",
      email: "Send email",
      descargarCV: "Download resume",
    },
    errors: {
      algoSalióMal: "Something went wrong",
      intentarDeNuevo: "Try again",
      recargarPágina: "Reload page",
      detallesError: "Error details (development only)",
    },
    validation: {
      nombreRequerido: "Name is required",
      puestoRequerido: "Position is required",
      recomendacionRequerida: "Recommendation is required",
      urlInvalida: "URL is invalid",
      archivoInvalido: "Only images are allowed (JPEG, PNG, WebP, GIF)",
      archivoMuyGrande: "Image cannot exceed 5MB",
    },
  },
}

/**
 * Obtiene las traducciones para un idioma específico
 */
export function getTranslations(language: Language): Translations {
  return translations[language] || translations.es
}

