"use client"

// Este archivo define y comparte el idioma de la web usando React Context.
// Permite leer el idioma actual y cambiarlo desde cualquier componente.
// También expone "isHydrated" para indicar que el estado inicial ya está listo en el cliente.
import React, { createContext, useContext, useEffect, useState } from "react"
import type { Language } from "@/lib/i18n/translations"

// Estructura de datos que viaja por el contexto de idioma.
type LanguageContextValue = {
  language: Language
  setLanguage: (lang: Language) => void
  isHydrated: boolean
}

// Contexto con valores por defecto (idioma español y no hidratado).
const LanguageContext = createContext<LanguageContextValue>({
  language: "es",
  setLanguage: () => {},
  isHydrated: false,
})

// Componente proveedor: envuelve la aplicación y gestiona el estado del idioma.
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Estado inicial: español. Se evita leer de localStorage al inicio.
  const [language, setLanguage] = useState<Language>("es")
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Al montar, fijamos el idioma en localStorage a "es" y marcamos hidratación.
    localStorage.removeItem("language")
    localStorage.setItem("language", "es")
    setIsHydrated(true)
  }, [])

  // Cambia el idioma y lo persiste en localStorage.
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

// Hook de conveniencia para acceder al contexto de idioma.
export function useLanguage() {
  return useContext(LanguageContext)
}
