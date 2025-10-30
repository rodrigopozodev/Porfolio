"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Eye } from "lucide-react"
import { useState, useEffect } from "react"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

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
    const autoplayInterval = setInterval(() => {
      nextProject()
    }, 4000)

    return () => clearInterval(autoplayInterval)
  }, [currentIndex])

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
      className="snap-section flex items-center justify-center bg-secondary/30 px-4 py-12 md:py-16 lg:px-6 lg:py-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground md:mb-8 md:text-4xl lg:mb-12 lg:text-5xl">
          {t.title}
        </h2>

        {/* Desktop grid */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {t.projects.map((project, index) => (
            <Card key={index} className="group overflow-hidden transition-all hover:scale-[1.03] hover:shadow-lg">
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={projectImages[index] || "/placeholder.svg"}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="sm" variant="secondary" className="gap-2 shadow-lg">
                    <Eye className="h-4 w-4" />
                    {t.view}
                  </Button>
                  <Button size="sm" variant="secondary" className="gap-2 shadow-lg">
                    <ExternalLink className="h-4 w-4" />
                    {t.visit}
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">{project.title}</h3>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {projectTags[index].map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile/Tablet carousel */}
        <div className="relative lg:hidden">
          <div
            className="relative min-h-[420px] overflow-hidden md:min-h-[400px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex h-full items-center justify-center">
              {t.projects.map((project, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.445,0.05,0.55,0.95)] ${
                    index === currentIndex
                      ? "translate-x-0 opacity-100 scale-100"
                      : index < currentIndex
                        ? "-translate-x-full opacity-0 scale-95"
                        : "translate-x-full opacity-0 scale-95"
                  }`}
                  style={{ pointerEvents: index === currentIndex ? "auto" : "none" }}
                >
                  <div className="w-[90%] max-w-md md:w-[80%] md:max-w-lg">
                    <Card className="overflow-hidden shadow-md">
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        <img
                          src={projectImages[index] || "/placeholder.svg"}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary" className="gap-2 shadow-sm">
                            <Eye className="h-4 w-4" />
                            {t.view}
                          </Button>
                          <Button size="sm" variant="secondary" className="gap-2 shadow-sm">
                            <ExternalLink className="h-4 w-4" />
                            {t.visit}
                          </Button>
                        </div>
                      </div>

                      <CardContent className="p-4 md:p-6">
                        <h3 className="mb-2 text-xl font-semibold text-card-foreground">{project.title}</h3>
                        <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {projectTags[index].map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores de puntos */}
          <div className="mt-6 flex justify-center gap-2">
            {t.projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-accent" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir al proyecto ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
