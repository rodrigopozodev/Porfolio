import { NextResponse } from "next/server"
import { insertTestimonial, listTestimonials } from "@/lib/sqlite"

export async function GET() {
  try {
    const rows = await listTestimonials()
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
    const review = String(body.review ?? "").trim()
    const avatar = body.avatar ? String(body.avatar) : null

    if (!name || !handle || !review) {
      return NextResponse.json({ error: "VALIDATION_ERROR" }, { status: 400 })
    }

    const inserted = await insertTestimonial({ name, handle, review, avatar })
    return NextResponse.json(inserted, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: "DB_ERROR", message: String(e) }, { status: 500 })
  }
}
