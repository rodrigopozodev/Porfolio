"use client"
/**
 * HandednessToggle: alterna entre modo diestro y zurdo.
 */

import { useEffect, useState } from "react"
import styles from "../../../paginas/inicio/Header/HeaderInicio.module.css"

export default function HandednessToggle() {
  const [mode, setMode] = useState<"left" | "right">("right")
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Escuchar cambios de lateralidad desde la detección automática
    const handler = (e: any) => {
      const m = e?.detail?.mode as "left" | "right" | undefined
      if (m === "left" || m === "right") setMode(m)
    }
    window.addEventListener("handednessChange", handler as EventListener)
    
    try {
      const root = document.documentElement
      setIsDark(root.classList.contains("dark"))
      const themeHandler = () => setIsDark(root.classList.contains("dark"))
      window.addEventListener("themeToggleTransition", themeHandler as EventListener)
      return () => {
        window.removeEventListener("handednessChange", handler as EventListener)
        window.removeEventListener("themeToggleTransition", themeHandler as EventListener)
      }
    } catch {
      return () => {
        window.removeEventListener("handednessChange", handler as EventListener)
      }
    }
  }, [])
  return (
    <button
      onClick={() => {
        const next = mode === "right" ? "left" : "right"
        setMode(next)
        try { window.dispatchEvent(new CustomEvent("handednessChange", { detail: { mode: next } })) } catch {}
      }}
      className={styles.headerButton}
      aria-label="Cambiar lateralidad"
    >
      <span className={`${styles.iconWrap} ${styles.iconWrapLateralidad}`}>
        {(() => {
          const staticSrc = isDark ? "/hand-static-dark.png" : "/hand-static-light.png"
          const staticInvert = isDark ? (mode === "left") : (mode === "right")
          const staticClass = `${styles.iconStatic} ${staticInvert ? styles.invertXImg : ""}`
          const hoverSrc = isDark ? "/hand-hover-dark.gif" : "/hand-hover-light.gif"
          const hoverInvert = isDark ? (mode === "left") : (mode === "right")
          const hoverClass = `${styles.iconHoverGif} ${hoverInvert ? styles.invertX : ""}`
          return (
            <>
              <img src={staticSrc} alt="Lateralidad" width={28} height={28} className={staticClass} loading="eager" decoding="sync" fetchPriority="high" />
              <img src={hoverSrc} alt="Lateralidad animada" width={28} height={28} className={hoverClass} loading="eager" decoding="sync" fetchPriority="high" />
            </>
          )
        })()}
      </span>
      <span>{mode === "left" ? "Zurdo" : "Diestro"}</span>
    </button>
  )
}
