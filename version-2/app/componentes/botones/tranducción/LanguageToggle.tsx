"use client"
/**
 * LanguageToggle: alterna entre ES y EN, mostrando el idioma actual.
 */

import { useState } from "react"
import styles from "../../../paginas/inicio/Header/HeaderInicio.module.css"

export default function LanguageToggle() {
  const [lang, setLang] = useState<"es" | "en">("es")
  return (
    <button onClick={() => setLang((p) => (p === "es" ? "en" : "es"))} className={styles.headerButton} aria-label="Cambiar idioma">
      <span className={styles.iconWrap}>
        <img src="/icon-translate.svg" alt="Idioma" width={24} height={24} className={styles.iconTranslateDefault} loading="eager" decoding="sync" fetchPriority="high" />
        <img src="/icon-translate-hover.png" alt="Idioma Hover" width={24} height={24} className={styles.iconTranslateHover} loading="eager" decoding="sync" fetchPriority="high" />
      </span>
      <span>{lang.toUpperCase()}</span>
    </button>
  )
}