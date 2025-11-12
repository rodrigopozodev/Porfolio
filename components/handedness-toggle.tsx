"use client"

import React, { useEffect, useState } from "react"
import { Hand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useHandedness } from "@/lib/handedness-context"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function HandednessToggle() {
  const { handedness, toggle } = useHandedness()
  const [current, setCurrent] = useState(handedness)
  const { language } = useLanguage()
  const ui = translations[language].ui

  useEffect(() => {
    setCurrent(handedness)
  }, [handedness])

  return (
    <Button
      variant="outline"
      size="default"
      onClick={toggle}
      className="h-10 px-4 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110 cursor-pointer inline-flex items-center justify-center whitespace-nowrap"
      aria-label="Cambiar modo zurdo/diestro"
    >
      <div className="flex items-center gap-1">
        <Hand className="h-4 w-4 text-foreground" />
        <span className="text-xs font-semibold uppercase">{current === "left" ? ui.handedLeft : ui.handedRight}</span>
      </div>
    </Button>
  )
}