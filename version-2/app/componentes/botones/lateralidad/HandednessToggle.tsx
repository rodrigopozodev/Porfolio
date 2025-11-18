"use client"
/**
 * HandednessToggle: alterna entre modo diestro y zurdo.
 */

import { useEffect, useState } from "react"
import styles from "../../paginas/inicio/Header/HeaderInicio.module.css"

export default function HandednessToggle() {
  const [mode, setMode] = useState<"left" | "right">("right")

  useEffect(() => {
    try {
      const saved = localStorage.getItem("handedness") as "left" | "right" | null
      if (saved === "left" || saved === "right") setMode(saved)
    } catch {}
  }, [])
  return (
    <button
      onClick={() => {
        const next = mode === "right" ? "left" : "right"
        setMode(next)
        try { localStorage.setItem("handedness", next) } catch {}
        try { window.dispatchEvent(new CustomEvent("handednessChange", { detail: { mode: next } })) } catch {}
      }}
      className={styles.headerButton}
      aria-label="Cambiar lateralidad"
    >
      <img src="/hand-svgrepo-com.svg" alt="Lateralidad" width={24} height={24} className={styles.iconHand} />
      <span>{mode === "left" ? "Zurdo" : "Diestro"}</span>
    </button>
  )
}
