"use client"

import React from "react"
import { useTranslation } from "../../utils/useTranslation"

export default function VerTrabajosButton() {
  const t = useTranslation()
  
  const handleClick = () => {
    const proyectos = document.getElementById("proyectos")
    proyectos?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <button
      onClick={handleClick}
      className="ver-trabajos-btn"
      aria-label={`${t.personal.verTrabajos} - ${t.proyectos.destacado}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <span className="ver-trabajos-text">{t.personal.verTrabajos}</span>
      <svg
        className="ver-trabajos-arrow"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  )
}



