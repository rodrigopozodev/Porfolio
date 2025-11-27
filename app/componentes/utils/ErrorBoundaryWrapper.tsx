"use client"

import React from "react"
import { ErrorBoundary } from "./ErrorBoundary"
import { useTranslation } from "./useTranslation"

/**
 * Wrapper funcional para ErrorBoundary que proporciona traducciones.
 */
export default function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
  const t = useTranslation()
  
  return (
    <ErrorBoundary
      translations={{
        title: t.errors.algoSalióMal,
        message: t.errors.recargarPágina,
        details: t.errors.detallesError,
        tryAgain: t.errors.intentarDeNuevo,
        reload: t.errors.recargarPágina,
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

