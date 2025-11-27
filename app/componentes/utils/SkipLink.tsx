"use client"

import React from "react"

/**
 * Skip Link para accesibilidad.
 * Permite a los usuarios de teclado saltar directamente al contenido principal.
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      aria-label="Saltar al contenido principal"
    >
      Saltar al contenido principal
    </a>
  )
}

