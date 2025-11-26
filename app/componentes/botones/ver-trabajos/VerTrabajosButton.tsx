"use client"

import React from "react"

export default function VerTrabajosButton() {
  const handleClick = () => {
    const proyectos = document.getElementById("proyectos")
    proyectos?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <button
      onClick={handleClick}
      className="ver-trabajos-btn"
      aria-label="Ver proyectos destacados"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <span className="ver-trabajos-text">Ver Trabajos</span>
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

