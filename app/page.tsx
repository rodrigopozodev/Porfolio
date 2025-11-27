"use client"

import HeaderInicio from "./paginas/inicio/header/HeaderInicio"
import BodyInicio from "./paginas/inicio/body/bodyinicio"
import NavegacionInicio from "./paginas/inicio/navegacion/navegacioninicio"
import Proyectos from "./paginas/proyectos/Proyectos"
import "./paginas/inicio/styles/grid.css"
import "./paginas/inicio/styles/inicio.css"

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