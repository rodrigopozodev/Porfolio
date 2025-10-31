"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Eye } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"
import { CardFlip, CardFlipFront, CardFlipBack, CardFlipContent } from "@/components/ui/card-flip"

const projectImages = [
  "/modern-ecommerce-interface.svg",
  "/analytics-dashboard.svg",
  "/mobile-social-app-interface.svg",
]

const projectTags = [
  ["Next.js", "TypeScript", "Stripe"],
  ["React", "D3.js", "Node.js"],
  ["React Native", "Firebase", "WebSocket"],
]

export function PortfolioSection() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const pauseTimerRef = useRef<number | null>(null)
  const [isInstantSwitch, setIsInstantSwitch] = useState(false)

  const t = translations[language].portfolio

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % t.projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + t.projects.length) % t.projects.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextProject()
    }
    if (isRightSwipe) {
      prevProject()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  useEffect(() => {
    if (isPaused) return
    const autoplayInterval = setInterval(() => {
      nextProject()
    }, 4000)

    return () => clearInterval(autoplayInterval)
  }, [currentIndex, isPaused])

  // Limpieza del temporizador de pausa en desmontaje
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) {
        window.clearTimeout(pauseTimerRef.current)
      }
    }
  }, [])

  const handleCardClick = (index: number) => {
    // Navegar a la tarjeta clicada
    setCurrentIndex(index)
    // Alternar pausa/reanudación del autoplay
    if (!isPaused) {
      setIsPaused(true)
      if (pauseTimerRef.current) {
        window.clearTimeout(pauseTimerRef.current)
      }
      pauseTimerRef.current = window.setTimeout(() => {
        setIsPaused(false)
        pauseTimerRef.current = null
      }, 20000)
    } else {
      // Segundo clic: reanudar inmediatamente
      setIsPaused(false)
      if (pauseTimerRef.current) {
        window.clearTimeout(pauseTimerRef.current)
        pauseTimerRef.current = null
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevProject()
      if (e.key === "ArrowRight") nextProject()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <section
      id="portfolio"
      className="snap-section flex items-center justify-center bg-secondary/30 px-2 pt-4 pb-4 md:pt-6 md:pb-6 lg:px-6 lg:py-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="mt-4 mb-3 text-center text-3xl font-bold tracking-tight text-foreground md:mt-6 md:mb-6 md:text-4xl lg:mt-8 lg:mb-8 lg:text-5xl">
          {t.title.split(" ").map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </h2>

        {/* Desktop grid */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {t.projects.map((project, index) => (
            <CardFlip key={index} className="select-none cursor-pointer">
              <CardFlipFront className="overflow-hidden">
                <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                  <img
                    src={projectImages[index] || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CardFlipFront>

              <CardFlipBack className="overflow-hidden">
                <div className="relative aspect-[3/2] bg-white dark:bg-black flex items-center justify-center">
                  <div className="max-w-[85%] text-center text-black dark:text-white">
                    <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                    <p className="mb-4 text-sm text-black/70 dark:text-white/70">{project.description}</p>
                    <div className="mb-4 flex flex-wrap justify-center gap-2">
                      {projectTags[index].map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary" className="gap-2 shadow-lg cursor-pointer">
                        <Eye className="h-4 w-4" />
                        {t.view}
                      </Button>
                      <Button size="sm" variant="secondary" className="gap-2 shadow-lg cursor-pointer">
                        <ExternalLink className="h-4 w-4" />
                        {t.visit}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardFlipBack>
            </CardFlip>
          ))}
        </div>

        {/* Mobile/Tablet carousel */}
        <div className="relative lg:hidden mt-4 md:mt-6">
          <div
            className="relative overflow-visible min-h-[78vh] sm:min-h-[82vh]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-start justify-center">
              {t.projects.map((project, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-start justify-center ${
                    isInstantSwitch ? "transition-none" : "transition-all duration-[600ms] ease-[cubic-bezier(0.445,0.05,0.55,0.95)]"
                  } ${
                    index === currentIndex
                      ? "translate-x-0 opacity-100 scale-100"
                      : index < currentIndex
                        ? "-translate-x-full opacity-0 scale-95"
                        : "translate-x-full opacity-0 scale-95"
                  }`}
                  style={{ pointerEvents: index === currentIndex ? "auto" : "none" }}
                >
                  <div className="w-full max-w-[92%] sm:max-w-[80%] px-2 sm:px-4 mx-auto cursor-pointer" onClick={() => handleCardClick(index)}>
                    <CardFlip className="select-none cursor-pointer" autoFlipBackMs={20000}
                      onFlipChange={(flipped) => {
                        // Pausar autoplay mientras está volteado
                        if (flipped) {
                          setIsPaused(true)
                          if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current)
                          pauseTimerRef.current = window.setTimeout(() => {
                            setIsPaused(false)
                            pauseTimerRef.current = null
                          }, 20000)
                        }
                      }}
                    >
                      <CardFlipFront className="overflow-hidden shadow-md">
                        <div className="relative h-[72vh] sm:h-[76vh] overflow-hidden bg-muted">
                          <img
                            src={projectImages[index] || "/placeholder.svg"}
                            alt={project.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </CardFlipFront>

                      <CardFlipBack className="overflow-hidden shadow-md">
                        <div className="relative h-[72vh] sm:h-[76vh] bg-white dark:bg-black flex items-center justify-center">
                          <div className="max-w-[90%] text-center text-black dark:text-white">
                            <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                            <p className="mb-4 text-sm text-black/70 dark:text-white/70">{project.description}</p>
                            <div className="mb-4 flex flex-wrap justify-center gap-2">
                              {projectTags[index].map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-center gap-2">
                              <Button size="sm" variant="secondary" className="gap-2 shadow-sm cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                <Eye className="h-4 w-4" />
                                {t.view}
                              </Button>
                              <Button size="sm" variant="secondary" className="gap-2 shadow-sm cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                <ExternalLink className="h-4 w-4" />
                                {t.visit}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardFlipBack>
                    </CardFlip>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicadores de puntos dentro del carrusel */}
            <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2 pointer-events-auto">
              {t.projects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Forzar salto inmediato sin animación usando doble RAF
                    setIsInstantSwitch(true)
                    setCurrentIndex(index)
                    requestAnimationFrame(() => {
                      requestAnimationFrame(() => {
                        setIsInstantSwitch(false)
                      })
                    })
                  }}
                  className={`group relative h-2 rounded-full transition-all cursor-pointer ${
                    index === currentIndex ? "w-8 bg-accent" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Ir al proyecto ${index + 1}: ${project.title}`}
                >
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-6 whitespace-nowrap rounded-md bg-foreground px-3 py-1 text-xs font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
                    {project.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
