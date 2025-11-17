/**
 * Breakpoints de diseño y helper para obtener el breakpoint actual.
 */
export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
}

export function current(width: number) {
  if (width >= BREAKPOINTS.desktop) return "desktop"
  if (width >= BREAKPOINTS.tablet) return "tablet"
  return "mobile"
}