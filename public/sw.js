/**
 * Service Worker para PWA
 * Maneja caché, actualizaciones y funcionalidad offline
 */

const CACHE_NAME = "portfolio-v1"
const STATIC_ASSETS = [
  "/",
  "/Rodrigo.png",
  "/icon-github.svg",
  "/icon-linkedin.svg",
  "/icon-gmail.svg",
  "/icon-linkedin-hover.svg",
  "/icon-translate.svg",
  "/icon-translate-hover.png",
  "/favicon.ico",
]

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// Activación del Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
  return self.clients.claim()
})

// Estrategia de caché: Network First, fallback a Cache
self.addEventListener("fetch", (event) => {
  // Solo cachear requests GET
  if (event.request.method !== "GET") {
    return
  }

  // No cachear requests a la API
  if (event.request.url.includes("/api/")) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar la respuesta para poder usarla y cachearla
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
      .catch(() => {
        // Si falla la red, intentar desde el caché
        return caches.match(event.request)
      })
  )
})

// Manejo de mensajes para actualizaciones
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})

