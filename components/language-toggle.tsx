"use client"

import React, { useEffect, useState } from "react"
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const [currentLang, setCurrentLang] = useState(language)

  useEffect(() => {
    setCurrentLang(language)
  }, [language])

  const toggleLanguage = () => {
    const newLang = language === "es" ? "en" : "es"
    setLanguage(newLang)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      className="fixed top-6 left-6 md:left-auto md:right-20 z-50 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110 cursor-pointer"
      aria-label="Cambiar idioma"
    >
      <div className="flex items-center gap-1">
        <Languages className="h-4 w-4 text-foreground" />
        <span className="text-xs font-semibold">{currentLang.toUpperCase()}</span>
      </div>
    </Button>
  )
}
