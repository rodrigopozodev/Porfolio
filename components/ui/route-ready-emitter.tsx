"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

/**
 * Emite un evento global `routeReady` cuando la ruta actual cambia y tras el primer
 * frame de renderizado, asegurando que el contenido de la nueva página esté montado
 * antes de ocultar overlays de transición.
 */
export default function RouteReadyEmitter() {
  const pathname = usePathname()
  const lastPathRef = useRef<string | null>(null)

  useEffect(() => {
    // Emitir también en el primer montaje
    const emit = () => {
      try { window.dispatchEvent(new CustomEvent("routeReady")) } catch {}
    }
    // Asegurar al menos un frame de pintura
    const raf = window.requestAnimationFrame(() => {
      emit()
      // Pequeño margen por si hay trabajo adicional de montaje
      window.setTimeout(emit, 50)
    })
    return () => {
      try { window.cancelAnimationFrame(raf) } catch {}
    }
  }, [])

  useEffect(() => {
    if (lastPathRef.current === pathname) return
    lastPathRef.current = pathname
    // Despachar la animación post-navegación inmediatamente para evitar destellos
    try {
      const raw = sessionStorage.getItem("postSweep")
      if (raw) {
        sessionStorage.removeItem("postSweep")
        const detail = JSON.parse(raw)
        const evt = new CustomEvent("routeSweep", { detail: { ...detail, awaitReady: false } })
        window.dispatchEvent(evt)
        // Eliminar overlay pre-sweep si existe; el overlay de React ya toma el control
        const pre = document.getElementById("pre-sweep-overlay")
        if (pre) pre.remove()
      }
    } catch {}

    // Emite routeReady tras al menos un frame
    const emit = () => {
      try { window.dispatchEvent(new CustomEvent("routeReady")) } catch {}
    }
    const raf = window.requestAnimationFrame(() => {
      emit()
      window.setTimeout(emit, 50)
    })
    return () => {
      try { window.cancelAnimationFrame(raf) } catch {}
    }
  }, [pathname])

  return null
}
