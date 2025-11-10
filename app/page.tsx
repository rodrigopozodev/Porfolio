"use client"

import React from "react"
import { HeroSection } from "@/components/hero-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { PageNavigation } from "@/components/page-navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { HandednessToggle } from "@/components/handedness-toggle"
import { motion } from "framer-motion"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const section = params.get("section")
      if (section === "portfolio" || section === "2") {
        const el = document.getElementById("portfolio")
        if (el) {
          // Desplazar inmediatamente a la sección 2 (Proyectos Destacados)
          el.scrollIntoView({ behavior: "auto", block: "start" })
        }
      }
    } catch {}
  }, [])
  return (
    <motion.main
      className="snap-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <HeroSection />
      <PortfolioSection />
      <PageNavigation />
      <div className="fixed top-6 left-6 z-50">
        <HandednessToggle />
      </div>
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </motion.main>
  )
}
