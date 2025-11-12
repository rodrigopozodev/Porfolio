import { NextResponse } from "next/server"
import { insertTestimonial, listTestimonials, updateTestimonialReviewEn, clearTestimonials } from "@/lib/sqlite"
import { translateText } from "@/lib/translate"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const language = String(url.searchParams.get("language") ?? "es")
    const rows = await listTestimonials()
    if (language === "en") {
      // Traducir en el momento si falta review_en y persistir
      for (const r of rows) {
        const needsTranslation = !r.review_en || String(r.review_en).trim().length === 0
        if (needsTranslation) {
          try {
            const translated = await translateText(r.review, "es", "en")
            if (translated && translated.trim().length > 0) {
              await updateTestimonialReviewEn(r.id, translated.trim())
              r.review_en = translated.trim()
            } else {
              r.review_en = r.review
            }
          } catch {
            r.review_en = r.review
          }
        }
      }
    }
    return NextResponse.json(rows)
  } catch (e) {
    return NextResponse.json({ error: "DB_ERROR", message: String(e) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const name = String(body.name ?? "").trim()
    const handle = String(body.handle ?? "").trim()
    // Limpieza: quitar comillas tipográficas y normales
    const reviewRaw = String(body.review ?? "").trim()
    const review = reviewRaw.replace(/[“”"']/g, "").trim()
    const avatar = body.avatar ? String(body.avatar) : null
    const language = String(body.language ?? "es")

    if (!name || !handle || !review) {
      return NextResponse.json({ error: "VALIDATION_ERROR" }, { status: 400 })
    }

    let review_en: string | null = null
    if (language === "en") {
      review_en = review
    } else {
      // traducir a inglés en el momento de la creación
      review_en = await translateText(review, language, "en")
    }
    const inserted = await insertTestimonial({ name, handle, review, review_en, avatar })
    return NextResponse.json(inserted, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: "DB_ERROR", message: String(e) }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    await clearTestimonials()
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: "DB_ERROR", message: String(e) }, { status: 500 })
  }
}
