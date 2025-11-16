"use client"

import React from "react"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/i18n/translations"
import { useRouter } from "next/navigation"

type BackHomeButtonProps = {
  animationType?: "fade" | "slide" | "none"
  direction?: "top" | "bottom" | "left" | "right"
  overlayClassName?: string
  transitionDuration?: number
  showLabelOnMobile?: boolean
}

export function BackHomeButton({
  animationType = "slide",
  direction = "bottom",
  overlayClassName = "bg-neutral-900 dark:bg-white",
  transitionDuration = 0.6,
  showLabelOnMobile = false,
}: BackHomeButtonProps) {
  const { language } = useLanguage()
  const router = useRouter()
  const label = translations[language].ui.backToHome

  return (
    <Button
      variant="outline"
      size="default"
      onClick={() => {
        if (animationType === "none") {
          // Navegación directa sin overlay ni post-sweep
          router.push("/")
          return
        }
        if (animationType === "slide") {
          // Navegación inmediata con animación post-navegación
          try {
            const detail: any = {
              type: "slide",
              direction,
              className: overlayClassName,
              transitionDuration,
            }
            sessionStorage.setItem("postSweep", JSON.stringify(detail))
          } catch {}
          router.push("/")
          return
        }

        // Para otros tipos (fade), mantener animación antes de navegar
        try {
          const detail: any = {
            type: animationType,
            className: overlayClassName,
            transitionDuration,
          }
          const event = new CustomEvent("routeSweep", { detail })
          window.dispatchEvent(event)
        } catch {}

        const navigate = () => router.push("/")
        window.addEventListener("routeSweepFinished", navigate, { once: true })
        window.setTimeout(() => {
          try { window.removeEventListener("routeSweepFinished", navigate as EventListener) } catch {}
          navigate()
        }, Math.max(600, (transitionDuration ?? 0.6) * 1000 + 200))
      }}
      className="h-10 px-4 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110 cursor-pointer inline-flex items-center justify-center whitespace-nowrap"
      aria-label={label}
    >
      <div className="flex items-center gap-1">
        <Home className="h-4 w-4 text-foreground" />
        <span className={showLabelOnMobile ? "text-xs font-semibold" : "text-xs font-semibold hidden min-[900px]:inline"}>{label}</span>
      </div>
    </Button>
  )
}