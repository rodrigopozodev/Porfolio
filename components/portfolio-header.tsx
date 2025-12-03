"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, Languages, Hand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePortfolio } from "@/lib/context/portfolio-context"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

export function PortfolioHeader() {
  const pathname = usePathname()
  const { language, theme, handedness, setLanguage, setTheme, setHandedness } = usePortfolio()
  const t = translations[language]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log("[PortfolioHeader] Component mounted, current theme:", theme)
  }, [])

  useEffect(() => {
    if (mounted) {
      console.log("[PortfolioHeader] Theme changed to:", theme)
      console.log("[PortfolioHeader] Document root classes:", document.documentElement.className)
    }
  }, [theme, mounted])

  const sections = [
    { name: t.nav.home, path: "/inicio" },
    { name: t.nav.about, path: "/sobre-mi" },
    { name: t.nav.projects, path: "/proyectos" },
  ]

  const isActive = (path: string) => pathname.startsWith(path)

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const newTheme = theme === "light" ? "dark" : "light"
    console.log("[PortfolioHeader] Toggling theme from", theme, "to", newTheme)
    console.log("[PortfolioHeader] Current theme state:", theme)
    setTheme(newTheme)
    console.log("[PortfolioHeader] setTheme called with:", newTheme)
  }

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  const toggleHandedness = () => {
    setHandedness(handedness === "right" ? "left" : "right")
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-[20vh] bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Navigation sections */}
        <nav className={cn("flex items-center gap-1 sm:gap-2 flex-shrink", handedness === "left" && "order-2")}>
          {sections.map((section) => (
            <Link
              key={section.path}
              href={section.path}
              className={cn(
                "px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-base font-medium transition-colors whitespace-nowrap",
                isActive(section.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {section.name}
            </Link>
          ))}
        </nav>

        {/* Functional icons */}
        <div className={cn("flex items-center gap-1 sm:gap-2 flex-shrink-0", handedness === "left" && "order-1")}>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleHandedness}
            title="Cambiar lateralidad / Change handedness"
            className="h-8 w-8 sm:h-10 sm:w-10"
          >
            <Hand className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            title={language === "es" ? "Change to English" : "Cambiar a Español"}
            className="h-8 w-8 sm:h-10 sm:w-10"
          >
            <Languages className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={!mounted || theme === "light" ? "Modo oscuro" : "Modo claro"}
            className="h-8 w-8 sm:h-10 sm:w-10"
            suppressHydrationWarning
          >
            {!mounted ? (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : theme === "light" ? (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
