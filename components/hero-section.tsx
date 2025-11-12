"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, ExternalLink, Eye, Github, Linkedin, Mail, Download } from "lucide-react"
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
        <div className="hidden min-[700px]:block hero-column min-[700px]:border-2 min-[700px]:border-blue-400 p-4 pb-0 h-full pt-8 flex flex-col">
          <TestimonialsSection />
        </div>
        <div key={renderKey} className="relative hero-column z-10 mx-auto max-w-none xl:max-w-5xl px-4 min-[700px]:px-6 text-center min-[700px]:border-2 min-[700px]:border-blue-400 h-full pt-8">
        <div className="origin-top min-[700px]:scale-[0.90] min-[900px]:scale-[0.90] lg:scale-[0.95] xl:scale-100 2xl:scale-100">
          <CardFlip className="hidden min-[700px]:block mx-auto cursor-pointer" autoFlipBackMs={60000}>
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
                  try {
                    const event = new CustomEvent("routeSweep", {
                      detail: {
                        type: "slide",
                        direction: "top",
                        className: "bg-neutral-900 dark:bg-white",
                        transitionDuration: 0.6,
                      },
                    })
                    window.dispatchEvent(event)
                  } catch {}
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

        {/* Conecta conmigo */}
        <div className="mt-2 flex flex-col items-center gap-3">
          <h3 className="text-foreground font-bold text-[clamp(1.1rem,2.4vw,1.35rem)]">{translations[language].contact.connect}</h3>
          <div className="flex items-center justify-center gap-3">
            <a href="https://github.com/rodrigopozodev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Button variant="secondary" className="h-12 w-12 rounded-full p-0 bg-transparent text-foreground border border-foreground/20 hover:border-blue-500 hover:text-blue-500 cursor-pointer">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/rodrigopozosanchez/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Button variant="secondary" className="h-12 w-12 rounded-full p-0 bg-transparent text-foreground border border-foreground/20 hover:border-blue-500 hover:text-blue-500 cursor-pointer">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=rodrigopozosanchez@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <Button variant="secondary" className="h-12 w-12 rounded-full p-0 bg-transparent text-foreground border border-foreground/20 hover:border-blue-500 hover:text-blue-500 cursor-pointer">
                <Mail className="h-5 w-5" />
              </Button>
            </a>
          </div>
          <a href="/CV_Rodrigo_Pozo_Sánchez.pdf" download className="pointer-events-auto" aria-label={translations[language].contact.download}>
            <Button size="lg" variant="secondary" className="rounded-full gap-2 bg-transparent text-foreground border border-foreground/20 hover:bg-blue-500 hover:text-white hover:border-blue-500 cursor-pointer">
              <Download className="h-5 w-5" />
              {translations[language].contact.download}
            </Button>
          </a>
        </div>
        </div>
        </div>
        {/* Columna 3: Proyecto Destacado */}
        <div className="hidden min-[700px]:block hero-column min-[700px]:border-2 min-[700px]:border-blue-400 h-full pt-8">
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
                    <div className="relative h-[55vh] min-[900px]:h-[60vh] lg:h-[66vh] xl:h-[70vh] overflow-hidden bg-muted cursor-pointer">
                      <img src={imgSrc} alt={featured.title} className="h-full w-full object-cover cursor-pointer" />
                    </div>
                  </CardFlipFront>

                  <CardFlipBack className="overflow-hidden shadow-md">
                    <div className="relative h-[55vh] min-[900px]:h-[60vh] lg:h-[66vh] xl:h-[70vh] bg-white dark:bg-black flex items-center justify-center">
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
                            if (slug) router.push(`/projects/${slug}`)
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
    </section>
  )
}
