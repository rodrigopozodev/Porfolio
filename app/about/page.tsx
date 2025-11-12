"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { HandednessToggle } from "@/components/handedness-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { translateText } from "@/lib/translate"
import { BackHomeButton } from "@/components/back-home-button"

export default function AboutPage() {
  const { language } = useLanguage()
  const baseEs = translations.es.about
  const tEnAbout = translations.en.about
  const [aboutData, setAboutData] = useState<any>(translations[language].about ?? baseEs)
  const router = useRouter()

  useEffect(() => {
    const run = async () => {
      if (language === "es") {
        setAboutData(baseEs)
        return
      }
      // Si ya tenemos traducción fija en en, usarla sin llamar a servicio
      if (language === "en" && tEnAbout) {
        setAboutData(tEnAbout)
        return
      }
      // Intentar leer de cache
      try {
        const cached = localStorage.getItem("about_en_cache_v1")
        if (cached) {
          setAboutData(JSON.parse(cached))
          return
        }
      } catch {}

      // Traducir al inglés desde español
      const labels = {
        intro: await translateText(baseEs.labels?.intro ?? "Sobre mí", "es", "en"),
        education: await translateText(baseEs.labels?.education ?? "Formación", "es", "en"),
        experience: await translateText(baseEs.labels?.experience ?? "Experiencia", "es", "en"),
        skills: await translateText(baseEs.labels?.skills ?? "Competencias y tecnologías", "es", "en"),
        frontend: await translateText(baseEs.labels?.frontend ?? "Frontend", "es", "en"),
        backend: await translateText(baseEs.labels?.backend ?? "Backend", "es", "en"),
        tools: await translateText(baseEs.labels?.tools ?? "Herramientas", "es", "en"),
        databases: await translateText(baseEs.labels?.databases ?? "Bases de datos", "es", "en"),
        methodologies: await translateText(baseEs.labels?.methodologies ?? "Metodologías", "es", "en"),
      }

      const introParagraphs = await Promise.all(
        (baseEs.introParagraphs ?? []).map((p: string) => translateText(p, "es", "en"))
      )

      const education = await Promise.all(
        (baseEs.education ?? []).map(async (e: any) => ({
          title: await translateText(e.title, "es", "en"),
          description: await translateText(e.description, "es", "en"),
        }))
      )

      const experience = await Promise.all(
        (baseEs.experience ?? []).map(async (ex: any) => ({
          role: await translateText(ex.role, "es", "en"),
          period: await translateText(ex.period, "es", "en"),
          details: await Promise.all((ex.details ?? []).map((d: string) => translateText(d, "es", "en"))),
        }))
      )

      const skills = {
        frontend: await Promise.all((baseEs.skills?.frontend ?? []).map((s: string) => translateText(s, "es", "en"))),
        backend: await Promise.all((baseEs.skills?.backend ?? []).map((s: string) => translateText(s, "es", "en"))),
        tools: await Promise.all((baseEs.skills?.tools ?? []).map((s: string) => translateText(s, "es", "en"))),
        databases: await Promise.all((baseEs.skills?.databases ?? []).map((s: string) => translateText(s, "es", "en"))),
        methodologies: await Promise.all((baseEs.skills?.methodologies ?? []).map((s: string) => translateText(s, "es", "en"))),
      }

      const translated = {
        title: await translateText(baseEs.title ?? "Sobre mí", "es", "en"),
        labels,
        introParagraphs,
        education,
        experience,
        skills,
      }
      setAboutData(translated)
      try { localStorage.setItem("about_en_cache_v1", JSON.stringify(translated)) } catch {}
    }
    run()
  }, [language])

  return (
    <main className="relative min-h-screen w-full bg-background text-foreground">
      <section className="container mx-auto px-6 py-20 min-[900px]:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl min-[900px]:text-5xl font-bold mb-6">
            {aboutData?.title}
          </h1>

          {/* 👋 Intro */}
          <div className="space-y-4 mb-10">
            <h2 className="text-2xl font-semibold">👋 {aboutData?.labels?.intro}</h2>
            {aboutData?.introParagraphs?.map((p: string, idx: number) => (
              <p key={idx} className="text-lg min-[900px]:text-xl text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* 🎓 Educación */}
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

          {/* 💻 Experiencia */}
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

          {/* ⚙️ Competencias y tecnologías */}
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

          {/* Eliminado botón inferior; el acceso estará en el nav superior */}
        </motion.div>
      </section>

      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <BackHomeButton />
        <HandednessToggle />
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </main>
  )
}