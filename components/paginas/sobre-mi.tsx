"use client"
// Página "Sobre mí" (contenido único dentro de componentes/paginas)
// Mantiene todo el contenido aquí; no existe ruta propia en app/
// Si se enlaza a "/sobre-mi" desde otra vista, ese enlace no funcionará.

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/i18n/translations"
import { HandednessToggle } from "@/components/ui/handedness-toggle"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { HamburgerMenu } from "@/components/ui/hamburger-menu"
import { useRouter } from "next/navigation"
import { BackHomeButton } from "@/components/ui/back-home-button"
import { useHandedness } from "@/lib/context/handedness-context"

export default function SobreMi() {
  // Idioma actual y diccionario base
  const { language } = useLanguage()
  const baseEs = translations.es.about
  const tEnAbout = translations.en.about
  // Estado con los textos de la sección
  const [aboutData, setAboutData] = useState<any>(translations[language].about ?? baseEs)
  const router = useRouter()
  const { handedness } = useHandedness()

  useEffect(() => {
    // Resolver textos según idioma con cache simple en localStorage
    const run = async () => {
      if (language === "es") {
        setAboutData(baseEs)
        return
      }
      if (language === "en" && tEnAbout) {
        setAboutData(tEnAbout)
        return
      }
      try {
        const cached = localStorage.getItem("about_en_cache_v1")
        if (cached) {
          setAboutData(JSON.parse(cached))
          return
        }
      } catch {}

      const fallback = baseEs
      setAboutData(fallback)
      try { localStorage.setItem("about_en_cache_v1", JSON.stringify(fallback)) } catch {}
    }
    run()
  }, [language])

  return (
    <main className="relative min-h-mobile safe-area-pad w-full bg-background text-foreground">
      <section className="container mx-auto px-6 py-20 min-[900px]:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          {/* Encabezado */}
          <h1 className="text-4xl min-[900px]:text-5xl font-bold mb-6">
            {aboutData?.title}
          </h1>

          {/* Intro */}
          <div className="space-y-4 mb-10">
            <h2 className="text-2xl font-semibold">👋 {aboutData?.labels?.intro}</h2>
            {aboutData?.introParagraphs?.map((p: string, idx: number) => (
              <p key={idx} className="text-lg min-[900px]:text-xl text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Educación */}
          <div className="space-y-4 mb-10">
            <h2 className="text-2xl font-semibold">🎓 {aboutData?.labels?.education}</h2>
            <ul className="space-y-6">
              {aboutData?.education?.map((edu: { title: string; description: string }, idx: number) => (
                <li key={idx} className="">
                  <p className="font-medium text-lg">{edu.title}</p>
                  <p className="text-muted-foreground">{edu.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiencia */}
          <div className="space-y-4 mb-10">
            <h2 className="text-2xl font-semibold">💻 {aboutData?.labels?.experience}</h2>
            <ul className="space-y-6">
              {aboutData?.experience?.map((exp: { role: string; period: string; details: string[] }, idx: number) => (
                <li key={idx}>
                  <p className="font-medium text-lg">{exp.role} <span className="text-muted-foreground">— {exp.period}</span></p>
                  <ul className="list-disc ml-6 text-muted-foreground">
                    {exp.details.map((d: string, i: number) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {/* Habilidades y tecnologías */}
          <div className="space-y-4 mb-10">
            <h2 className="text-2xl font-semibold">⚙️ {aboutData?.labels?.skills}</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <p className="font-medium">{aboutData?.labels?.frontend ?? "Frontend"}</p>
                <p className="text-muted-foreground">{aboutData?.skills?.frontend?.join(", ")}</p>
              </div>
              <div>
                <p className="font-medium">{aboutData?.labels?.backend ?? "Backend"}</p>
                <p className="text-muted-foreground">{aboutData?.skills?.backend?.join(", ")}</p>
              </div>
              <div>
                <p className="font-medium">{aboutData?.labels?.tools ?? "Herramientas"}</p>
                <p className="text-muted-foreground">{aboutData?.skills?.tools?.join(", ")}</p>
              </div>
              <div>
                <p className="font-medium">{aboutData?.labels?.databases ?? "Bases de datos"}</p>
                <p className="text-muted-foreground">{aboutData?.skills?.databases?.join(", ")}</p>
              </div>
              <div>
                <p className="font-medium">{aboutData?.labels?.methodologies ?? "Metodologías"}</p>
                <p className="text-muted-foreground">{aboutData?.skills?.methodologies?.join(", ")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Controles flotantes según lateralidad */}
      <div className={`fixed z-50 flex items-center gap-3 ${handedness === "right" ? "right-6" : "left-6"}`} style={{ top: "calc(env(safe-area-inset-top, 0px) + 1.5rem)" }}>
        {handedness === "right" ? (
          <>
            <span className="hidden min-[900px]:inline-flex"><BackHomeButton /></span>
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
            <span className="hidden min-[900px]:inline-flex"><BackHomeButton /></span>
          </>
        )}
      </div>
    </main>
  )
}