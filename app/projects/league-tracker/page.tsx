"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { BackHomeButton } from "@/components/back-home-button"
import { BackFeaturedButton } from "@/components/back-featured-button"
import { BackAllProjectsButton } from "@/components/back-all-projects-button"
import { VisitProjectButton } from "@/components/visit-project-button"
import { HandednessToggle } from "@/components/handedness-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LeagueTrackerPage() {
  const router = useRouter()

  // Navegación superior gestionada por botones reutilizables

  return (
    <main className="relative min-h-screen w-full bg-background text-foreground overflow-y-auto">
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <BackHomeButton />
        <BackFeaturedButton />
        <BackAllProjectsButton />
        <VisitProjectButton href="https://lol-tracker-beta.vercel.app" />
        <HandednessToggle />
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <section className="container mx-auto px-6 py-16 md:py-20 lg:py-24">
        <div className="relative mb-8 flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">League tracker</h1>
        </div>

        {/* Resumen destacado */}
        <div className="mb-10 rounded-xl border border-foreground/15 bg-muted/40 p-6">
          <h2 className="mb-3 text-2xl font-semibold">Resumen</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              League Tracker es una aplicación web hecha con Next.js que ayuda a jugadores de
              League of Legends a consultar y comparar perfiles, ver rangos Solo/Q y Flex, y
              revisar datos básicos del invocador de forma rápida y clara.
            </li>
            <li>
              Integra las APIs oficiales de Riot para obtener información en tiempo real y usa
              Supabase para autenticación y gestión de usuarios.
            </li>
          </ul>
        </div>

        {/* Características Clave */}
        <div className="mb-10">
          <h2 className="mb-3 text-xl font-semibold">Características Clave</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              Búsqueda pública por Riot ID (GameName#TAG) con resolución de región y fallback
              inteligente entre clústeres.
            </li>
            <li>
              Lectura de rangos y estado competitivo: tier, división, LP, winrate y estado
              Unranked cuando aplica.
            </li>
            <li>
              Multi‑search para comparar varios jugadores en una sola vista, con tarjetas de
              perfil y resúmenes compactos.
            </li>
            <li>
              Cuenta y sesión: login/registro, verificación de email y soporte para verificación
              telefónica; sesión manejada con cookie y endpoint /api/auth/session.
            </li>
            <li>
              Contenido editorial propio en Home y Multi‑search para guiar al usuario y cumplir
              con políticas de AdSense.
            </li>
            <li>
              Integración de Google AdSense limitada únicamente a Home y Multi‑Search para evitar
              anuncios en pantallas sin contenido del editor.
            </li>
          </ul>
        </div>

        {/* Páginas principales */}
        <div className="mb-10">
          <h2 className="mb-3 text-xl font-semibold">Páginas Principales</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              Home (app/(routes)/home/page.tsx): buscador público, tarjeta del usuario si hay
              sesión y artículo editorial (HomeArticle) con guía de uso, privacidad y consejos
              Solo/Q.
            </li>
            <li>
              Multi‑Search (app/(routes)/multi-search/page.tsx): formulario para múltiples Riot ID,
              tarjetas comparables y artículo editorial (MultiSearchArticle).
            </li>
            <li>
              Dashboard (app/(routes)/dashboard/page.tsx): vista de perfil más detallada usando
              datos de Riot (rango, nivel, icono, etc.).
            </li>
            <li>
              Auth (app/(routes)/auth/*): páginas de inicio de sesión, registro y verificación; el
              flujo de login redirige a /home.
            </li>
            <li>
              Policies (app/policies/*): privacidad y términos con noindex para que no interfieran
              en la revisión y el SEO.
            </li>
          </ul>
        </div>

        {/* Arquitectura y tecnologías */}
        <div className="mb-10">
          <h2 className="mb-3 text-xl font-semibold">Arquitectura y Tecnologías</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Frontend: Next.js 15, React 19, TailwindCSS.</li>
            <li>
              Datos: APIs de Riot (cuenta, summoner y ligas por PUUID), con estrategias de fallback
              entre clústeres (euw1, na1, kr, etc.) para mayor fiabilidad.
            </li>
            <li>
              Autenticación y estado: Supabase para usuarios; sesión vía cookie y endpoints en
              app/api/auth/*.
            </li>
            <li>
              UI: componentes de navegación y fondos animados, con mejoras para evitar flicker de
              estado y distinguir claramente los iconos de Login/Logout.
            </li>
          </ul>
        </div>

        {/* Privacidad y cumplimiento */}
        <div className="mb-10">
          <h2 className="mb-3 text-xl font-semibold">Privacidad y Cumplimiento</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              Sin sesión: las búsquedas no se almacenan; se consultan en el momento y se descartan
              al cerrar la página.
            </li>
            <li>
              Con sesión: el perfil se gestiona mediante Supabase; el usuario puede refrescar sus
              datos manualmente.
            </li>
            <li>
              AdSense: el script solo se carga en Home y Multi‑Search; layout global incluye la
              meta google-adsense-account pero no inyecta anuncios.
            </li>
            <li>
              robots.txt: deshabilita indexación de rutas dinámicas clave y permite about y
              ads.txt.
            </li>
            <li>Páginas genéricas (privacidad y términos) marcadas con noindex.</li>
          </ul>
        </div>

        {/* Estado actual y ajustes recientes */}
        <div className="mb-10">
          <h2 className="mb-3 text-xl font-semibold">Estado Actual y Ajustes Recientes</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              Navbar: se evita el parpadeo del estado de autenticación usando un estado inicial
              (authedInitial) y se ha cambiado el icono de Login para diferenciarlo del Logout.
            </li>
            <li>
              Login: el CTA y la redirección post‑login apuntan a /home para un flujo más claro.
            </li>
            <li>
              AdSense: verificado que el script solo se carga en Home y Multi‑Search; artículos
              editoriales superan 300–500 palabras y no contienen enlaces rotos.
            </li>
          </ul>
        </div>

        {/* CTA externo opcional */}
        <div className="mt-6">
          {/** Botón de visitar movido al nav superior **/}
        </div>
      </section>
    </main>
  )
}