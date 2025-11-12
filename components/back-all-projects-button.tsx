"use client"

import React from "react"
import { Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { useRouter } from "next/navigation"

export function BackAllProjectsButton({ showLabelOnMobile = false }: { showLabelOnMobile?: boolean }) {
  const { language } = useLanguage()
  const router = useRouter()
  const label = translations[language].ui.backToAllProjects

  return (
    <Button
      variant="outline"
      size="default"
      onClick={() => {
        // Restaurar animación con overlay (fade) antes de navegar a /projects
        try {
          window.dispatchEvent(
            new CustomEvent("routeSweep", {
              detail: {
                type: "fade",
                className: "bg-neutral-900 dark:bg-white",
                transitionDuration: 0.6,
              },
            })
          )
        } catch {}

        const navigate = () => router.push("/projects")
        window.addEventListener("routeSweepFinished", navigate, { once: true })
        window.setTimeout(() => {
          try { window.removeEventListener("routeSweepFinished", navigate as unknown as EventListener) } catch {}
          navigate()
        }, 800)
      }}
      className="h-10 px-4 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110 cursor-pointer inline-flex items-center justify-center whitespace-nowrap"
      aria-label={label}
    >
      <div className="flex items-center gap-1">
        <Grid3X3 className="h-4 w-4 text-foreground" />
        <span className={showLabelOnMobile ? "text-xs font-semibold" : "text-xs font-semibold hidden min-[900px]:inline"}>{label}</span>
      </div>
    </Button>
  )
}