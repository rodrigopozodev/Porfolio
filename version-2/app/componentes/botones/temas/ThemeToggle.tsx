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
      {mountedTheme === "dark" || (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) ? (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zM1 13h3v-2H1v2zm10-9h-2v3h2V4zm7.03 1.05l-1.8-1.8-1.79 1.8 1.79 1.79 1.8-1.79zM20 11v2h3v-2h-3zm-9 9h2v-3h-2v3zm-7.03-1.05l1.8 1.79 1.79-1.79-1.79-1.8-1.8 1.8zM17.24 19.16l1.8 1.79 1.79-1.79-1.79-1.8-1.8 1.8zM12 7a5 5 0 100 10 5 5 0 000-10z" fill="currentColor"/></svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a9.99 9.99 0 018.66 13.99A9.99 9.99 0 1112 2z" fill="currentColor"/></svg>
      )}
    </button>
  )
}