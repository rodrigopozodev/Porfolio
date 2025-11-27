"use client"

import React from "react"
import { useTranslation } from "./useTranslation"

/**
 * Skip Link para accesibilidad.
 * Permite a los usuarios de teclado saltar directamente al contenido principal.
 */
export default function SkipLink() {
  const t = useTranslation()
  
  return (
    <a
      href="#main-content"
      className="skip-link"
      aria-label={t.nav.skipToContent}
    >
      {t.nav.skipToContent}
    </a>
  )
}

