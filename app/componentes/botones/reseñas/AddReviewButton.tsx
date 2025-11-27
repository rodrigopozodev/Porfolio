"use client"

import React from "react"

interface Props {
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}

export default function AddReviewButton({ onClick, children = "Añadir reseña", className }: Props) {
  return (
    <button
      className={`btn border-2 border-black dark:border-white rounded-md px-3 py-2 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-105 transition-all duration-200 ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}