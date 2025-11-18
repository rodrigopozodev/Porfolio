import path from "path"
import Database from "better-sqlite3"

type Row = {
  id: number
  name: string
  handle: string
  review: string
  avatar: string | null
  linkedin: string | null
  language: string
  created_at: string
}

const dbPath = path.join(process.cwd(), "data.sqlite")
const db = new Database(dbPath)
db.pragma("journal_mode = WAL")
db.exec(`
  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    handle TEXT NOT NULL,
    review TEXT NOT NULL,
    avatar TEXT,
    linkedin TEXT,
    language TEXT NOT NULL DEFAULT 'es',
    created_at TEXT NOT NULL
  );
`)

export function listTestimonials(language?: string): Row[] {
  const lang = (language ?? "es").toLowerCase()
  const stmt = db.prepare(`SELECT id, name, handle, review, avatar, linkedin, language, created_at FROM testimonials WHERE language = ? ORDER BY created_at DESC, id DESC`)
  return stmt.all(lang) as Row[]
}

export function insertTestimonial(input: {
  name: string
  handle: string
  review: string
  avatar?: string | null
  linkedin?: string | null
  language?: string
}): Row {
  const now = new Date().toISOString()
  const stmt = db.prepare(`INSERT INTO testimonials (name, handle, review, avatar, linkedin, language, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`)
  const info = stmt.run(
    input.name,
    input.handle,
    input.review,
    input.avatar ?? null,
    input.linkedin ?? null,
    (input.language ?? "es").toLowerCase(),
    now,
  )
  const sel = db.prepare(`SELECT id, name, handle, review, avatar, linkedin, language, created_at FROM testimonials WHERE id = ?`)
  return sel.get(info.lastInsertRowid) as Row
}

export function deleteLatestTestimonials(language: string, count: number): number {
  const lang = (language ?? "es").toLowerCase()
  const select = db.prepare(`SELECT id FROM testimonials WHERE language = ? ORDER BY created_at DESC, id DESC LIMIT ?`)
  const rows = select.all(lang, Math.max(0, count)) as { id: number }[]
  if (rows.length === 0) return 0
  const ids = rows.map(r => r.id)
  const placeholders = ids.map(() => '?').join(',')
  const del = db.prepare(`DELETE FROM testimonials WHERE id IN (${placeholders})`)
  const info = del.run(...ids)
  return Number(info.changes ?? 0)
}