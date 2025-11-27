/**
 * Sistema de rate limiting simple en memoria.
 * Para producción, considerar usar Redis o un servicio externo.
 */

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

/**
 * Limpia entradas expiradas del store
 */
function cleanup() {
  const now = Date.now()
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  })
}

/**
 * Rate limiter simple
 * @param identifier - Identificador único (IP, user ID, etc.)
 * @param maxRequests - Número máximo de requests
 * @param windowMs - Ventana de tiempo en milisegundos
 * @returns true si se permite la request, false si se excede el límite
 */
export function rateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1 minuto por defecto
): { allowed: boolean; remaining: number; resetTime: number } {
  cleanup()

  const now = Date.now()
  const key = identifier

  if (!store[key] || store[key].resetTime < now) {
    // Nueva ventana de tiempo
    store[key] = {
      count: 1,
      resetTime: now + windowMs,
    }
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: store[key].resetTime,
    }
  }

  store[key].count++

  if (store[key].count > maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: store[key].resetTime,
    }
  }

  return {
    allowed: true,
    remaining: maxRequests - store[key].count,
    resetTime: store[key].resetTime,
  }
}

/**
 * Obtiene el identificador de la request (IP)
 */
export function getRequestIdentifier(request: Request): string {
  // En producción, usar headers reales como X-Forwarded-For
  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  const ip = forwarded?.split(",")[0] || realIp || "unknown"
  return ip
}

