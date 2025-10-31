"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import React, { useEffect, useState } from "react"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"
import Typeanimation from "@/components/ui/typeanimation"
import { Announcement, AnnouncementTitle } from "@/components/ui/announcement"
import Image from "next/image"
import { CardFlip, CardFlipFront, CardFlipBack } from "@/components/ui/card-flip"

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

      <div key={renderKey} className="relative z-10 mx-auto max-w-5xl px-6 text-center sm:-mt-2 lg:-mt-6 xl:-mt-8 2xl:-mt-10 origin-top sm:scale-[0.90] md:scale-[0.90] lg:scale-[0.95] xl:scale-100 2xl:scale-100">
        <CardFlip className="hidden sm:block mx-auto cursor-pointer" autoFlipBackMs={20000}>
          <CardFlipFront className="bg-transparent border-none shadow-none p-0">
            <Image
              src="/Rodrigo.png"
              alt="Foto de Rodrigo Pozo Sánchez"
              width={200}
              height={200}
              className="hidden sm:block mx-auto rounded-full shadow-lg xl:mb-14 2xl:mb-16 sm:scale-[0.80] md:scale-[0.9] lg:scale-[0.85] xl:scale-[1.35] 2xl:scale-[1.5] object-cover"
              priority
            />
          </CardFlipFront>
          <CardFlipBack className="bg-transparent border-none shadow-none p-0">
            <div className="relative w-[200px] h-[200px] mx-auto flex flex-col items-center justify-center text-center px-4 xl:mb-14 2xl:mb-16 sm:scale-[0.80] md:scale-[0.9] lg:scale-[0.85] xl:scale-[1.35] 2xl:scale-[1.5] translate-y-[10%] xl:translate-y-6 2xl:translate-y-8">
              <h3 className="text-foreground font-semibold mb-1 text-[1.45rem] xl:text-base 2xl:text-base">{t.aboutTitle}</h3>
              <p className="text-foreground leading-normal text-[1.25rem] xl:text-sm 2xl:text-sm">
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
                  e.stopPropagation();
                  // Reutiliza el CTA para bajar al portfolio
                  const el = document.getElementById("portfolio");
                  el?.scrollIntoView({ behavior: "smooth" });
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
            <h1 className="mb-6 font-sans font-bold tracking-tight text-foreground text-[2.36rem] sm:text-[2.36rem] md:text-5xl lg:text-5xl xl:text-8xl 2xl:text-8xl lg:leading-tight">
              <span>{first} </span>
              <span className="block xl:inline">{last}</span>
            </h1>
          )
        })()}

        {/* Tagline */}
        <p className="mb-4 text-pretty text-xl text-muted-foreground md:text-xl lg:text-xl xl:text-2xl">
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
            className="text-blue-500 text-2xl md:text-2xl lg:text-2xl xl:text-3xl font-extrabold"
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
