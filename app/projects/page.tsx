"use client"

import React from "react"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/i18n/translations"
import { Button } from "@/components/ui/button"
import { Eye, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { HandednessToggle } from "@/components/ui/handedness-toggle"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { HamburgerMenu } from "@/components/ui/hamburger-menu"
import { MobileNavDrawer } from "@/components/ui/mobile-nav-drawer"
import { BackHomeButton } from "@/components/ui/back-home-button"
import { BackFeaturedButton } from "@/components/ui/back-featured-button"
import { useHandedness } from "@/lib/context/handedness-context"
import { CardFlip, CardFlipFront, CardFlipBack } from "@/components/ui/card-flip"

const projectImages = [
  "/League Tracker.png",
  "/ZapasPro.png",
]

const imageBySlug: Record<string, string> = {
  "league-tracker": "/League Tracker.png",
  "zapaspro": "/ZapasPro.png",
}

const imageByTitle: Record<string, string> = {
  "League tracker": "/League Tracker.png",
  "League Tracker": "/League Tracker.png",
  "ZapasPro": "/ZapasPro.png",
}

const projectTags = [
  [],
  [],
]

export default function ProjectsPage() {
  const { language } = useLanguage()
  const t = translations[language].portfolio
  const router = useRouter()
  const { handedness } = useHandedness()

  const getProjectImage = (project: any, indexFallback: number) => {
    const slug = (project?.slug ?? "").toString()
    const title = (project?.title ?? "").toString()
    if (slug && imageBySlug[slug]) return imageBySlug[slug]
    if (title && imageByTitle[title]) return imageByTitle[title]
    return projectImages[indexFallback % projectImages.length]
  }

  const renderBackContent = (project: any) => {
    const slug = (project as any)?.slug
    if (slug === "league-tracker") {
      return (
        <>
          {language === "en" ? (
            <p className="mb-4 text-sm leading-snug text-black/80 dark:text-white/80 text-left max-[900px]:block min-[900px]:hidden max-[900px]:max-w-[95%]">
              Lookup and compare LoL profiles by Riot ID in real time. View Solo/Duo and Flex ranks, LP and activity summary. Multi‑Search to compare multiple profiles. Editorial content guides users. Privacy‑first, searches without session aren’t stored. Built with Next.js, Riot APIs and Supabase. Official account, summoner and league data. Controlled AdSense only on Home and Multi‑Search; profile management when signed in.
            </p>
          ) : (
            <p className="mb-4 text-sm leading-snug text-black/80 dark:text-white/80 text-left max-[900px]:block min-[900px]:hidden max-[900px]:max-w-[95%]">
              Consulta y compara perfiles de LoL por Riot ID en tiempo real. Visualiza rangos Solo/Duo y Flex, LP y resumen de actividad. Multi‑Search para comparar varios perfiles. Contenido editorial que guía al usuario. Privacidad primero, sin sesión no se guardan búsquedas. Hecho con Next.js, APIs de Riot y Supabase. Datos oficiales de cuenta, summoner y ligas. AdSense limitado a Home y Multi‑Search; gestión de perfil con sesión iniciada.
            </p>
          )}
          {language === "en" ? (
            <div className="mb-4 text-sm text-black/80 dark:text-white/80 space-y-2 text-left max-[900px]:hidden min-[900px]:block">
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
            <div className="mb-4 text-sm text-black/80 dark:text-white/80 space-y-2 text-left max-[900px]:hidden min-[900px]:block">
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
          )}
        </>
      )
    }
    if (slug === "zapaspro") {
      return (
        <>
          {language === "en" ? (
            <p className="mb-4 text-sm leading-snug text-black/80 dark:text-white/80 text-left max-[900px]:block min-[900px]:hidden max-[900px]:max-w-[95%]">
              Sneaker e‑commerce with rich catalog and detailed product pages. Filters by brand, category, size and price; search and sorting. Cart and favorites with responsive UI. Admin pages for catalog and inventory. Combined filters for fast browsing. Clean SPA with REST API backend. Built with Angular, Express and SQLite.
            </p>
          ) : (
            <p className="mb-4 text-sm leading-snug text-black/80 dark:text-white/80 text-left max-[900px]:block min-[900px]:hidden max-[900px]:max-w-[95%]">
              Tienda online de zapatillas con catálogo y fichas detalladas. Filtros por marca, categoría, talla y precio; búsqueda y ordenación. Carrito y favoritos con UI responsive. Páginas de administración para catálogo e inventario. Filtros combinados y navegación rápida. SPA limpia con backend REST. Hecho con Angular, Express y SQLite.
            </p>
          )}
          {language === "en" ? (
            <div className="mb-4 text-sm text-black/80 dark:text-white/80 space-y-2 text-left max-[900px]:hidden min-[900px]:block">
              <p className="font-semibold">Offered Service</p>
              <ul className="list-none space-y-1">
                <li>Sneaker e‑commerce with catalog and detailed product pages.</li>
                <li>Advanced filters by brand, category, size, and price range.</li>
                <li>Cart and favorites management with a clean, responsive UI.</li>
              </ul>
              <p className="font-semibold">Functionality</p>
              <ul className="list-none space-y-1">
                <li>Product listing with sorting, search, and filter combinations.</li>
                <li>Add/remove items to cart and manage favorites.</li>
                <li>Dedicated admin pages for catalog and inventory management.</li>
              </ul>
            </div>
          ) : (
            <div className="mb-4 text-sm text-black/80 dark:text-white/80 space-y-2 text-left max-[900px]:hidden min-[900px]:block">
              <p className="font-semibold">Servicio Que Se Ofrece</p>
              <ul className="list-none space-y-1">
                <li>Tienda online de zapatillas con catálogo y fichas detalladas de productos.</li>
                <li>Filtros avanzados por marca, categoría, talla y rango de precio.</li>
                <li>Gestión de carrito y favoritos con una UI limpia y responsive.</li>
              </ul>
              <p className="font-semibold">Funcionalidad</p>
              <ul className="list-none space-y-1">
                <li>Listado de productos con ordenación, búsqueda y combinación de filtros.</li>
                <li>Añadir/quitar artículos del carrito y gestionar favoritos.</li>
                <li>Páginas de administración para gestionar catálogo e inventario.</li>
              </ul>
            </div>
          )}
        </>
      )
    }
    return <p className="mb-4 text-sm text-black/80 dark:text-white/80">{project.description}</p>
  }

  return (
    <main className="relative min-h-mobile safe-area-pad w-full bg-background text-foreground overflow-y-auto">
      <section className="container mx-auto px-6 py-16 md:py-20 lg:py-24">
        <div>
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">{t.allTitle}</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.projects.map((project, index) => (
              <CardFlip key={index}>
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
                  <div className="relative h-55-mobile min-[900px]:h-60-mobile lg:h-66-mobile xl:h-70-mobile bg-white dark:bg-black flex items-center justify-center cursor-pointer max-[900px]:items-start max-[900px]:justify-start max-[900px]:px-4 max-[900px]:pt-2">
                    <div className="max-w-[90%] text-center max-[900px]:text-left text-black dark:text-white select-text">
                      <h3 className="mb-2 text-xl font-semibold max-[900px]:text-center">{project.title}</h3>
                      {renderBackContent(project)}
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
                        onClick={() => {
                          const project = t.projects[index]
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
                      <Button
                        size="sm"
                        variant="secondary"
                        className="gap-2 shadow-sm cursor-pointer transition-colors hover:bg-blue-500 hover:text-white hover:border-blue-500"
                        onClick={() => {
                          const project = t.projects[index]
                          const slug = (project as any)?.slug
                          if (slug === "league-tracker") {
                            window.open("https://lol-tracker-beta.vercel.app", "_blank", "noopener,noreferrer")
                          } else if (slug === "zapaspro") {
                            window.open("https://zapaspro.netlify.app/", "_blank", "noopener,noreferrer")
                          }
                        }}
                      >
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
        </div>
      </section>

      <div className={`fixed z-50 flex items-center gap-3 ${handedness === "right" ? "right-6" : "left-6"}`} style={{ top: "calc(env(safe-area-inset-top, 0px) + 1.5rem)" }}>
        {handedness === "right" ? (
          <>
            <span className="hidden min-[900px]:inline-flex gap-3">
              <BackHomeButton animationType="fade" />
              <BackFeaturedButton />
            </span>
            <HandednessToggle />
            <LanguageToggle />
            <ThemeToggle />
            <HamburgerMenu />
          </>
        ) : (
          <>
            <HamburgerMenu />
            <ThemeToggle />
            <LanguageToggle />
            <HandednessToggle />
            <span className="hidden min-[900px]:inline-flex gap-3">
              <BackFeaturedButton />
              <BackHomeButton animationType="fade" />
            </span>
          </>
        )}
      </div>
      <MobileNavDrawer>
        <div className="flex flex-col gap-3">
          <BackHomeButton animationType="fade" showLabelOnMobile />
          <BackFeaturedButton showLabelOnMobile />
        </div>
      </MobileNavDrawer>
    </main>
  )
}
