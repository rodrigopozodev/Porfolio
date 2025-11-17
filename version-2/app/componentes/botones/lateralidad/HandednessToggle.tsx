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
      <img src="/hand-svgrepo-com.svg" alt="Lateralidad" width={16} height={16} className={styles.iconHand} />
      <span>{mode === "left" ? "Zurdo" : "Diestro"}</span>
    </button>
  )
}
