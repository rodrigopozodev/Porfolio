"use client"

import React, { useEffect, useState } from "react"
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/context/language-context"

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
      size="default"
      onClick={toggleLanguage}
      className="h-10 w-20 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110 cursor-pointer flex items-center justify-center"
      aria-label="Cambiar idioma"
    >
      <div className="flex items-center gap-1">
        <Languages className="h-4 w-4 text-foreground" />
        <span className="text-xs font-semibold">{currentLang.toUpperCase()}</span>
      </div>
    </Button>
  )
}
