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
import { HamburgerMenu } from "@/components/hamburger-menu"
import { MobileNavDrawer } from "@/components/mobile-nav-drawer"
import { useHandedness } from "@/lib/handedness-context"
import { useLanguage } from "@/lib/language-context"

export default function LeagueTrackerPage() {
  const router = useRouter()
  const { handedness } = useHandedness()
  const { language } = useLanguage()

  // Navegación superior gestionada por botones reutilizables

  return (
    <main className="relative min-h-mobile safe-area-pad w-full bg-background text-foreground overflow-y-auto">
      <div className={`fixed top-6 z-50 flex items-center gap-3 ${handedness === "right" ? "right-6" : "left-6"}`}>
        {handedness === "right" ? (
          <>
            <span className="hidden min-[900px]:inline-flex gap-3">
              <BackHomeButton animationType="fade" />
              <BackFeaturedButton />
              <BackAllProjectsButton />
              <VisitProjectButton href="https://lol-tracker-beta.vercel.app" />
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
              <VisitProjectButton href="https://lol-tracker-beta.vercel.app" />
              <BackAllProjectsButton />
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
          <BackAllProjectsButton showLabelOnMobile />
          <VisitProjectButton href="https://lol-tracker-beta.vercel.app" showLabelOnMobile />
        </div>
      </MobileNavDrawer>

      <section className="container mx-auto px-6 py-16 md:py-20 lg:py-24">
        <div className="relative mb-8 flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">League Tracker</h1>
        </div>

        {language === "en" ? (
          <>
            <div className="mb-10 rounded-xl border border-foreground/15 bg-muted/40 p-6">
              <h2 className="mb-3 text-2xl font-semibold">Overview</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  League Tracker is a Next.js web app that helps League of Legends players look up and compare profiles,
                  view Solo/Duo and Flex ranks, and quickly review basic summoner data.
                </li>
                <li>
                  It integrates Riot’s official APIs for real‑time information and uses Supabase for authentication and
                  user management.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Key Features</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Public search by Riot ID (GameName#TAG) with region resolution and smart fallback across clusters.
                </li>
                <li>
                  Competitive status: tier, division, LP, winrate, and Unranked state when applicable.
                </li>
                <li>
                  Multi‑search to compare several players in one view with compact profile cards and summaries.
                </li>
                <li>
                  Account and session: login/register, email verification and optional phone verification; session managed
                  with cookie and `/api/auth/session`.
                </li>
                <li>
                  Editorial content in Home and Multi‑Search to guide users and comply with AdSense policies.
                </li>
                <li>
                  Google AdSense limited to Home and Multi‑Search to avoid ads on non‑editorial screens.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Main Pages</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Home: public search, user card when session exists, and editorial article with usage guide, privacy and
                  Solo/Duo tips.
                </li>
                <li>
                  Multi‑Search: form for multiple Riot IDs, comparable cards, and editorial article.
                </li>
                <li>
                  Dashboard: more detailed profile view using Riot data (rank, level, icon, etc.).
                </li>
                <li>
                  Auth: sign‑in, sign‑up and verification pages; post‑login redirects to `/home`.
                </li>
                <li>
                  Policies: privacy and terms with `noindex` to avoid interference with review and SEO.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Architecture & Tech</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Frontend: Next.js 15, React 19, TailwindCSS.</li>
                <li>
                  Data: Riot APIs (account, summoner, leagues by PUUID) with cluster fallback strategies (euw1, na1, kr,
                  etc.) for reliability.
                </li>
                <li>
                  Auth & state: Supabase for users; session via cookie and endpoints under `app/api/auth/*`.
                </li>
                <li>
                  UI: navigation components and animated backgrounds, improvements to avoid auth‑state flicker and clearer
                  Login/Logout icons.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Privacy & Compliance</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  No session: searches aren’t stored; they’re fetched on demand and discarded when leaving the page.
                </li>
                <li>
                  With session: the profile is managed via Supabase; users can refresh their data manually.
                </li>
                <li>
                  AdSense: the script loads only on Home and Multi‑Search; the global layout includes the
                  `google-adsense-account` meta but doesn’t inject ads elsewhere.
                </li>
                <li>
                  `robots.txt`: disables indexing of key dynamic routes and allows `about` and `ads.txt`.
                </li>
                <li>Generic privacy and terms pages are marked `noindex`.</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Current Status & Recent Updates</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Navbar: avoids auth‑state flicker using an initial state and the Login icon was changed to distinguish it
                  from Logout.
                </li>
                <li>
                  Login: CTA and post‑login redirect point to `/home` for a clearer flow.
                </li>
                <li>
                  AdSense: verified the script only loads on Home and Multi‑Search; editorial articles exceed 300–500 words
                  and avoid broken links.
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="mb-10 rounded-xl border border-foreground/15 bg-muted/40 p-6">
              <h2 className="mb-3 text-2xl font-semibold">Resumen</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  League Tracker es una aplicación web hecha con Next.js que ayuda a jugadores de League of Legends a
                  consultar y comparar perfiles, ver rangos Solo/Duo y Flex, y revisar datos básicos del invocador de forma
                  rápida y clara.
                </li>
                <li>
                  Integra las APIs oficiales de Riot para obtener información en tiempo real y usa Supabase para
                  autenticación y gestión de usuarios.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Características Clave</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Búsqueda pública por Riot ID (GameName#TAG) con resolución de región y fallback inteligente entre
                  clústeres.
                </li>
                <li>
                  Lectura de rangos y estado competitivo: tier, división, LP, winrate y estado Unranked cuando aplica.
                </li>
                <li>
                  Multi‑search para comparar varios jugadores en una sola vista, con tarjetas de perfil y resúmenes
                  compactos.
                </li>
                <li>
                  Cuenta y sesión: login/registro, verificación de email y soporte para verificación telefónica; sesión
                  manejada con cookie y endpoint `/api/auth/session`.
                </li>
                <li>
                  Contenido editorial propio en Home y Multi‑Search para guiar al usuario y cumplir con políticas de
                  AdSense.
                </li>
                <li>
                  Integración de Google AdSense limitada únicamente a Home y Multi‑Search para evitar anuncios en pantallas
                  sin contenido del editor.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Páginas Principales</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Home: buscador público, tarjeta del usuario si hay sesión y artículo editorial con guía de uso, privacidad
                  y consejos Solo/Duo.
                </li>
                <li>
                  Multi‑Search: formulario para múltiples Riot ID, tarjetas comparables y artículo editorial.
                </li>
                <li>
                  Dashboard: vista de perfil más detallada usando datos de Riot (rango, nivel, icono, etc.).
                </li>
                <li>
                  Auth: páginas de inicio de sesión, registro y verificación; el flujo de login redirige a `/home`.
                </li>
                <li>
                  Policies: privacidad y términos con `noindex` para que no interfieran en la revisión y el SEO.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Arquitectura y Tecnologías</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Frontend: Next.js 15, React 19, TailwindCSS.</li>
                <li>
                  Datos: APIs de Riot (cuenta, summoner y ligas por PUUID), con estrategias de fallback entre clústeres
                  (euw1, na1, kr, etc.) para mayor fiabilidad.
                </li>
                <li>
                  Autenticación y estado: Supabase para usuarios; sesión vía cookie y endpoints en `app/api/auth/*`.
                </li>
                <li>
                  UI: componentes de navegación y fondos animados, mejoras para evitar flicker de estado y distinguir
                  claramente los iconos de Login/Logout.
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Privacidad y Cumplimiento</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Sin sesión: las búsquedas no se almacenan; se consultan en el momento y se descartan al cerrar la página.
                </li>
                <li>
                  Con sesión: el perfil se gestiona mediante Supabase; el usuario puede refrescar sus datos manualmente.
                </li>
                <li>
                  AdSense: el script solo se carga en Home y Multi‑Search; el layout global incluye la meta
                  `google-adsense-account` pero no inyecta anuncios.
                </li>
                <li>
                  `robots.txt`: deshabilita indexación de rutas dinámicas clave y permite `about` y `ads.txt`.
                </li>
                <li>Páginas genéricas (privacidad y términos) marcadas con `noindex`.</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Estado Actual y Ajustes Recientes</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Navbar: se evita el parpadeo del estado de autenticación usando un estado inicial y se cambió el icono de
                  Login para diferenciarlo del Logout.
                </li>
                <li>
                  Login: el CTA y la redirección post‑login apuntan a `/home` para un flujo más claro.
                </li>
                <li>
                  AdSense: verificado que el script solo se carga en Home y Multi‑Search; los artículos editoriales superan
                  300–500 palabras y evitan enlaces rotos.
                </li>
              </ul>
            </div>
          </>
        )}

        <div className="mt-6" />
      </section>
    </main>
  )
}