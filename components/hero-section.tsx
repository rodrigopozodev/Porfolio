"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import React, { useEffect, useState } from "react"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"
import Typeanimation from "@/components/ui/typeanimation"
import { Announcement, AnnouncementTitle } from "@/components/ui/announcement"

export function HeroSection() {
  const { language } = useLanguage()
  const [renderKey, setRenderKey] = useState(0)

  const t = translations[language].hero

  useEffect(() => {
    // Forzar re-renderizado cuando cambie el idioma
    setRenderKey(prev => prev + 1)
  }, [language])

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById("portfolio")
    portfolioSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="snap-section relative flex items-center justify-center bg-background"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />

      <div key={renderKey} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Nombre */}
        <h1 className="mb-6 text-balance font-sans text-6xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
          {t.name}
        </h1>

        {/* Tagline */}
        <p className="mb-4 text-pretty text-xl text-muted-foreground md:text-2xl">
          {t.tagline}
        </p>

        {/* Palabras animadas con color azul sólido */}
        <div className="mb-8">
          <Typeanimation
            key={language}
            words={t.animatedWords}
            typingSpeed="slow"
            deletingSpeed="slow"
            pauseDuration={1500}
            className="text-blue-500 text-2xl md:text-3xl font-extrabold"
          />
        </div>

        {/* Botón debajo de las palabras animadas envuelto en Announcement */}
        <Announcement movingBorder>
          <AnnouncementTitle>
            <Button
              size="lg"
              onClick={scrollToPortfolio}
              className="bg-transparent text-black dark:text-white text-lg font-semibold transition-all group cta-button"
            >
              {t.cta}
              <ArrowDown className="arrow-icon" />
            </Button>
          </AnnouncementTitle>
        </Announcement>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-[2px] bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  )
}
