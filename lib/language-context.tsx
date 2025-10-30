"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import type { Language } from "@/lib/translations"

type LanguageContextValue = {
  language: Language
  setLanguage: (lang: Language) => void
  isHydrated: boolean
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "es",
  setLanguage: () => {},
  isHydrated: false,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // FORZAR SIEMPRE ESPAÑOL AL INICIO - NO LEER LOCALSTORAGE
  const [language, setLanguage] = useState<Language>("es")
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Limpiar localStorage y forzar español
    localStorage.removeItem("language")
    localStorage.setItem("language", "es")
    setIsHydrated(true)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, isHydrated }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}