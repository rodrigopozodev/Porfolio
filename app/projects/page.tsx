"use client"

import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, ExternalLink, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { HandednessToggle } from "@/components/handedness-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"

const projectImages = [
  "/League Tracker.png",
  "/analytics-dashboard.svg",
  "/mobile-social-app-interface.svg",
]

export default function ProjectsPage() {
  const { language } = useLanguage()
  const t = translations[language].portfolio
  const router = useRouter()

  return (
    <main className="relative min-h-screen w-full bg-background text-foreground overflow-y-auto">
      <section className="container mx-auto px-6 py-16 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mb-6">
            <Button
              size="sm"
              variant="secondary"
              className="absolute left-0 top-1/2 -translate-y-1/2 gap-2 shadow-sm cursor-pointer transition-colors hover:bg-blue-500 hover:text-white hover:border-blue-500"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">{t.allTitle}</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.projects.map((project, index) => (
              <Card key={index} className="overflow-hidden shadow-md cursor-pointer">
                <div className="relative h-56 md:h-60 lg:h-64 bg-muted cursor-pointer">
                  <img
                    src={projectImages[index % projectImages.length] || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover cursor-pointer"
                  />
                </div>
                <div className="p-4 cursor-pointer">
                  <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
                  { (project as any).slug === "league-tracker" ? (
                    <div className="mb-4 text-sm text-foreground/80 space-y-2 text-left">
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
                    <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                  )}
                  <div className="flex items-center justify-start gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="gap-2 shadow-sm cursor-pointer transition-colors hover:bg-blue-500 hover:text-white hover:border-blue-500"
                  onClick={() => {
                    const project = t.projects[index]
                    if (project && (project as any).slug) {
                      router.push(`/projects/${(project as any).slug}`)
                    }
                  }}
                >
                  <Eye className="h-4 w-4" />
                  {t.view}
                </Button>
                    <Button size="sm" variant="secondary" className="gap-2 shadow-sm cursor-pointer transition-colors hover:bg-blue-500 hover:text-white hover:border-blue-500" onClick={() => {
                      const project = t.projects[index]
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
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="fixed top-6 left-6 z-50">
        <HandednessToggle />
      </div>
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </main>
  )
}