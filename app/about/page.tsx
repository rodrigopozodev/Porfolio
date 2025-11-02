"use client"

import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { HandednessToggle } from "@/components/handedness-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const { language } = useLanguage()
  const tHero = translations[language].hero
  const router = useRouter()

  return (
    <main className="relative min-h-screen w-full bg-background text-foreground">
      <section className="container mx-auto px-6 py-20 md:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {tHero.aboutTitle}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line mb-8">
            {tHero.aboutText}
          </p>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => router.push("/")}>Volver al inicio</Button>
          </div>
        </motion.div>
      </section>

      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <HandednessToggle />
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </main>
  )
}