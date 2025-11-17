"use client"
/**
 * ThemeToggle: alterna entre temas light/dark y aplica clases en <html>.
 */

import { useEffect, useState } from "react"
import styles from "../../paginas/inicio/Header/HeaderInicio.module.css"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [mountedTheme, setMountedTheme] = useState<"light" | "dark" | "system">("system")

  useEffect(() => {
    const savedTheme = (typeof window !== "undefined" ? localStorage.getItem("theme") : null) as "light" | "dark" | "system" | null
    const initial = savedTheme || "system"
    setTheme(initial)
    setMountedTheme(initial)
    applyTheme(initial)
  }, [])

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const root = document.documentElement
    if (newTheme === "system") {
      root.classList.remove("light")
      root.classList.remove("dark")
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      if (systemTheme === "dark") root.classList.add("dark")
      else root.classList.add("light")
      return
    }
    if (newTheme === "dark") {
      root.classList.remove("light")
      root.classList.add("dark")
      return
    }
    // light
    root.classList.remove("dark")
    root.classList.add("light")
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    try { localStorage.setItem("theme", newTheme) } catch {}
    try { document.body.classList.add("theme-transition") } catch {}
    applyTheme(newTheme)
    try { setTimeout(() => { document.body.classList.remove("theme-transition") }, 250) } catch {}
    try { window.dispatchEvent(new Event("themeToggleTransition")) } catch {}
  }

  return (
    <button onClick={toggleTheme} className={styles.headerButton} aria-label="Cambiar tema">
      <span className={styles.iconWrap}>
        <img src="/sun-alt-svgrepo-com.svg" alt="Claro" width={16} height={16} className={styles.iconSun} />
        <img src="/moon-svgrepo-com.svg" alt="Oscuro" width={16} height={16} className={`${styles.iconMoon} ${styles.iconMoonDark}`} />
      </span>
    </button>
  )
}