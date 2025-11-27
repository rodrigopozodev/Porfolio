/**
 * Utilidades de sanitización para prevenir XSS y otros ataques.
 */

/**
 * Sanitiza texto simple (elimina HTML y caracteres peligrosos)
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/[<>]/g, "") // Eliminar < y >
    .replace(/javascript:/gi, "") // Eliminar javascript:
    .replace(/on\w+=/gi, "") // Eliminar event handlers
    .trim()
}

/**
 * Sanitiza URL (valida que sea una URL segura)
 */
export function sanitizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    // Solo permitir http y https
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return null
    }
    // Validar hostname (no permitir localhost en producción, etc.)
    return parsed.toString()
  } catch {
    return null
  }
}

/**
 * Valida y sanitiza email
 */
export function sanitizeEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return null
  }
  return email.toLowerCase().trim()
}

/**
 * Sanitiza nombre (solo letras, espacios, guiones y apóstrofes)
 */
export function sanitizeName(name: string): string {
  return name
    .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/g, "")
    .trim()
    .slice(0, 100) // Limitar longitud
}

/**
 * Escapa HTML para prevenir XSS
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

