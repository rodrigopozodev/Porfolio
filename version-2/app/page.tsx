"use client"
import React, { useEffect, useState } from "react"
import HeaderInicio from "./componentes/paginas/inicio/Header/HeaderInicio"
import "./componentes/paginas/inicio/styles/grid.css"
import "./componentes/paginas/inicio/styles/inicio.css"
export default function PageInicio() {
  const [isCompact, setIsCompact] = useState(false)
  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth <= 1250 && window.innerHeight <= 800)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return (
    <main className="parent">
      <div className="header">
        <HeaderInicio />
      </div>
      <div className="nav-left box">Navegación izquierda</div>
      {!isCompact && (
        <div className="recomendaciones box">
          <div className="div1">título</div>
          <div className="div2">testimonio</div>
          <div className="div3">reseña</div>
        </div>
      )}
      <div className="personal box">
        <div className="div1">Foto</div>
        <div className="div2">Nombre</div>
        <div className="div3">Palabras animadas</div>
        <div className="div4">Ver trabajos</div>
        <div className="div5">Contactarme</div>
      </div>
      {!isCompact && (
        <div className="destacado box">
          <div className="proyectoDestacado">
            <div className="div1">título</div>
            <div className="div2">tarjeta</div>
            <div className="div3">reservado</div>
          </div>
        </div>
      )}
      <div className="nav-right box">Navegación derecha</div>
    </main>
  )
}