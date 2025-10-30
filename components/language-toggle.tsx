"use client"

import { useEffect, useState } from "react"
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const [language, setLanguage] = useState<"es" | "en">("es")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language") as "es" | "en" | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
      // Dispatch custom event to notify components
      window.dispatchEvent(new CustomEvent("languageChange", { detail: savedLanguage }))
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "es" ? "en" : "es"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
    // Dispatch custom event to notify all components
    window.dispatchEvent(new CustomEvent("languageChange", { detail: newLanguage }))
  }

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      className="fixed right-20 top-6 z-50 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110"
      aria-label="Cambiar idioma"
    >
      <div className="flex items-center gap-1">
        <Languages className="h-5 w-5 text-foreground" />
        <span className="text-xs font-semibold">{language.toUpperCase()}</span>
      </div>
    </Button>
  )
}
