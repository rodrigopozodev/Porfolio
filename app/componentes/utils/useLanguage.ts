"use client"

import { useEffect } from "react"
import { useLocalStorageString } from "./useLocalStorage"

type Language = "es" | "en"

/**
 * Detecta el idioma del navegador.
 */
function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "es"
  
  const browserLang = navigator.language || (navigator as any).userLanguage || "es"
  const langCode = browserLang.split("-")[0].toLowerCase()
  
  return langCode === "en" ? "en" : "es"
}

/**
 * Hook personalizado para gestionar el idioma de la aplicación
 * Persiste la preferencia en localStorage, por defecto español
 */
export function useLanguage() {
  const [language, setLanguage] = useLocalStorageString("language", "es")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"))
  }

  return {
    language: (language || "es") as Language,
    setLanguage: (lang: Language) => setLanguage(lang),
    toggleLanguage,
  }
}

