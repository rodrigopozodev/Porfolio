"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { useState, useEffect } from "react"
import { translations, type Language } from "@/lib/translations"
import Typeanimation from "@/components/ui/typeanimation"

export function HeroSection() {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const savedLanguage = (localStorage.getItem("language") as Language) || "es"
    setLanguage(savedLanguage)

    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent
      setLanguage(customEvent.detail)
    }

    window.addEventListener("languageChange", handleLanguageChange)
    return () => window.removeEventListener("languageChange", handleLanguageChange)
  }, [])

  const t = translations[language].hero

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

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
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
            words={t.animatedWords}
            typingSpeed="slow"
            deletingSpeed="slow"
            pauseDuration={1500}
            className="text-blue-500 text-2xl md:text-3xl font-extrabold"
          />
        </div>

        {/* Botón debajo de las palabras animadas */}
        <Button
          size="lg"
          onClick={scrollToPortfolio}
          className="group gap-2 rounded-full px-8 py-6 text-base font-medium shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          {t.cta}
          <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
        </Button>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-[2px] bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  )
}
