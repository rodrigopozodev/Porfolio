"use client"

import React, { useEffect, useState } from "react"
import NavPaginas from "../inicio/navegacion/navpaginas"
import "../inicio/styles/grid.css"
import "../inicio/styles/inicio.css"

const Proyectos = () => {
  const [mode, setMode] = useState<"left" | "right">("right")
  useEffect(() => {
    // Por defecto modo diestro, solo cambia si se detecta o se cambia manualmente
    const handler = (e: any) => {
      const m = e?.detail?.mode as "left" | "right" | undefined
      if (m === "left" || m === "right") setMode(m)
    }
    window.addEventListener("handednessChange", handler as EventListener)
    return () => window.removeEventListener("handednessChange", handler as EventListener)
  }, [])
  return (
    <main className="parent" aria-label="Proyectos">
      <div className="header box">Proyectos</div>
      <div className="nav-left box">{mode === "left" ? <NavPaginas /> : ""}</div>
      <div className="personal box" style={{ display: "grid", placeItems: "center" }}>
        Próximamente: listado y destacados
      </div>
      <div className="destacado box" style={{ display: "grid", placeItems: "center" }}>
        Sección auxiliar
      </div>
      <div className="nav-right box">{mode === "right" ? <NavPaginas /> : ""}</div>
    </main>
  )
}

export default Proyectos