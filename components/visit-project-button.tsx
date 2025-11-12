"use client"

import React from "react"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function VisitProjectButton({ href }: { href: string }) {
  const { language } = useLanguage()
  const label = translations[language].portfolio.visit

  return (
    <Button
      variant="outline"
      size="default"
      onClick={() => {
        try {
          window.open(href, "_blank", "noopener,noreferrer")
        } catch {}
      }}
      className="h-10 px-4 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110 cursor-pointer inline-flex items-center justify-center whitespace-nowrap"
      aria-label={label}
    >
      <div className="flex items-center gap-1">
        <ExternalLink className="h-4 w-4 text-foreground" />
        <span className="text-xs font-semibold hidden min-[900px]:inline">{label}</span>
      </div>
    </Button>
  )
}