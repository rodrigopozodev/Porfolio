"use client"

import { useEffect, useState } from "react"
import { logger } from "@/lib/logger"

type HandednessMode = "left" | "right"

/**
 * Hook personalizado para gestionar la lateralidad (modo diestro/zurdo)
 * Escucha eventos de cambio y permite toggle manual
 */
export function useHandedness() {
  const [mode, setMode] = useState<HandednessMode>("right")

  useEffect(() => {
    // Escuchar cambios de lateralidad desde la detección automática
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode: HandednessMode }>
      const m = customEvent?.detail?.mode
      if (m === "left" || m === "right") {
        setMode(m)
      }
    }

    window.addEventListener("handednessChange", handler as EventListener)

    return () => {
      window.removeEventListener("handednessChange", handler as EventListener)
    }
  }, [])

  const toggleMode = () => {
    const next = mode === "right" ? "left" : "right"
    setMode(next)
    try {
      window.dispatchEvent(
        new CustomEvent("handednessChange", { detail: { mode: next } })
      )
    } catch (error) {
      logger.warn("Failed to dispatch handednessChange event", { error, mode: next })
    }
  }

  return {
    mode,
    setMode: (newMode: HandednessMode) => {
      setMode(newMode)
      try {
        window.dispatchEvent(
          new CustomEvent("handednessChange", { detail: { mode: newMode } })
        )
      } catch (error) {
        logger.warn("Failed to dispatch handednessChange event", { error, mode: newMode })
      }
    },
    toggleMode,
  }
}

