"use client"

import React from "react"
import { useRouter } from "next/navigation"

interface Props {
  href: string
  children?: React.ReactNode
  className?: string
}

export default function InformacionButton({ href, children = "Información", className }: Props) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Evitar que se active el flip de la tarjeta
    router.push(href)
  }

  return (
    <div
      className={`action-left ${className ?? ""}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          e.stopPropagation()
          router.push(href)
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Ver información del proyecto`}
    >
      {children}
    </div>
  )
}



