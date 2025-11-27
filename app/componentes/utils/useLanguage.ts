"use client"

import { useLocalStorageString } from "./useLocalStorage"

type Language = "es" | "en"

/**
 * Hook personalizado para gestionar el idioma de la aplicación
 * Persiste la preferencia en localStorage
 */
export function useLanguage() {
  const [language, setLanguage] = useLocalStorageString("language", "es")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"))
  }

  return {
    language: language as Language,
    setLanguage: (lang: Language) => setLanguage(lang),
    toggleLanguage,
  }
}

