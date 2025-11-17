"use client"
/**
 * LanguageToggle: alterna entre ES y EN, mostrando el idioma actual.
 */

import React, { useState } from "react"
import styles from "./HeaderInicio.module.css"

export default function LanguageToggle() {
  const [lang, setLang] = useState<"es" | "en">("es")
  return (
    <button onClick={() => setLang((p) => (p === "es" ? "en" : "es"))} className={styles.headerButton} aria-label="Cambiar idioma">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5h6v6H5V5zm8 0h6v2h-6V5zm0 4h6v2h-6V9zm-8 8h14v2H5v-2zm0-6h6v6H5v-6z" fill="currentColor"/>
      </svg>
      <span>{lang.toUpperCase()}</span>
    </button>
  )
}