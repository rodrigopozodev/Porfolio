import { NextResponse } from "next/server"
export const runtime = "nodejs"
import { insertTestimonial, listTestimonials, deleteLatestTestimonials } from "@/lib/sqlite"
import { testimonialSchema, testimonialQuerySchema, validateData } from "@/lib/validations"
import { logger } from "@/lib/logger"
import { rateLimit, getRequestIdentifier } from "@/lib/rateLimit"
import { sanitizeUrl, sanitizeText } from "@/lib/sanitize"

export async function GET(request: Request) {
  try {
    // Rate limiting: 30 requests por minuto
    const identifier = getRequestIdentifier(request)
    const limit = rateLimit(identifier, 30, 60000)
    
    if (!limit.allowed) {
      logger.warn("Rate limit exceeded for GET /api/testimonios", { identifier })
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intenta más tarde." },
        { 
          status: 429,
          headers: {
            "Retry-After": Math.ceil((limit.resetTime - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": "30",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": limit.resetTime.toString(),
          }
        }
      )
    }

    const url = new URL(request.url)
    const language = url.searchParams.get("language") ?? "es"
    
    const validation = validateData(testimonialQuerySchema, { language })
    if (!validation.success) {
      logger.warn("Invalid query parameters in GET /api/testimonios", { errors: validation.errors })
      return NextResponse.json({ error: "Parámetros inválidos", details: validation.errors }, { status: 400 })
    }

    const rows = listTestimonials(validation.data.language)
    return NextResponse.json(rows, {
      headers: {
        "X-RateLimit-Limit": "30",
        "X-RateLimit-Remaining": limit.remaining.toString(),
        "X-RateLimit-Reset": limit.resetTime.toString(),
      }
    })
  } catch (error) {
    logger.error("Error in GET /api/testimonios", error instanceof Error ? error : new Error(String(error)))
    return NextResponse.json(
      { error: "Error al obtener testimonios" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // Rate limiting: 5 requests por minuto para POST (más restrictivo)
    const identifier = getRequestIdentifier(request)
    const limit = rateLimit(identifier, 5, 60000)
    
    if (!limit.allowed) {
      logger.warn("Rate limit exceeded for POST /api/testimonios", { identifier })
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intenta más tarde." },
        { 
          status: 429,
          headers: {
            "Retry-After": Math.ceil((limit.resetTime - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": limit.resetTime.toString(),
          }
        }
      )
    }

    const body = await request.json()
    
    const validation = validateData(testimonialSchema, body)
    if (!validation.success) {
      logger.warn("Invalid testimonial data in POST /api/testimonios", { errors: validation.errors })
      return NextResponse.json(
        { error: "Datos inválidos", details: validation.errors },
        { status: 400 }
      )
    }

    // Sanitizar datos adicionales
    const sanitizedData = {
      ...validation.data,
      name: sanitizeText(validation.data.name),
      handle: sanitizeText(validation.data.handle),
      review: sanitizeText(validation.data.review),
      avatar: validation.data.avatar ? sanitizeUrl(validation.data.avatar) : null,
      linkedin: validation.data.linkedin ? sanitizeUrl(validation.data.linkedin) : null,
    }

    // Validar que las URLs sanitizadas sean válidas
    if (sanitizedData.avatar === null && validation.data.avatar) {
      return NextResponse.json(
        { error: "URL de avatar inválida" },
        { status: 400 }
      )
    }
    if (sanitizedData.linkedin === null && validation.data.linkedin) {
      return NextResponse.json(
        { error: "URL de LinkedIn inválida" },
        { status: 400 }
      )
    }

    const inserted = insertTestimonial(sanitizedData)
    logger.info("Testimonial created successfully", { id: inserted.id })
    return NextResponse.json(inserted, { 
      status: 201,
      headers: {
        "X-RateLimit-Limit": "5",
        "X-RateLimit-Remaining": limit.remaining.toString(),
        "X-RateLimit-Reset": limit.resetTime.toString(),
      }
    })
  } catch (error) {
    logger.error("Error in POST /api/testimonios", error instanceof Error ? error : new Error(String(error)))
    return NextResponse.json(
      { error: "Error al crear testimonio" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    // Rate limiting: 3 requests por minuto para DELETE (muy restrictivo)
    const identifier = getRequestIdentifier(request)
    const limit = rateLimit(identifier, 3, 60000)
    
    if (!limit.allowed) {
      logger.warn("Rate limit exceeded for DELETE /api/testimonios", { identifier })
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intenta más tarde." },
        { 
          status: 429,
          headers: {
            "Retry-After": Math.ceil((limit.resetTime - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": "3",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": limit.resetTime.toString(),
          }
        }
      )
    }

    const url = new URL(request.url)
    const language = (url.searchParams.get("language") ?? "es").toLowerCase()
    const countParam = url.searchParams.get("count")
    const count = Math.max(0, Math.min(10, Number(countParam ?? 1) || 1)) // Limitar a máximo 10
    
    const deleted = deleteLatestTestimonials(language, count)
    logger.info("Testimonials deleted", { count: deleted, language })
    return NextResponse.json({ deleted }, {
      headers: {
        "X-RateLimit-Limit": "3",
        "X-RateLimit-Remaining": limit.remaining.toString(),
        "X-RateLimit-Reset": limit.resetTime.toString(),
      }
    })
  } catch (error) {
    logger.error("Error in DELETE /api/testimonios", error instanceof Error ? error : new Error(String(error)))
    return NextResponse.json(
      { error: "Error al eliminar testimonios" },
      { status: 500 }
    )
  }
}