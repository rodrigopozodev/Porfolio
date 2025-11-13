"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowUpLeft, ArrowUpRight, ExternalLink, Eye, Github, Linkedin, Mail, Download } from "lucide-react"
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

      <div className="hero-container w-full max-w-screen-2xl mx-auto px-4 min-[700px]:px-6 grid grid-cols-1 min-[1367px]:grid-cols-3 items-stretch min-[700px]:gap-4 lg:gap-6 pt-8 min-[700px]:pt-12 min-h-60-mobile min-[700px]:min-h-65-mobile">
        <div className="hidden min-[1367px]:block hero-column p-4 pb-0 h-full pt-8 flex flex-col">
          <TestimonialsSection />
        </div>
        <div key={renderKey} className="relative hero-column z-10 mx-auto max-w-none xl:max-w-5xl px-4 min-[700px]:px-6 text-center h-full pt-8">
        {/* Foto y flip en móvil */}
        <div className="relative block min-[700px]:hidden w-full flex flex-col items-center justify-center mt-6 mb-4">
          <CardFlip className="cursor-pointer" autoFlipBackMs={60000}>
            <CardFlipFront className="bg-transparent border-none shadow-none p-0">
            <Image
              src="/Rodrigo.png"
              alt="Foto de Rodrigo Pozo Sánchez"
              width={140}
              height={140}
              className="mx-auto rounded-full shadow-lg object-cover cursor-pointer"
              priority
            />
            </CardFlipFront>
          <CardFlipBack className="bg-transparent border-none shadow-none p-0">
            <div className="relative w-[140px] h-[140px] mx-auto flex flex-col items-center text-center px-4 overflow-visible pt-2">
              <h3 className="text-foreground font-semibold mb-2 text-base">{t.aboutTitle}</h3>
              {(() => {
                const raw = t.aboutText || ""
                const L = 5
                const words = raw.replace(/\s+/g, " ").trim().split(" ").filter(Boolean)
                const lines: string[] = []
                if (words.length === 0) {
                  for (let i = 0; i < L; i++) lines.push("")
                } else {
                  const base = Math.floor(words.length / L)
                  const remainder = words.length % L
                  let offset = 0
                  for (let i = 0; i < L; i++) {
                    const size = base + (i < remainder ? 1 : 0)
                    const end = Math.min(offset + size, words.length)
                    const segment = words.slice(offset, end).join(" ")
                    lines.push(segment)
                    offset = end
                  }
                  while (lines.length < L) lines.push("")
                  if (lines.length > L) lines.splice(L)
                }
                return (
                  <p className="text-foreground leading-snug text-sm text-center mx-[10px] whitespace-nowrap">
                    {lines.map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < L - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                )
              })()}
              <Button
                size="sm"
                variant="secondary"
                className="mt-3 font-semibold px-3 py-1 shadow-sm cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500"
                aria-label={t.aboutCta}
                onClick={(e) => {
                  e.stopPropagation()
                  try {
                    const detail = {
                      type: "slide",
                      direction: "top",
                      className: "bg-neutral-900 dark:bg-white",
                      transitionDuration: 0.6,
                    }
                    sessionStorage.setItem("postSweep", JSON.stringify(detail))
                  } catch {}
                  router.push("/about")
                }}
              >
                {t.aboutCta}
              </Button>
            </div>
          </CardFlipBack>
        </CardFlip>
        {/* Flechas de pista en primer nivel (no alteran el resto) */}
        <span className="pointer-events-none absolute top-2 left-2">
          <ArrowDownRight className="pointer-arrow arrow-hint-tl text-black dark:text-white" />
        </span>
        <span className="pointer-events-none absolute top-2 right-2">
          <ArrowDownLeft className="pointer-arrow arrow-hint-tr text-black dark:text-white" />
        </span>
        <span className="pointer-events-none absolute bottom-2 left-2">
          <ArrowUpRight className="pointer-arrow arrow-hint-bl text-black dark:text-white" />
        </span>
        <span className="pointer-events-none absolute bottom-2 right-2">
          <ArrowUpLeft className="pointer-arrow arrow-hint-br text-black dark:text-white" />
        </span>
        </div>
        <div className="origin-top min-[700px]:scale-[0.90] min-[900px]:scale-[0.90] min-[768px]:max-[1023px]:scale-[1.12] min-[1024px]:max-[1366px]:scale-[1.5] xl:scale-100 2xl:scale-100">
          <div className="relative w-fit mx-auto min-[768px]:max-[1023px]:-mt-14 min-[1024px]:max-[1366px]:-mt-24">
          <CardFlip className="hidden min-[700px]:block mx-auto cursor-pointer" autoFlipBackMs={60000}>
          <CardFlipFront className="bg-transparent border-none shadow-none p-0">
            <Image
              src="/Rodrigo.png"
              alt="Foto de Rodrigo Pozo Sánchez"
              width={200}
              height={200}
              className="hidden min-[700px]:block hero-image mx-auto rounded-full shadow-lg xl:mb-14 2xl:mb-16 min-[700px]:scale-[0.80] min-[900px]:scale-[0.9] min-[768px]:max-[1023px]:scale-[1.12] min-[1024px]:max-[1366px]:scale-[1.05] xl:scale-[1.35] 2xl:scale-[1.5] object-cover cursor-pointer"
              priority
            />
          </CardFlipFront>
          <CardFlipBack className="bg-transparent border-none shadow-none p-0">
            <div className="relative w-[200px] h-[200px] mx-auto flex flex-col items-center justify-center text-center px-4 xl:mb-14 2xl:mb-16 min-[700px]:scale-[0.80] min-[900px]:scale-[0.9] min-[768px]:max-[1023px]:scale-[1.12] min-[1024px]:max-[1366px]:scale-[1.05] xl:scale-[1.35] 2xl:scale-[1.5] min-[700px]:max-[800px]:translate-x-[-8px] min-[700px]:max-[760px]:translate-x-[-12px] min-[700px]:max-[750px]:translate-x-[-14px] min-[700px]:max-[740px]:translate-x-[-16px] min-[700px]:max-[730px]:translate-x-[-18px] min-[700px]:max-[720px]:translate-x-[-20px] min-[700px]:max-[710px]:translate-x-[-22px] translate-y-[10%] xl:translate-y-6 2xl:translate-y-8">
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
                  // Navegar inmediatamente y pedir animación post-navegación
                  try {
                    const detail = {
                      type: "slide",
                      direction: "top",
                      className: "bg-neutral-900 dark:bg-white",
                      transitionDuration: 0.6,
                    }
                    sessionStorage.setItem("postSweep", JSON.stringify(detail))
                  } catch {}
                  router.push("/about")
                }}
              >
                {t.aboutCta}
              </Button>
            </div>
          </CardFlipBack>
        </CardFlip>
        <span className="hidden min-[768px]:max-[1023px]:block min-[1024px]:max-[1366px]:block pointer-events-none absolute -top-6 -left-6 z-20">
          <ArrowDownRight className="pointer-arrow arrow-hint-tl text-black dark:text-white" />
        </span>
        <span className="hidden min-[768px]:max-[1023px]:block min-[1024px]:max-[1366px]:block pointer-events-none absolute -top-6 -right-6 z-20">
          <ArrowDownLeft className="pointer-arrow arrow-hint-tr text-black dark:text-white" />
        </span>
        <span className="hidden min-[768px]:max-[1023px]:block min-[1024px]:max-[1366px]:block pointer-events-none absolute -bottom-6 -left-6 z-20">
          <ArrowUpRight className="pointer-arrow arrow-hint-bl text-black dark:text-white" />
        </span>
        <span className="hidden min-[768px]:max-[1023px]:block min-[1024px]:max-[1366px]:block pointer-events-none absolute -bottom-6 -right-6 z-20">
          <ArrowUpLeft className="pointer-arrow arrow-hint-br text-black dark:text-white" />
        </span>
          </div>


        {/* Nombre */}
        {(() => {
          const parts = t.name.split(" ")
          const last = parts.pop()
          const first = parts.join(" ")
          return (
            <h1 className="hero-title mb-6 font-sans font-bold tracking-tight text-foreground text-[2.36rem] min-[700px]:text-[2.36rem] min-[900px]:text-5xl min-[768px]:max-[1023px]:text-[calc(2.36rem*1.12)] min-[768px]:max-[1023px]:mt-10 min-[1024px]:max-[1366px]:mt-12 lg:text-5xl xl:text-6xl 2xl:text-6xl lg:leading-tight">
              <span>{first} </span>
              <span className="block min-[768px]:max-[1023px]:inline xl:inline">{last}</span>
            </h1>
          )
        })()}

        {/* Tagline */}
        <p className="mb-4 text-pretty text-xl text-muted-foreground min-[700px]:text-xl min-[768px]:max-[1023px]:text-[1.5rem] min-[768px]:max-[1023px]:mt-4 min-[1024px]:max-[1366px]:mt-7 lg:text-xl xl:text-2xl">
          {t.tagline}
        </p>

        {/* Palabras animadas con color azul sólido */}
        <div className="mb-3 lg:mb-2 min-[768px]:max-[1023px]:mt-2">
          <Typeanimation
            key={language}
            words={t.animatedWords}
            typingSpeed="slow"
            deletingSpeed="slow"
            pauseDuration={1500}
            className="hero-type text-blue-500 text-2xl min-[900px]:text-2xl min-[768px]:max-[1023px]:text-[1.6rem] lg:text-2xl xl:text-3xl font-extrabold"
          />
        </div>

        {/* Botón debajo de las palabras animadas envuelto en Announcement */}
        <Announcement movingBorder>
          <AnnouncementTitle>
            <Button
              size="sm"
              onClick={scrollToPortfolio}
              className="bg-transparent text-black dark:text-white text-base font-semibold transition-all group cta-button min-[768px]:max-[1023px]:text-[1rem] min-[768px]:max-[1023px]:px-5 min-[768px]:max-[1023px]:py-2"
            >
              {t.cta}
              <span className="arrow-move inline-flex"><ArrowDown className="arrow-icon" /></span>
            </Button>
          </AnnouncementTitle>
        </Announcement>

        {/* Conecta conmigo */}
        <div className="mt-2 min-[768px]:max-[1023px]:mt-6 min-[1024px]:max-[1366px]:mt-2 flex flex-col items-center gap-3">
          <h3 className="text-foreground font-bold text-[clamp(1.1rem,2.4vw,1.35rem)] min-[768px]:max-[1023px]:text-[clamp(1.05rem,2.25vw,1.35rem)]">{translations[language].contact.connect}</h3>
          <div className="flex items-center justify-center gap-3">
            <a href="https://github.com/rodrigopozodev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Button variant="secondary" className="h-12 w-12 rounded-full p-0 bg-transparent text-foreground border border-foreground/20 hover:border-blue-500 hover:text-blue-500 cursor-pointer min-[768px]:max-[1023px]:h-[45px] min-[768px]:max-[1023px]:w-[45px]">
                <Github className="h-5 w-5 min-[768px]:max-[1023px]:h-[18px] min-[768px]:max-[1023px]:w-[18px] min-[1024px]:max-[1366px]:h-[22px] min-[1024px]:max-[1366px]:w-[22px]" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/rodrigopozosanchez/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Button variant="secondary" className="h-12 w-12 rounded-full p-0 bg-transparent text-foreground border border-foreground/20 hover:border-blue-500 hover:text-blue-500 cursor-pointer min-[768px]:max-[1023px]:h-[45px] min-[768px]:max-[1023px]:w-[45px]">
                <Linkedin className="h-5 w-5 min-[768px]:max-[1023px]:h-[18px] min-[768px]:max-[1023px]:w-[18px] min-[1024px]:max-[1366px]:h-[22px] min-[1024px]:max-[1366px]:w-[22px]" />
              </Button>
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=rodrigopozosanchez@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <Button variant="secondary" className="h-12 w-12 rounded-full p-0 bg-transparent text-foreground border border-foreground/20 hover:border-blue-500 hover:text-blue-500 cursor-pointer min-[768px]:max-[1023px]:h-[45px] min-[768px]:max-[1023px]:w-[45px]">
                <Mail className="h-5 w-5 min-[768px]:max-[1023px]:h-[18px] min-[768px]:max-[1023px]:w-[18px] min-[1024px]:max-[1366px]:h-[22px] min-[1024px]:max-[1366px]:w-[22px]" />
              </Button>
            </a>
          </div>
          <a href="/CV_Rodrigo_Pozo_Sánchez.pdf" download className="pointer-events-auto" aria-label={translations[language].contact.download}>
            <Button size="lg" variant="secondary" className="rounded-full gap-2 bg-transparent text-foreground border border-foreground/20 hover:bg-blue-500 hover:text-white hover:border-blue-500 cursor-pointer min-[768px]:max-[1023px]:text-[0.875rem] min-[768px]:max-[1023px]:px-4 min-[768px]:max-[1023px]:py-2">
              <Download className="h-5 w-5" />
              {translations[language].contact.download}
            </Button>
          </a>
        </div>
        
        </div>
        </div>
        {/* Columna 3: Proyecto Destacado */}
        <div className="hidden min-[1367px]:block hero-column h-full pt-8">
          {(() => {
            const tp = translations[language].portfolio
            const featured = tp.projects[0] // por ahora, cualquiera de los 3 (el primero)
            const imgByTitle: Record<string, string> = {
              "League tracker": "/League Tracker.png",
              "League Tracker": "/League Tracker.png",
              "E-commerce Platform": "/modern-ecommerce-interface.svg",
              "Dashboard Analytics": "/analytics-dashboard.svg",
              "App Móvil Social": "/mobile-social-app-interface.svg",
              "Analytics Dashboard": "/analytics-dashboard.svg",
              "Social Mobile App": "/mobile-social-app-interface.svg",
            }
            const imgSrc = imgByTitle[featured.title] || "/analytics-dashboard.svg"
            return (
              <div className="flex flex-col gap-3">
                {/* Título con EXACTOS estilos que "Recomendaciones" */}
                <div className="mb-6 text-center px-3">
                  <h3 className="font-bold bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500 bg-clip-text text-transparent whitespace-nowrap tracking-tight max-w-full text-[clamp(0.95rem,8cqw,2.3rem)]">{tp.featuredTitle}</h3>
                </div>
                {/* Tarjeta igual a las de "Proyectos Destacados" */}
                <CardFlip className="select-none cursor-pointer" autoFlipBackMs={60000}>
                  <CardFlipFront className="overflow-hidden shadow-md">
                    <div className="relative h-55-mobile min-[900px]:h-60-mobile lg:h-66-mobile xl:h-70-mobile overflow-hidden bg-muted cursor-pointer">
                      <img src={imgSrc} alt={featured.title} className="h-full w-full object-cover cursor-pointer" />
                    </div>
                  </CardFlipFront>

                  <CardFlipBack className="overflow-hidden shadow-md">
                    <div className="relative h-55-mobile min-[900px]:h-60-mobile lg:h-66-mobile xl:h-70-mobile bg-white dark:bg-black flex items-center justify-center">
                      <div className="max-w-[90%] text-center text-black dark:text-white select-text">
                        <h3 className="mb-2 text-xl font-semibold">{featured.title}</h3>
                        { (featured as any).slug === "league-tracker" ? (
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
                        ) : (
                          <p className="mb-4 text-sm text-black/70 dark:text-white/70">{featured.description}</p>
                        )}
                        <div className="flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary" className="gap-2 shadow-sm cursor-pointer transition-colors hover:bg-blue-500 hover:text-white hover:border-blue-500" onClick={() => {
                            const slug = (featured as any).slug
                            if (slug) {
                              try {
                                window.dispatchEvent(
                                  new CustomEvent("routeSweep", {
                                    detail: { type: "fade", className: "bg-neutral-900 dark:bg-white", transitionDuration: 0.6 },
                                  })
                                )
                              } catch {}
                              const navigate = () => router.push(`/projects/${slug}`)
                              window.addEventListener("routeSweepFinished", navigate, { once: true })
                              window.setTimeout(() => {
                                try { window.removeEventListener("routeSweepFinished", navigate as EventListener) } catch {}
                                navigate()
                              }, 800)
                            }
                          }}>
                            <Eye className="h-4 w-4" />
                            {translations[language].portfolio.view}
                          </Button>
                          <Button size="sm" variant="secondary" className="gap-2 shadow-sm cursor-pointer transition-colors hover:bg-blue-500 hover:text-white hover:border-blue-500" onClick={(e) => {
                            e.stopPropagation()
                            const slug = (featured as any)?.slug
                            if (slug === "league-tracker") {
                              window.open("https://lol-tracker-beta.vercel.app", "_blank", "noopener,noreferrer")
                            }
                          }}>
                            <ExternalLink className="h-4 w-4" />
                            {translations[language].portfolio.visit}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardFlipBack>
                </CardFlip>
              </div>
            )
          })()}
        </div>
      </div>

      {/* Indicador de scroll eliminado */}
      <style jsx>{`
        @keyframes arrowMoveY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        .arrow-move { animation: arrowMoveY 0.7s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
