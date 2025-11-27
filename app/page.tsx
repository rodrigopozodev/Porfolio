"use client"

import dynamic from "next/dynamic"
import HeaderInicio from "./paginas/inicio/header/HeaderInicio"
import NavegacionInicio from "./paginas/inicio/navegacion/navegacioninicio"
import "./paginas/inicio/styles/grid.css"
import "./paginas/inicio/styles/inicio.css"

// Code splitting: cargar componentes pesados de forma lazy
const BodyInicio = dynamic(() => import("./paginas/inicio/body/bodyinicio"), {
  loading: () => <div className="parent" aria-label="Cargando contenido principal" />,
})

const Proyectos = dynamic(() => import("./paginas/proyectos/Proyectos"), {
  loading: () => <main className="parent" aria-label="Cargando proyectos"><div className="personal box">Cargando proyectos...</div></main>,
})

export default function PageInicio() {
  return (
    <div className="snap-container">
        <section id="inicio" className="page-section">
          <main id="main-content" className="parent" tabIndex={-1}>
            <div className="header">
              <HeaderInicio />
            </div>
            <NavegacionInicio />
            <BodyInicio />
          </main>
        </section>
        <section id="proyectos" className="page-section">
          <Proyectos />
        </section>
      </div>
  )
}