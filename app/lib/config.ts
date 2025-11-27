/**
 * Configuración centralizada de la aplicación.
 * Todas las constantes, variables de entorno y configuraciones deben estar aquí.
 */

/**
 * Variables de entorno con valores por defecto.
 * En producción, estas deben estar definidas en el sistema de despliegue.
 */
export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
} as const

/**
 * Configuración de la aplicación.
 */
export const appConfig = {
  name: "Portfolio de Rodrigo Pozo Sánchez",
  version: "0.1.0",
  description: "Portfolio personal mostrando proyectos y habilidades de desarrollo",
  author: "Rodrigo Pozo Sánchez",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
} as const

/**
 * Configuración de base de datos.
 */
export const dbConfig = {
  path: process.env.DB_PATH || "data.sqlite",
  journalMode: "WAL" as const,
} as const

/**
 * Configuración de API.
 */
export const apiConfig = {
  timeout: 30000, // 30 segundos
  maxRetries: 3,
  defaultLanguage: "es" as const,
  supportedLanguages: ["es", "en"] as const,
} as const

/**
 * Configuración de temas.
 */
export const themeConfig = {
  defaultTheme: "system" as const,
  supportedThemes: ["light", "dark", "system"] as const,
  storageKey: "theme",
} as const

/**
 * Configuración de lateralidad (handedness).
 */
export const handednessConfig = {
  defaultMode: "right" as const,
  supportedModes: ["left", "right"] as const,
  storageKey: "handedness",
  eventName: "handednessChange",
} as const

/**
 * Configuración de idioma.
 */
export const languageConfig = {
  defaultLanguage: "es" as const,
  supportedLanguages: ["es", "en"] as const,
  storageKey: "language",
} as const

/**
 * Breakpoints de diseño (deben coincidir con CSS).
 */
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  large: 1366,
  xl: 1920,
} as const

/**
 * Configuración de validación.
 */
export const validationConfig = {
  maxNameLength: 100,
  maxHandleLength: 100,
  maxReviewLength: 1000,
  maxLinkedInUrlLength: 200,
} as const

/**
 * Configuración de testimonios.
 */
export const testimonialsConfig = {
  maxTestimonialsPerPage: 50,
  defaultLanguage: "es" as const,
} as const

/**
 * URLs externas.
 */
export const externalUrls = {
  github: "https://github.com/rodrigopozosanchez",
  linkedin: "https://www.linkedin.com/in/rodrigopozosanchez",
  email: "mailto:rodrigopozosanchez@gmail.com",
  leagueTracker: "https://lol-tracker-beta.vercel.app",
} as const

/**
 * Rutas de la aplicación.
 */
export const routes = {
  home: "/",
  proyectos: "/proyectos",
  leagueTracker: "/proyectos/league-tracker",
} as const

