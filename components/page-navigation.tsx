"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "hero", label: "Inicio" },
  { id: "portfolio", label: "Proyectos" },
  { id: "contact", label: "Contacto" },
]

export function PageNavigation() {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const container = document.querySelector(".snap-container")
    if (!container) return

    const handleScroll = () => {
      const scrollPosition = container.scrollTop
      const viewportHeight = window.innerHeight
      const currentSection = Math.round(scrollPosition / viewportHeight)
      setActiveSection(currentSection)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    const section = document.getElementById(sections[index].id)
    section?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed right-1 md:right-3 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-4" aria-label="Navegación de página">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(index)}
          className="group relative cursor-pointer"
          aria-label={section.label}
          aria-current={activeSection === index ? "true" : "false"}
        >
          <span
            className={cn(
              "block h-3 w-3 rounded-full border-2 border-foreground/30 transition-all cursor-pointer",
              activeSection === index
                ? "scale-125 border-accent bg-accent shadow-lg shadow-accent/50"
                : "bg-transparent hover:border-accent hover:bg-accent/20",
            )}
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-foreground px-3 py-1 text-xs font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  )
}
