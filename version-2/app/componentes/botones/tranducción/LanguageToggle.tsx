"use client"
/**
 * LanguageToggle: alterna entre ES y EN, mostrando el idioma actual.
 */

import { useState } from "react"
import styles from "../../paginas/inicio/Header/HeaderInicio.module.css"

export default function LanguageToggle() {
  const [lang, setLang] = useState<"es" | "en">("es")
  return (
    <button onClick={() => setLang((p) => (p === "es" ? "en" : "es"))} className={styles.headerButton} aria-label="Cambiar idioma">
      <img src="/translate-language-svgrepo-com.svg" alt="Idioma" width={16} height={16} />
      <span>{lang.toUpperCase()}</span>
    </button>
  )
}