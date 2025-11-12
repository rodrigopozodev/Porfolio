export async function translateText(text: string, source: string | undefined, target: string): Promise<string> {
  const q = (text || "").trim()
  if (!q) return ""
  // Si ya está en el idioma objetivo, devolvemos tal cual
  if ((source ?? "").toLowerCase() === target.toLowerCase()) return q

  const endpoints = [
    "https://libretranslate.com/translate",
    "https://translate.astian.org/translate",
    "https://translate.argosopentech.com/translate",
  ]

  const payload = { q, source: source || "auto", target, format: "text" }

  const fetchWithTimeout = (url: string, ms = 6000) => {
    const ctrl = new AbortController()
    const id = setTimeout(() => ctrl.abort(), ms)
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    }).finally(() => clearTimeout(id))
  }

  for (const url of endpoints) {
    try {
      const res = await fetchWithTimeout(url)
      if (!res.ok) continue
      const data = await res.json()
      const translated = String(data?.translatedText ?? "").trim()
      if (translated) return translated
    } catch {
      // probar el siguiente endpoint
      continue
    }
  }

  // Si nada funcionó, devolvemos el original
  return q
}