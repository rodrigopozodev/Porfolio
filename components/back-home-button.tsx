"use client"

import React from "react"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { useRouter } from "next/navigation"

type BackHomeButtonProps = {
  animationType?: "fade" | "slide"
  direction?: "top" | "bottom" | "left" | "right"
  overlayClassName?: string
  transitionDuration?: number
}

export function BackHomeButton({
  animationType = "slide",
  direction = "bottom",
  overlayClassName = "bg-neutral-900 dark:bg-white",
  transitionDuration = 0.6,
}: BackHomeButtonProps) {
  const { language } = useLanguage()
  const router = useRouter()
  const label = translations[language].ui.backToHome

  return (
    <Button
      variant="outline"
      size="default"
      onClick={() => {
        try {
          const detail: any = {
            type: animationType,
            className: overlayClassName,
            transitionDuration,
          }
          if (animationType === "slide") {
            detail.direction = direction
          }
          const event = new CustomEvent("routeSweep", { detail })
          window.dispatchEvent(event)
        } catch {}

        const navigate = () => router.push("/")
        // Esperar a que termine la transición antes de navegar
        window.addEventListener("routeSweepFinished", navigate, { once: true })
        // Fallback por si el evento no llega
        window.setTimeout(() => {
          try { window.removeEventListener("routeSweepFinished", navigate as EventListener) } catch {}
          navigate()
        }, 800)
      }}
      className="h-10 px-4 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110 cursor-pointer inline-flex items-center justify-center whitespace-nowrap"
      aria-label={label}
    >
      <div className="flex items-center gap-1">
        <Home className="h-4 w-4 text-foreground" />
        <span className="text-xs font-semibold hidden min-[900px]:inline">{label}</span>
      </div>
    </Button>
  )
}