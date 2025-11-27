"use client"

import React from "react"

/**
 * Skip Link para accesibilidad.
 * Permite a los usuarios de teclado saltar directamente al contenido principal.
 * Usa texto estático para evitar errores de hidratación.
 */
export default function SkipLink() {
  // Usar texto estático en español para coincidir con el servidor y evitar hidratación
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

