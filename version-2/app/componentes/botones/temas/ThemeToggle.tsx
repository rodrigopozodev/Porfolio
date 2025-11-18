"use client"
/**
 * ThemeToggle: alterna entre temas light/dark y aplica clases en <html>.
 */

import { useEffect, useState, useRef } from "react"
import { MoonIcon, MoonIconHandle } from "@/componentes/svg/tema-ocuro/MoonIcon"
import { SunIcon, SunIconHandle } from "@/componentes/svg/tema-claro/SunIcon"
import styles from "../../../paginas/inicio/Header/HeaderInicio.module.css"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [mountedTheme, setMountedTheme] = useState<"light" | "dark" | "system">("system")
  const [isDark, setIsDark] = useState(false)
  const sunRef = useRef<SunIconHandle | null>(null)
  const moonRef = useRef<MoonIconHandle | null>(null)

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
      setIsDark(systemTheme === "dark")
      return
    }
    if (newTheme === "dark") {
      root.classList.remove("light")
      root.classList.add("dark")
      setIsDark(true)
      return
    }
    // light
    root.classList.remove("dark")
    root.classList.add("light")
    setIsDark(false)
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
    <button
      onClick={toggleTheme}
      className={styles.headerButton}
      aria-label="Cambiar tema"
      onMouseEnter={() => { if (isDark) { moonRef.current?.startAnimation() } else { sunRef.current?.startAnimation() } }}
      onMouseLeave={() => { if (isDark) { moonRef.current?.stopAnimation() } else { sunRef.current?.stopAnimation() } }}
    >
      <span className={styles.iconWrap}>
        {!isDark && (
          <SunIcon ref={sunRef} size={16} className={styles.iconSunSvg} />
        )}
        {isDark && (
          <MoonIcon ref={moonRef} size={16} className={styles.iconMoonSvg} />
        )}
      </span>
    </button>
  )
}