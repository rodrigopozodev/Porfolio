"use client"
/**
 * LanguageToggle: alterna entre ES y EN, mostrando el idioma actual.
 */

import { useLanguage } from "@/componentes/utils/useLanguage"
import styles from "../../../paginas/inicio/Header/HeaderInicio.module.css"

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()
  return (
    <button onClick={toggleLanguage} className={styles.headerButton} aria-label="Cambiar idioma">
      <span className={styles.iconWrap}>
        <img src="/icon-translate.svg" alt="Idioma" width={24} height={24} className={styles.iconTranslateDefault} loading="eager" decoding="sync" fetchPriority="high" />
        <img src="/icon-translate-hover.png" alt="Idioma Hover" width={24} height={24} className={styles.iconTranslateHover} loading="eager" decoding="sync" fetchPriority="high" />
      </span>
      <span>{language.toUpperCase()}</span>
    </button>
  )
}



