"use client"
/**
 * Página Inicio: define el grid principal y monta las secciones.
 */

import React from "react"
import HeaderInicio from "./pages/inicio/sections/Header/HeaderInicio"
import "./pages/inicio/styles/grid.css"
import "./pages/inicio/styles/inicio.css"
import "./pages/inicio/styles/responsive.css"

export default function PageInicio() {
  return (
    <main className="parent">
      <div className="header">
        <HeaderInicio />
      </div>
      <div className="nav-left box">Navegación izquierda</div>
      <div className="recomendaciones box">Recomendaciones</div>
      <div className="personal box">Personal</div>
      <div className="destacado box">Proyecto destacado</div>
      <div className="nav-right box">Navegación derecha</div>
    </main>
  )
}