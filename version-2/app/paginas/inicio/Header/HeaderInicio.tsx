"use client"
/**
 * HeaderInicio: agrupa los tres toggles en una grilla de 3 columnas.
 */
import LanguageToggle from "../../../componentes/botones/tranducción/LanguageToggle"
import HandednessToggle from "../../../componentes/botones/lateralidad/HandednessToggle"
import ThemeToggle from "../../../componentes/botones/temas/ThemeToggle"
import styles from "./HeaderInicio.module.css"

export default function HeaderInicio() {
  return (
    <div className={`${styles.headerGrid} grid grid-cols-3 grid-rows-1 w-full h-full`}>
      <div className={styles.col1}>
        <LanguageToggle />
      </div>
      <div className={styles.col2}>
        <HandednessToggle />
      </div>
      <div className={styles.col3}>
        <ThemeToggle />
      </div>
    </div>
  )
}