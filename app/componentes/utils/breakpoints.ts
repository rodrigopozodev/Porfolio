/**
 * Breakpoints de diseño y helper para obtener el breakpoint actual.
 * Estos valores deben coincidir con las variables CSS en globals.css
 */
export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  large: 1366,
  xl: 1920,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS

/**
 * Obtiene el breakpoint actual basado en el ancho de la ventana
 */
export function current(width: number): Breakpoint {
  if (width >= BREAKPOINTS.xl) return "xl"
  if (width >= BREAKPOINTS.large) return "large"
  if (width >= BREAKPOINTS.desktop) return "desktop"
  if (width >= BREAKPOINTS.tablet) return "tablet"
  return "mobile"
}

/**
 * Verifica si el ancho actual corresponde a un breakpoint o superior
 */
export function isAtLeast(width: number, breakpoint: Breakpoint): boolean {
  return width >= BREAKPOINTS[breakpoint]
}