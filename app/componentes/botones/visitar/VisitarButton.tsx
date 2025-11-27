"use client"

import React from "react"

interface Props {
  url: string
  children?: React.ReactNode
  className?: string
}

export default function VisitarButton({ url, children = "Visitar", className }: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Evitar que se active el flip de la tarjeta
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div
      className={`action-right ${className ?? ""}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          e.stopPropagation()
          window.open(url, "_blank", "noopener,noreferrer")
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Visitar ${url}`}
    >
      {children}
    </div>
  )
}



