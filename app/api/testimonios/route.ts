import { NextResponse } from "next/server"
export const runtime = "nodejs"
import { insertTestimonial, listTestimonials, deleteLatestTestimonials } from "@/lib/sqlite"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const language = (url.searchParams.get("language") ?? "es").toLowerCase()
  const rows = listTestimonials(language)
  return NextResponse.json(rows)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body.name ?? "").trim()
    const handle = String(body.handle ?? "").trim()
    const review = String(body.review ?? "").trim()
    const avatar = body.avatar ? String(body.avatar) : null
    const linkedin = body.linkedin ? String(body.linkedin) : null
    const language = (String(body.language ?? "es")).toLowerCase()

    if (!name || !handle || !review) {
      return NextResponse.json({ error: "Campos requeridos: name, handle, review" }, { status: 400 })
    }

    const inserted = insertTestimonial({ name, handle, review, avatar, linkedin, language })
    return NextResponse.json(inserted, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: "Error procesando la solicitud" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url)
  const language = (url.searchParams.get("language") ?? "es").toLowerCase()
  const countParam = url.searchParams.get("count")
  const count = Math.max(0, Number(countParam ?? 1) || 1)
  const deleted = deleteLatestTestimonials(language, count)
  return NextResponse.json({ deleted })
}