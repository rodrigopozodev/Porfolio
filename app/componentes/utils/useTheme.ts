"use client"

import { useEffect, useState } from "react"
import { logger } from "@/lib/logger"

type Theme = "light" | "dark" | "system"

/**
 * Hook personalizado para gestionar el tema de la aplicación
 * Maneja la detección del tema actual, cambios de tema y persistencia en localStorage
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system")
  const [mountedTheme, setMountedTheme] = useState<Theme>("system")
  const [isDark, setIsDark] = useState(false)

  // Aplicar tema al DOM
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    if (newTheme === "system") {
      root.classList.remove("light")
      root.classList.remove("dark")
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      if (systemTheme === "dark") root.classList.add("dark")
      else root.classList.add("light")
      setIsDark(systemTheme === "dark")
      return
    }
    if (newTheme === "dark") {
      root.classList.remove("light")
      root.classList.add("dark")
      setIsDark(true)
      return
    }
    // light
    root.classList.remove("dark")
    root.classList.add("light")
    setIsDark(false)
  }

  // Inicializar tema desde localStorage
  useEffect(() => {
    const savedTheme = (typeof window !== "undefined" ? localStorage.getItem("theme") : null) as Theme | null
    const initial = savedTheme || "system"
    setTheme(initial)
    setMountedTheme(initial)
    applyTheme(initial)
  }, [])

  // Escuchar cambios de tema del sistema
  useEffect(() => {
    if (theme !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (e: MediaQueryListEvent) => {
      const root = document.documentElement
      root.classList.remove("light", "dark")
      if (e.matches) {
        root.classList.add("dark")
        setIsDark(true)
      } else {
        root.classList.add("light")
        setIsDark(false)
      }
    }

    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [theme])

  // Escuchar eventos de cambio de tema desde otros componentes
  useEffect(() => {
    const handler = () => {
      const root = document.documentElement
      setIsDark(root.classList.contains("dark"))
    }
    window.addEventListener("themeToggleTransition", handler as EventListener)
    return () => window.removeEventListener("themeToggleTransition", handler as EventListener)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    try {
      localStorage.setItem("theme", newTheme)
    } catch (error) {
      logger.warn("Failed to save theme to localStorage", { error, theme: newTheme })
    }
    try {
      document.body.classList.add("theme-transition")
    } catch (error) {
      logger.warn("Failed to add theme-transition class", { error })
    }
    applyTheme(newTheme)
    try {
      setTimeout(() => {
        document.body.classList.remove("theme-transition")
      }, 250)
    } catch (error) {
      logger.warn("Failed to remove theme-transition class", { error })
    }
    try {
      window.dispatchEvent(new Event("themeToggleTransition"))
    } catch (error) {
      logger.warn("Failed to dispatch themeToggleTransition event", { error })
    }
  }

  return {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme)
      try {
        localStorage.setItem("theme", newTheme)
      } catch (error) {
        logger.warn("Failed to save theme to localStorage", { error, theme: newTheme })
      }
      applyTheme(newTheme)
    },
    toggleTheme,
    isDark,
    mountedTheme,
  }
}

/**
 * Hook simplificado solo para detectar si el tema actual es oscuro
 * Útil para componentes que solo necesitan saber el estado del tema sin gestionarlo
 */
export function useIsDark() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const updateIsDark = () => {
      const root = document.documentElement
      setIsDark(root.classList.contains("dark"))
    }

    // Inicializar
    updateIsDark()

    // Escuchar cambios
    const handler = () => updateIsDark()
    window.addEventListener("themeToggleTransition", handler as EventListener)

    return () => {
      window.removeEventListener("themeToggleTransition", handler as EventListener)
    }
  }, [])

  return isDark
}

