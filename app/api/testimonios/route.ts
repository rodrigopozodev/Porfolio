import { NextResponse } from "next/server"
export const runtime = "nodejs"
import { insertTestimonial, listTestimonials, deleteLatestTestimonials } from "@/lib/sqlite"
import { testimonialSchema, testimonialQuerySchema, validateData } from "@/lib/validations"
import { logger } from "@/lib/logger"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const language = url.searchParams.get("language") ?? "es"
    
    const validation = validateData(testimonialQuerySchema, { language })
    if (!validation.success) {
      logger.warn("Invalid query parameters in GET /api/testimonios", { errors: validation.errors })
      return NextResponse.json({ error: "Parámetros inválidos", details: validation.errors }, { status: 400 })
    }

    const rows = listTestimonials(validation.data.language)
    return NextResponse.json(rows)
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
    const body = await request.json()
    
    const validation = validateData(testimonialSchema, body)
    if (!validation.success) {
      logger.warn("Invalid testimonial data in POST /api/testimonios", { errors: validation.errors })
      return NextResponse.json(
        { error: "Datos inválidos", details: validation.errors },
        { status: 400 }
      )
    }

    const inserted = insertTestimonial(validation.data)
    logger.info("Testimonial created successfully", { id: inserted.id })
    return NextResponse.json(inserted, { status: 201 })
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
    const url = new URL(request.url)
    const language = (url.searchParams.get("language") ?? "es").toLowerCase()
    const countParam = url.searchParams.get("count")
    const count = Math.max(0, Number(countParam ?? 1) || 1)
    
    const deleted = deleteLatestTestimonials(language, count)
    logger.info("Testimonials deleted", { count: deleted, language })
    return NextResponse.json({ deleted })
  } catch (error) {
    logger.error("Error in DELETE /api/testimonios", error instanceof Error ? error : new Error(String(error)))
    return NextResponse.json(
      { error: "Error al eliminar testimonios" },
      { status: 500 }
    )
  }
}