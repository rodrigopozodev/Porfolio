"use client"

import React, { useEffect, useState } from "react"
import NavPaginas from "./navpaginas"

const NavegacionInicio = () => {
  const [mode, setMode] = useState<"left" | "right">("right")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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
    <>
      <div className="nav-left box" style={{ display: !isMobile && mode === "left" ? "flex" : "none" }}><NavPaginas /></div>
      <div className="nav-right box" style={{ display: isMobile || mode === "right" ? "flex" : "none" }}><NavPaginas /></div>
    </>
  )
}

export default NavegacionInicio