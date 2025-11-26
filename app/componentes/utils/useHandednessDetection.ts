/**
 * Hook para detectar automáticamente la lateralidad del usuario
 * basándose en la posición inicial del mouse/touch.
 * No guarda preferencias, solo detecta en la sesión actual.
 * Por defecto usa modo diestro.
 */

import { useEffect } from "react"

export function useHandednessDetection() {
  useEffect(() => {
    let detected = false

    const detectFromMouse = (e: MouseEvent) => {
      if (detected) return

      // Obtener la posición X del mouse
      const mouseX = e.clientX
      const screenWidth = window.innerWidth
      const threshold = screenWidth / 2

      // Si el mouse está en la mitad izquierda, probablemente es zurdo
      // Si está en la mitad derecha, probablemente es diestro
      const detectedMode: "left" | "right" = mouseX < threshold ? "left" : "right"

      try {
        window.dispatchEvent(
          new CustomEvent("handednessChange", { detail: { mode: detectedMode } })
        )
        detected = true
      } catch {
        // Error, ignorar
      }
    }

    const detectFromTouch = (e: TouchEvent) => {
      if (detected) return

      // Obtener la posición X del primer touch
      const touch = e.touches[0]
      if (!touch) return

      const touchX = touch.clientX
      const screenWidth = window.innerWidth
      const threshold = screenWidth / 2

      const detectedMode: "left" | "right" = touchX < threshold ? "left" : "right"

      try {
        window.dispatchEvent(
          new CustomEvent("handednessChange", { detail: { mode: detectedMode } })
        )
        detected = true
      } catch {
        // Error, ignorar
      }
    }

    // Detectar en el primer movimiento del mouse
    window.addEventListener("mousemove", detectFromMouse, { once: true, passive: true })

    // Detectar en el primer touch (para móviles)
    window.addEventListener("touchstart", detectFromTouch, { once: true, passive: true })

    // Por defecto, usar modo diestro si no se detecta nada
    // No se establece automáticamente, los componentes ya tienen "right" como default

    return () => {
      window.removeEventListener("mousemove", detectFromMouse)
      window.removeEventListener("touchstart", detectFromTouch)
    }
  }, [])
}

