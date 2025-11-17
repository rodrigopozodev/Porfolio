"use client"

import React, { useEffect, useState } from "react"
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/context/language-context"

// Adaptado: acepta props externas para tamaño, clases y colores
export function LanguageToggle({
  className,
  variant = "outline",
  size = "default",
  ...props
}: {
  className?: string
  variant?: any
  size?: any
  [key: string]: any
}) {
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
      variant={variant}
      size={size}
      onClick={toggleLanguage}
      className={(className ?? "h-10 w-full max-w-[140px] rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer flex items-center justify-center")}
      aria-label="Cambiar idioma"
      {...props}
    >
      <div className="flex items-center gap-1">
        <Languages className="h-4 w-4 text-foreground" />
        <span className="text-xs font-semibold">{currentLang.toUpperCase()}</span>
      </div>
    </Button>
  )
}
