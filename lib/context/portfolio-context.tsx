"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

type Language = "es" | "en"
type Theme = "light" | "dark"
type Handedness = "right" | "left"

interface PortfolioContextType {
  language: Language
  theme: Theme
  handedness: Handedness
  setLanguage: (lang: Language) => void
  setTheme: (theme: Theme) => void
  setHandedness: (handedness: Handedness) => void
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

// Función para obtener el tema inicial (solo se ejecuta en el cliente)
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light"
  
  // Primero intentar leer de localStorage
  try {
    const stored = localStorage.getItem("portfolio-theme")
    if (stored === "dark" || stored === "light") {
      return stored as Theme
    }
  } catch (e) {
    console.warn("Error reading theme from localStorage:", e)
  }
  
  // Si no hay tema guardado, usar la preferencia del sistema
  if (typeof window !== "undefined" && window.matchMedia) {
    try {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark"
      }
    } catch (e) {
      console.warn("Error reading system preference:", e)
    }
  }
  
  return "light"
}

// Función para aplicar el tema al DOM
function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return
  
  const root = document.documentElement
  console.log("[applyTheme] Applying theme:", theme, "to root element")
  
  if (theme === "dark") {
    root.classList.add("dark")
    console.log("[applyTheme] Added 'dark' class. Classes:", root.className)
  } else {
    root.classList.remove("dark")
    console.log("[applyTheme] Removed 'dark' class. Classes:", root.className)
  }
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  // Inicializar siempre con "light" para evitar problemas de hidratación
  const [language, setLanguage] = useState<Language>("es")
  const [theme, setThemeState] = useState<Theme>("light")
  const [handedness, setHandedness] = useState<Handedness>("right")
  const [mounted, setMounted] = useState(false)

  // Sincronizar con localStorage y preferencia del sistema después del montaje
  useEffect(() => {
    setMounted(true)
    
    // Obtener tema inicial
    const initialTheme = getInitialTheme()
    console.log("[PortfolioProvider] Initial theme:", initialTheme)
    
    // Aplicar tema inmediatamente al DOM
    applyTheme(initialTheme)
    
    // Actualizar estado
    setThemeState(initialTheme)

    // Escuchar cambios en la preferencia del sistema (solo si no hay tema guardado)
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        // Solo aplicar si no hay tema guardado en localStorage
        const stored = localStorage.getItem("portfolio-theme")
        if (!stored || (stored !== "dark" && stored !== "light")) {
          const systemTheme: Theme = e.matches ? "dark" : "light"
          console.log("[PortfolioProvider] System theme changed to:", systemTheme)
          setThemeState(systemTheme)
          applyTheme(systemTheme)
        }
      }

      // Algunos navegadores usan addListener, otros addEventListener
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleSystemThemeChange)
        return () => mediaQuery.removeEventListener("change", handleSystemThemeChange)
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleSystemThemeChange)
        return () => mediaQuery.removeListener(handleSystemThemeChange)
      }
    }
  }, []) // Solo ejecutar una vez al montar

  // Función para establecer el tema que también guarda en localStorage
  const setTheme = useCallback((newTheme: Theme) => {
    console.log("[PortfolioContext] setTheme called with:", newTheme)
    
    // Actualizar estado primero
    setThemeState(prevTheme => {
      console.log("[PortfolioContext] Previous theme:", prevTheme, "New theme:", newTheme)
      return newTheme
    })
    
    // Aplicar al DOM inmediatamente
    applyTheme(newTheme)
    
    // Guardar en localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("portfolio-theme", newTheme)
        console.log("[PortfolioContext] Saved to localStorage:", newTheme)
      } catch (e) {
        console.warn("Error saving theme to localStorage:", e)
      }
    }
  }, [])

  // Aplicar tema cuando cambie el estado (backup)
  useEffect(() => {
    if (!mounted) return
    console.log("[PortfolioProvider] Theme state changed to:", theme)
    applyTheme(theme)
  }, [theme, mounted])

  return (
    <PortfolioContext.Provider
      value={{
        language,
        theme,
        handedness,
        setLanguage,
        setTheme,
        setHandedness,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
}
