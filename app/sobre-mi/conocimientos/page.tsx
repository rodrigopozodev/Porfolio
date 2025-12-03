"use client"

import { usePortfolio } from "@/lib/context/portfolio-context"
import { translations } from "@/lib/translations"

export default function ConocimientosPage() {
  const { language } = usePortfolio()
  const t = translations[language].about.knowledge

  return (
    <div className="h-full w-full flex items-center justify-center bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-balance">{t.title}</h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground text-balance">{t.subtitle}</p>
      </div>
    </div>
  )
}
