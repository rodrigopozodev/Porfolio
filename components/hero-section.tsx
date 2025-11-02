"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import React, { useEffect, useState } from "react"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"
import Typeanimation from "@/components/ui/typeanimation"
import { Announcement, AnnouncementTitle } from "@/components/ui/announcement"
import Image from "next/image"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CardFlip, CardFlipFront, CardFlipBack } from "@/components/ui/card-flip"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const { language } = useLanguage()
  const [renderKey, setRenderKey] = useState(0)
  const router = useRouter()

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
      className="snap-section hero-responsive relative flex items-center justify-center bg-background"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />

      <div className="hero-container w-full max-w-screen-2xl mx-auto px-4 min-[700px]:px-6 grid grid-cols-1 min-[700px]:grid-cols-3 items-stretch min-[700px]:gap-4 lg:gap-6 pt-8 min-[700px]:pt-12 min-h-[60vh] min-[700px]:min-h-[65vh]">
        <div className="hidden min-[700px]:block hero-column min-[700px]:border-2 min-[700px]:border-blue-400 p-4 h-full pt-8">
          <TestimonialsSection />
        </div>
        <div key={renderKey} className="relative hero-column z-10 mx-auto max-w-none xl:max-w-5xl px-4 min-[700px]:px-6 text-center min-[700px]:border-2 min-[700px]:border-blue-400 h-full pt-8">
        <div className="origin-top min-[700px]:scale-[0.90] min-[900px]:scale-[0.90] lg:scale-[0.95] xl:scale-100 2xl:scale-100">
          <CardFlip className="hidden min-[700px]:block mx-auto cursor-pointer" autoFlipBackMs={20000}>
          <CardFlipFront className="bg-transparent border-none shadow-none p-0">
            <Image
              src="/Rodrigo.png"
              alt="Foto de Rodrigo Pozo Sánchez"
              width={200}
              height={200}
              className="hidden min-[700px]:block hero-image mx-auto rounded-full shadow-lg xl:mb-14 2xl:mb-16 min-[700px]:scale-[0.80] min-[900px]:scale-[0.9] lg:scale-[0.85] xl:scale-[1.35] 2xl:scale-[1.5] object-cover cursor-pointer"
              priority
            />
          </CardFlipFront>
          <CardFlipBack className="bg-transparent border-none shadow-none p-0">
            <div className="relative w-[200px] h-[200px] mx-auto flex flex-col items-center justify-center text-center px-4 xl:mb-14 2xl:mb-16 min-[700px]:scale-[0.80] min-[900px]:scale-[0.9] lg:scale-[0.85] xl:scale-[1.35] 2xl:scale-[1.5] min-[700px]:max-[800px]:translate-x-[-8px] min-[700px]:max-[760px]:translate-x-[-12px] min-[700px]:max-[750px]:translate-x-[-14px] min-[700px]:max-[740px]:translate-x-[-16px] min-[700px]:max-[730px]:translate-x-[-18px] min-[700px]:max-[720px]:translate-x-[-20px] min-[700px]:max-[710px]:translate-x-[-22px] translate-y-[10%] xl:translate-y-6 2xl:translate-y-8">
              <h3 className="text-foreground font-semibold mb-1 text-[1.25rem] xl:text-base 2xl:text-base">{t.aboutTitle}</h3>
              <p className="text-foreground leading-snug text-base xl:text-sm 2xl:text-sm max-w-[90%] mx-auto">
                {t.aboutText.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < t.aboutText.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="mt-3 font-semibold text-base px-4 py-2 shadow-sm cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500"
                aria-label={t.aboutCta}
                onClick={(e) => {
                  e.stopPropagation()
                  router.push("/about")
                }}
              >
                {t.aboutCta}
              </Button>
            </div>
          </CardFlipBack>
        </CardFlip>


        {/* Nombre */}
        {(() => {
          const parts = t.name.split(" ")
          const last = parts.pop()
          const first = parts.join(" ")
          return (
            <h1 className="hero-title mb-6 font-sans font-bold tracking-tight text-foreground text-[2.36rem] min-[700px]:text-[2.36rem] min-[900px]:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl lg:leading-tight">
              <span>{first} </span>
              <span className="block xl:inline">{last}</span>
            </h1>
          )
        })()}

        {/* Tagline */}
        <p className="mb-4 text-pretty text-xl text-muted-foreground min-[700px]:text-xl lg:text-xl xl:text-2xl">
          {t.tagline}
        </p>

        {/* Palabras animadas con color azul sólido */}
        <div className="mb-8 lg:mb-4">
          <Typeanimation
            key={language}
            words={t.animatedWords}
            typingSpeed="slow"
            deletingSpeed="slow"
            pauseDuration={1500}
            className="hero-type text-blue-500 text-2xl min-[900px]:text-2xl lg:text-2xl xl:text-3xl font-extrabold"
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
        </div>
        <div className="hidden min-[700px]:block hero-column min-[700px]:border-2 min-[700px]:border-blue-400 h-full pt-8" />
      </div>

      {/* Indicador de scroll eliminado */}
    </section>
  )
}
