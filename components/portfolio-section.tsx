"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Eye } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"
import { CardFlip, CardFlipFront, CardFlipBack, CardFlipContent } from "@/components/ui/card-flip"
import { useHandedness } from "@/lib/handedness-context"

const projectImages = [
  "/League Tracker.png",
  "/analytics-dashboard.svg",
  "/mobile-social-app-interface.svg",
]

// Imagen fija del proyecto destacado y asignación por slug/título
const imageBySlug: Record<string, string> = {
  "league-tracker": "/League Tracker.png",
  "analytics-dashboard": "/analytics-dashboard.svg",
  "social-mobile-app": "/mobile-social-app-interface.svg",
}

const imageByTitle: Record<string, string> = {
  "Dashboard Analytics": "/analytics-dashboard.svg",
  "Analytics Dashboard": "/analytics-dashboard.svg",
  "App Móvil Social": "/mobile-social-app-interface.svg",
  "Social Mobile App": "/mobile-social-app-interface.svg",
  "League tracker": "/League Tracker.png",
  "League Tracker": "/League Tracker.png",
}

const projectTags = [
  [],
  ["React", "D3.js", "Node.js"],
  ["React Native", "Firebase", "WebSocket"],
]

export function PortfolioSection() {
  const { language } = useLanguage()
  const { handedness } = useHandedness()
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const pauseTimerRef = useRef<number | null>(null)
  const [isInstantSwitch, setIsInstantSwitch] = useState(false)
  const [shouldCarousel, setShouldCarousel] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  const t = translations[language].portfolio

  // Lista de proyectos según traducción (misma estructura en ambos idiomas)
  const projects = t.projects

  const getProjectImage = (project: any, indexFallback: number) => {
    const slug = (project?.slug ?? "").toString()
    const title = (project?.title ?? "").toString()
    if (slug && imageBySlug[slug]) return imageBySlug[slug]
    if (title && imageByTitle[title]) return imageByTitle[title]
    return projectImages[indexFallback % projectImages.length]
  }

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
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
  }, [currentIndex, isPaused, projects.length])

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

  // Decidir si usar carrusel según el ancho disponible: si caben ≥4 tarjetas, usamos grid.
  useEffect(() => {
    const recalc = () => {
      const el = containerRef.current
      if (!el) return
      const viewportWidth = window.innerWidth
      // Forzar grid en pantallas grandes (>= lg 1024px)
      if (viewportWidth >= 1024) {
        setShouldCarousel(false)
        return
      }
      const width = el.clientWidth
      const cardMinWidth = 320 // ancho mínimo estimado por tarjeta
      const fitCount = Math.floor(width / cardMinWidth)
      setShouldCarousel(fitCount < 4)
    }
    recalc()
    window.addEventListener("resize", recalc)
    return () => window.removeEventListener("resize", recalc)
  }, [])

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="sweep-page snap-section flex items-center justify-center bg-secondary/30 px-2 pt-4 pb-2 min-[900px]:pt-6 min-[900px]:pb-4 lg:px-6 lg:pt-12 lg:pb-8"
    >
      <div
        ref={containerRef}
        className={`mx-auto w-full max-w-7xl ${handedness === "right" ? "pr-2 min-[900px]:pr-3 lg:pr-3 xl:pr-4" : "pl-2 min-[900px]:pl-3 lg:pl-3 xl:pl-4"}`}
      >
        <h2 className="mt-4 mb-3 text-center text-3xl font-bold tracking-tight text-foreground min-[900px]:mt-6 min-[900px]:mb-6 min-[900px]:text-4xl lg:mt-2 lg:mb-4 lg:text-5xl xl:mt-1 xl:mb-2 lg:-translate-y-3 xl:-translate-y-5 2xl:-translate-y-6">
          {(() => {
            const parts = t.title.split(" ")
            const first = parts.shift() || ""
            const rest = parts.join(" ")
            return (
              <>
                <span>{first} </span>
                <span className="max-[550px]:block">{rest}</span>
              </>
            )
          })()}
        </h2>

        {/* Botón para ir a la página de todos los proyectos */}
        <div className="mb-4 flex justify-center">
          <Button
            size="sm"
            variant="secondary"
            className="gap-2 shadow-sm cursor-pointer transition-colors hover:bg-blue-500 hover:text-white hover:border-blue-500"
            onClick={() => {
              // Disparar overlay global Sweep To Right
              try {
                window.dispatchEvent(
                  new CustomEvent("routeSweep", {
                    detail: { direction: "right", type: "slide", className: "bg-accent", transitionDuration: 0.6 },
                  })
                )
              } catch {}
              // Esperar a que termine la animación antes de navegar
              const navigate = () => router.push("/projects")
              window.addEventListener("routeSweepFinished", navigate, { once: true })
              window.setTimeout(() => {
                try { window.removeEventListener("routeSweepFinished", navigate as EventListener) } catch {}
                navigate()
              }, 800)
            }}
          >
            Todos Los Proyectos
          </Button>
        </div>

        {/* Grid con diseño móvil aplicado (solo si caben ≥4 por fila) */}
        {!shouldCarousel && (
          <div className="mt-2 min-[900px]:mt-4 lg:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <CardFlip key={index} className="select-none cursor-pointer" autoFlipBackMs={60000}>
                <CardFlipFront className="overflow-hidden shadow-md">
                  <div className="relative h-[55vh] min-[900px]:h-[60vh] lg:h-[66vh] xl:h-[70vh] overflow-hidden bg-muted cursor-pointer">
                    <img
                      src={getProjectImage(project, index) || "/placeholder.svg"}
                      alt={project.title}
                      className="h-full w-full object-cover cursor-pointer"
                    />
                  </div>
                </CardFlipFront>

                <CardFlipBack className="overflow-hidden shadow-md">
                  <div className="relative h-[55vh] min-[900px]:h-[60vh] lg:h-[66vh] xl:h-[70vh] bg-white dark:bg-black flex items-center justify-center">
                    <div className="max-w-[90%] text-center text-black dark:text-white select-text">
                      <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                      { (project as any).slug === "league-tracker" ? (
                        language === "en" ? (
                          <div className="mb-4 text-sm text-black/80 dark:text-white/80 space-y-2 text-left mx-auto max-w-[600px]">
                            <p className="font-semibold">Offered Service</p>
                            <ul className="list-none space-y-1">
                              <li>Lookup and compare LoL profiles by Riot ID in real time.</li>
                              <li>View Solo/Duo and Flex ranks, LP, and activity summary.</li>
                              <li>Privacy‑focused experience: without session searches aren’t stored; with session the profile is managed.</li>
                              <li>Helpful editorial content in Home and Multi‑Search to guide users.</li>
                              <li>AdSense limited to Home and Multi‑Search only.</li>
                            </ul>
                            <p className="font-semibold">Tech Stack</p>
                            <ul className="list-none space-y-1">
                              <li>Next.js, React, TypeScript, and TailwindCSS.</li>
                              <li>Official Riot APIs for account, summoner, and league data.</li>
                              <li>Supabase for authentication and user management.</li>
                              <li>Controlled integration of Google AdSense.</li>
                            </ul>
                            <p className="font-semibold">Functionality</p>
                            <ul className="list-none space-y-1">
                              <li>Public summoner search and manual data refresh when needed.</li>
                              <li>Multi‑Search to compare multiple profiles in one view.</li>
                              <li>Profile view with summoner and league information.</li>
                            </ul>
                          </div>
                        ) : (
                          <div className="mb-4 text-sm text-black/80 dark:text-white/80 space-y-2 text-left mx-auto max-w-[600px]">
                            <p className="font-semibold">Servicio Que Se Ofrece</p>
                            <ul className="list-none space-y-1">
                              <li>Consulta y comparación de perfiles de LoL por Riot ID en tiempo real.</li>
                              <li>Visualización de rangos Solo/Duo y Flex, LP y resumen de actividad.</li>
                              <li>Experiencia centrada en privacidad: sin sesión no se guardan búsquedas; con sesión se gestiona el perfil.</li>
                              <li>Contenido editorial útil en Home y Multi‑Search para orientar al usuario.</li>
                              <li>Anuncios de AdSense limitados a Home y Multi‑Search.</li>
                            </ul>
                            <p className="font-semibold">Tecnologías</p>
                            <ul className="list-none space-y-1">
                              <li>Next.js, React, TypeScript y TailwindCSS.</li>
                              <li>APIs oficiales de Riot para datos de cuenta, summoner y ligas.</li>
                              <li>Supabase para autenticación y administración de usuarios.</li>
                              <li>Integración controlada de Google AdSense.</li>
                            </ul>
                            <p className="font-semibold">Funcionalidad</p>
                            <ul className="list-none space-y-1">
                              <li>Búsqueda pública de invocadores y refresco de datos cuando sea necesario.</li>
                              <li>Multi‑Search para comparar varios perfiles en una sola vista.</li>
                              <li>Vista de perfil con información de summoner y ligas.</li>
                            </ul>
                          </div>
                        )
                      ) : (
                        <p className="mb-4 text-sm text-black/70 dark:text-white/70">{project.description}</p>
                      )}
                      {(projectTags[index] ?? []).length > 0 && (
                        <div className="mb-4 flex flex-wrap justify-center gap-2">
                          {(projectTags[index] ?? []).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="gap-2 shadow-sm cursor-pointer transition-colors hover:bg-blue-500 hover:text-white hover:border-blue-500"
                          onClick={(e) => {
                            e.stopPropagation()
                            const project = projects[index]
                            if (project && (project as any).slug) {
                              try {
                                window.dispatchEvent(
                                  new CustomEvent("routeSweep", {
                                    detail: { type: "fade", className: "bg-neutral-900 dark:bg-white", transitionDuration: 0.6 },
                                  })
                                )
                              } catch {}
                              const navigate = () => router.push(`/projects/${(project as any).slug}`)
                              window.addEventListener("routeSweepFinished", navigate, { once: true })
                              window.setTimeout(() => {
                                try { window.removeEventListener("routeSweepFinished", navigate as EventListener) } catch {}
                                navigate()
                              }, 800)
                            }
                          }}
                        >
                          <Eye className="h-4 w-4" />
                          {t.view}
                        </Button>
                        <Button size="sm" variant="secondary" className="gap-2 shadow-sm cursor-pointer transition-colors hover:bg-blue-500 hover:text-white hover:border-blue-500" onClick={(e) => {
                          e.stopPropagation()
                          const project = projects[index]
                          const slug = (project as any)?.slug
                          if (slug === "league-tracker") {
                            window.open("https://lol-tracker-beta.vercel.app", "_blank", "noopener,noreferrer")
                          }
                        }}>
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
        )}

        {/* Carrusel móvil/tablet (solo si NO caben ≥4 por fila) */}
        {shouldCarousel && (
        <div className="relative mt-6 min-[900px]:mt-8 lg:mt-10">
          <div
            className="relative overflow-visible min-h-[74vh] sm:min-h-[78vh] lg:min-h-[78vh] xl:min-h-[80vh] pb-8 sm:pb-10 min-[900px]:pb-12 lg:pb-10"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-start justify-center">
              {projects.map((project, index) => (
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
                    <CardFlip className="select-none cursor-pointer" autoFlipBackMs={60000}
                      onFlipChange={(flipped) => {
                        // Pausar autoplay mientras está volteado
                        if (flipped) {
                          setIsPaused(true)
                          if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current)
                          pauseTimerRef.current = window.setTimeout(() => {
                            setIsPaused(false)
                            pauseTimerRef.current = null
                          }, 60000)
                        }
                      }}
                    >
                      <CardFlipFront className="overflow-hidden shadow-md">
                        <div className="relative h-[66vh] sm:h-[70vh] lg:h-[74vh] xl:h-[76vh] overflow-hidden bg-muted cursor-pointer">
                          <img
                            src={getProjectImage(project, index) || "/placeholder.svg"}
                            alt={project.title}
                            className="h-full w-full object-cover cursor-pointer"
                          />
                        </div>
                      </CardFlipFront>

                      <CardFlipBack className="overflow-hidden shadow-md">
                        <div className="relative h-[66vh] sm:h-[70vh] lg:h-[74vh] xl:h-[76vh] bg-white dark:bg-black flex items-center justify-center">
                          <div className="max-w-[90%] text-center text-black dark:text-white select-text">
                            <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                            { (project as any).slug === "league-tracker" ? (
                              language === "en" ? (
                                <div className="mb-4 text-sm text-black/80 dark:text-white/80 space-y-2 text-left mx-auto max-w-[600px]">
                                  <p className="font-semibold">Offered Service</p>
                                  <ul className="list-none space-y-1">
                                    <li>Lookup and compare LoL profiles by Riot ID in real time.</li>
                                    <li>View Solo/Duo and Flex ranks, LP, and activity summary.</li>
                                    <li>Privacy‑focused experience: without session searches aren’t stored; with session the profile is managed.</li>
                                    <li>Helpful editorial content in Home and Multi‑Search to guide users.</li>
                                    <li>AdSense limited to Home and Multi‑Search only.</li>
                                  </ul>
                                  <p className="font-semibold">Tech Stack</p>
                                  <ul className="list-none space-y-1">
                                    <li>Next.js, React, TypeScript, and TailwindCSS.</li>
                                    <li>Official Riot APIs for account, summoner, and league data.</li>
                                    <li>Supabase for authentication and user management.</li>
                                    <li>Controlled integration of Google AdSense.</li>
                                  </ul>
                                  <p className="font-semibold">Functionality</p>
                                  <ul className="list-none space-y-1">
                                    <li>Public summoner search and manual data refresh when needed.</li>
                                    <li>Multi‑Search to compare multiple profiles in one view.</li>
                                    <li>Profile view with summoner and league information.</li>
                                  </ul>
                                </div>
                              ) : (
                                <div className="mb-4 text-sm text-black/80 dark:text-white/80 space-y-2 text-left mx-auto max-w-[600px]">
                                  <p className="font-semibold">Servicio Que Se Ofrece</p>
                                  <ul className="list-none space-y-1">
                                    <li>Consulta y comparación de perfiles de LoL por Riot ID en tiempo real.</li>
                                    <li>Visualización de rangos Solo/Duo y Flex, LP y resumen de actividad.</li>
                                    <li>Experiencia centrada en privacidad: sin sesión no se guardan búsquedas; con sesión se gestiona el perfil.</li>
                                    <li>Contenido editorial útil en Home y Multi‑Search para orientar al usuario.</li>
                                    <li>Anuncios de AdSense limitados a Home y Multi‑Search.</li>
                                  </ul>
                                  <p className="font-semibold">Tecnologías</p>
                                  <ul className="list-none space-y-1">
                                    <li>Next.js, React, TypeScript y TailwindCSS.</li>
                                    <li>APIs oficiales de Riot para datos de cuenta, summoner y ligas.</li>
                                    <li>Supabase para autenticación y administración de usuarios.</li>
                                    <li>Integración controlada de Google AdSense.</li>
                                  </ul>
                                  <p className="font-semibold">Funcionalidad</p>
                                  <ul className="list-none space-y-1">
                                    <li>Búsqueda pública de invocadores y refresco de datos cuando sea necesario.</li>
                                    <li>Multi‑Search para comparar varios perfiles en una sola vista.</li>
                                    <li>Vista de perfil con información de summoner y ligas.</li>
                                  </ul>
                                </div>
                              )
                            ) : (
                              <p className="mb-4 text-sm text-black/70 dark:text-white/70">{project.description}</p>
                            )}
                            {(projectTags[index] ?? []).length > 0 && (
                              <div className="mb-4 flex flex-wrap justify-center gap-2">
                                {(projectTags[index] ?? []).map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="gap-2 shadow-sm cursor-pointer transition-colors hover:bg-blue-500 hover:text-white hover:border-blue-500"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  const project = projects[index]
                                  if (project && (project as any).slug) {
                                    try {
                                      window.dispatchEvent(
                                        new CustomEvent("routeSweep", {
                                          detail: { type: "fade", className: "bg-neutral-900 dark:bg-white", transitionDuration: 0.6 },
                                        })
                                      )
                                    } catch {}
                                    const navigate = () => router.push(`/projects/${(project as any).slug}`)
                                    window.addEventListener("routeSweepFinished", navigate, { once: true })
                                    window.setTimeout(() => {
                                      try { window.removeEventListener("routeSweepFinished", navigate as EventListener) } catch {}
                                      navigate()
                                    }, 800)
                                  }
                                }}
                              >
                                <Eye className="h-4 w-4" />
                                {t.view}
                              </Button>
                              <Button size="sm" variant="secondary" className="gap-2 shadow-sm cursor-pointer transition-colors hover:bg-blue-500 hover:text-white hover:border-blue-500" onClick={(e) => {
                                e.stopPropagation()
                                const project = projects[index]
                                const slug = (project as any)?.slug
                                if (slug === "league-tracker") {
                                  window.open("https://lol-tracker-beta.vercel.app", "_blank", "noopener,noreferrer")
                                }
                              }}>
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
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-0 right-0 z-20 flex justify-center gap-2 pointer-events-auto">
              {projects.map((project, index) => (
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
        )}
      </div>
    </section>
  )
}
