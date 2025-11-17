"use client"

import React, { useEffect, useState } from "react"
import { Hand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useHandedness } from "@/lib/context/handedness-context"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/i18n/translations"

// Adaptado: acepta props externas para tamaño, clases y colores
export function HandednessToggle({
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
  const { handedness, toggle } = useHandedness()
  const [current, setCurrent] = useState(handedness)
  const { language } = useLanguage()
  const ui = translations[language].ui

  useEffect(() => {
    setCurrent(handedness)
  }, [handedness])

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggle}
      className={(className ?? "h-10 w-full max-w-[140px] rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer inline-flex items-center justify-center whitespace-nowrap")}
      aria-label="Cambiar modo zurdo/diestro"
      {...props}
    >
      <div className="flex items-center gap-1">
        <Hand className="h-4 w-4 text-foreground" />
        <span className="text-xs font-semibold uppercase">{current === "left" ? ui.handedLeft : ui.handedRight}</span>
      </div>
    </Button>
  )
}