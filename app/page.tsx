"use client"

import React from "react"
import { Inicio } from "@/components/paginas/inicio"
import { Proyectos } from "@/components/paginas/proyectos"
import { PageNavigation } from "@/components/ui/page-navigation"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { HandednessToggle } from "@/components/ui/handedness-toggle"
import { motion } from "framer-motion"
import { useHandedness } from "@/lib/context/handedness-context"
import { useEffect } from "react"

export default function Home() {
  const { handedness } = useHandedness()
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const section = params.get("section")
      if (section === "portfolio" || section === "2") {
        const el = document.getElementById("portfolio")
        if (el) {
          // Desplazar inmediatamente a la sección 2 (Proyectos Destacados)
          el.scrollIntoView({ behavior: "auto", block: "start" })
          // Limpiar el parámetro para que en futuras recargas se arranque en la sección 1
          try {
            const base = window.location.origin
            const path = window.location.pathname || "/"
            window.history.replaceState(null, "", `${base}${path}`)
          } catch {}
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
      <Inicio />
      <Proyectos />
      <PageNavigation />
      <div
        className={`fixed z-50 flex items-center gap-3 
          ${handedness === "right"
            ? "left-0 right-0 justify-center min-[900px]:left-auto min-[900px]:right-3 min-[900px]:justify-end"
            : "left-0 right-0 justify-center min-[900px]:right-auto min-[900px]:left-3 min-[900px]:justify-start"}
        `}
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 1.5rem)" }}
      >
        {handedness === "right" ? (
          <>
            <LanguageToggle />
            <HandednessToggle />
            <ThemeToggle />
          </>
        ) : (
          <>
            <ThemeToggle />
            <HandednessToggle />
            <LanguageToggle />
          </>
        )}
      </div>
    </motion.main>
  )
}
