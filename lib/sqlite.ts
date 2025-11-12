import fs from "fs"
import path from "path"

const storePath = path.join(process.cwd(), "data.db") // usamos el mismo nombre pero en formato JSON

function ensureStore(): void {
  if (!fs.existsSync(storePath)) {
    fs.writeFileSync(storePath, JSON.stringify({ testimonials: [] }, null, 2), "utf-8")
  }
}

function readStore(): { testimonials: DbTestimonial[] } {
  ensureStore()
  const raw = fs.readFileSync(storePath, "utf-8")
  try {
    const parsed = JSON.parse(raw)
    if (parsed && Array.isArray(parsed.testimonials)) return parsed
    return { testimonials: [] }
  } catch {
    return { testimonials: [] }
  }
}

function writeStore(data: { testimonials: DbTestimonial[] }) {
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2), "utf-8")
}

export type DbTestimonial = {
  id: number
  name: string
  handle: string
  review: string
  review_en?: string
  avatar: string | null
  created_at: string
}

export async function listTestimonials(): Promise<DbTestimonial[]> {
  const { testimonials } = readStore()
  return [...testimonials].sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
}

export async function insertTestimonial(input: {
  name: string
  handle: string
  review: string
  review_en?: string | null
  avatar: string | null
}): Promise<DbTestimonial> {
  const store = readStore()
  const nextId = (store.testimonials.reduce((max, t) => Math.max(max, t.id), 0) || 0) + 1
  const now = new Date().toISOString()
  const inserted: DbTestimonial = {
    id: nextId,
    name: input.name,
    handle: input.handle,
    review: input.review,
    review_en: input.review_en ?? undefined,
    avatar: input.avatar,
    created_at: now,
  }
  store.testimonials.unshift(inserted)
  writeStore(store)
  return inserted
}

export async function updateTestimonialReviewEn(id: number, review_en: string): Promise<DbTestimonial | null> {
  const store = readStore()
  const idx = store.testimonials.findIndex(t => t.id === id)
  if (idx === -1) return null
  store.testimonials[idx] = { ...store.testimonials[idx], review_en }
  writeStore(store)
  return store.testimonials[idx]
}

export async function clearTestimonials(): Promise<void> {
  const store = readStore()
  store.testimonials = []
  writeStore(store)
}
