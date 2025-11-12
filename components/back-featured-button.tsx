"use client"

import React from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { useRouter } from "next/navigation"

export function BackFeaturedButton() {
  const { language } = useLanguage()
  const router = useRouter()
  const label = translations[language].ui.backToFeatured

  return (
    <Button
      variant="outline"
      size="default"
      onClick={() => {
        try {
          window.dispatchEvent(
            new CustomEvent("routeSweep", {
              detail: {
                type: "slide",
                direction: "left",
                className: "bg-accent",
                transitionDuration: 0.6,
              },
            })
          )
        } catch {}

        const navigate = () => router.push("/?section=portfolio")
        window.addEventListener("routeSweepFinished", navigate, { once: true })
        window.setTimeout(() => {
          try { window.removeEventListener("routeSweepFinished", navigate as EventListener) } catch {}
          navigate()
        }, 800)
      }}
      className="h-10 px-4 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110 cursor-pointer inline-flex items-center justify-center whitespace-nowrap"
      aria-label={label}
    >
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 text-foreground" />
        <span className="text-xs font-semibold hidden min-[900px]:inline">{label}</span>
      </div>
    </Button>
  )
}