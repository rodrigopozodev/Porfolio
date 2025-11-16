// Este módulo implementa un almacenaje sencillo basado en archivo JSON.
// A pesar del nombre "sqlite", no usa una base de datos SQLite real.
// Guarda y lee datos desde "data.db" (JSON) en la raíz del proyecto.
import fs from "fs"
import path from "path"

// Ruta absoluta del archivo donde se persiste la información.
// Usamos el nombre "data.db" pero su contenido es JSON.
const storePath = path.join(process.cwd(), "data.db")

// Crea el archivo de almacén si no existe.
function ensureStore(): void {
  if (!fs.existsSync(storePath)) {
    fs.writeFileSync(storePath, JSON.stringify({ testimonials: [] }, null, 2), "utf-8")
  }
}

// Lee y valida el contenido del archivo JSON.
// Si el archivo no existe o está corrupto, devuelve una estructura vacía segura.
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

// Escribe el estado en disco en formato JSON.
function writeStore(data: { testimonials: DbTestimonial[] }) {
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2), "utf-8")
}

// Estructura que representa un testimonio almacenado.
export type DbTestimonial = {
  id: number
  name: string
  handle: string
  review: string
  review_en?: string
  avatar: string | null
  created_at: string
}

// Devuelve los testimonios ordenados por fecha (más recientes primero).
export async function listTestimonials(): Promise<DbTestimonial[]> {
  const { testimonials } = readStore()
  return [...testimonials].sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
}

// Inserta un nuevo testimonio asignando un id incremental y la fecha de creación.
// Se añade al comienzo de la lista para que aparezca como reciente.
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

// Actualiza el campo "review_en" de un testimonio existente.
// Útil si en el futuro se añade una traducción manual o externa.
export async function updateTestimonialReviewEn(id: number, review_en: string): Promise<DbTestimonial | null> {
  const store = readStore()
  const idx = store.testimonials.findIndex(t => t.id === id)
  if (idx === -1) return null
  store.testimonials[idx] = { ...store.testimonials[idx], review_en }
  writeStore(store)
  return store.testimonials[idx]
}

// Elimina todos los testimonios del almacén (reinicio).
export async function clearTestimonials(): Promise<void> {
  const store = readStore()
  store.testimonials = []
  writeStore(store)
}
