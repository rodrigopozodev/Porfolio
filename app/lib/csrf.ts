/**
 * Utilidades para protección CSRF (Cross-Site Request Forgery).
 * Next.js tiene protección básica, pero podemos mejorarla con tokens.
 */

import { cookies } from "next/headers"

const CSRF_TOKEN_NAME = "csrf-token"
const CSRF_TOKEN_EXPIRY = 60 * 60 * 24 // 24 horas

/**
 * Genera un token CSRF aleatorio.
 */
function generateToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

/**
 * Obtiene o genera un token CSRF.
 * En producción, esto debería usar cookies seguras.
 */
export async function getCsrfToken(): Promise<string> {
  const cookieStore = await cookies()
  let token = cookieStore.get(CSRF_TOKEN_NAME)?.value

  if (!token) {
    token = generateToken()
    // En producción, usar cookies seguras
    cookieStore.set(CSRF_TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: CSRF_TOKEN_EXPIRY,
    })
  }

  return token
}

/**
 * Valida un token CSRF.
 */
export async function validateCsrfToken(token: string): Promise<boolean> {
  const cookieStore = await cookies()
  const storedToken = cookieStore.get(CSRF_TOKEN_NAME)?.value

  if (!storedToken || !token) {
    return false
  }

  // Comparación segura contra timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(storedToken),
    Buffer.from(token)
  )
}

