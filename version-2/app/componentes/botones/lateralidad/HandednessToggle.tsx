"use client"
/**
 * HandednessToggle: alterna entre modo diestro y zurdo.
 */

import { useState } from "react"
import styles from "../../paginas/inicio/Header/HeaderInicio.module.css"

export default function HandednessToggle() {
  const [mode, setMode] = useState<"left" | "right">("right")
  return (
    <button onClick={() => setMode((p) => (p === "right" ? "left" : "right"))} className={styles.headerButton} aria-label="Cambiar lateralidad">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 3h10v2H7V3zm2 4h6v10H9V7zm-2 12h10v2H7v-2z" fill="currentColor"/>
      </svg>
      <span>{mode === "left" ? "Zurdo" : "Diestro"}</span>
    </button>
  )
}
