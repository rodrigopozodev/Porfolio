"use client"

import React, { useEffect, useState } from "react"
import NavPaginas from "./navpaginas"

const NavegacionInicio = () => {
  const [mode, setMode] = useState<"left" | "right">("right")

  useEffect(() => {
    try {
      const saved = localStorage.getItem("handedness") as "left" | "right" | null
      if (saved === "left" || saved === "right") setMode(saved)
    } catch {}
    const handler = (e: any) => {
      const m = e?.detail?.mode as "left" | "right" | undefined
      if (m === "left" || m === "right") setMode(m)
    }
    window.addEventListener("handednessChange", handler as EventListener)
    return () => window.removeEventListener("handednessChange", handler as EventListener)
  }, [])

  return (
    <>
      <div className="nav-left box">{mode === "left" ? <NavPaginas /> : ""}</div>
      <div className="nav-right box">{mode === "right" ? <NavPaginas /> : ""}</div>
    </>
  )
}

export default NavegacionInicio