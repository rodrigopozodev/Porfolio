"use client"

import HeaderInicio from "./componentes/paginas/inicio/Header/HeaderInicio"
import BodyInicio from "./componentes/paginas/inicio/body/bodyinicio"
import NavegacionInicio from "./componentes/paginas/inicio/navegacion/navegacioninicio"
import Proyectos from "./componentes/paginas/proyectos/Proyectos"
import "./componentes/paginas/inicio/styles/grid.css"
import "./componentes/paginas/inicio/styles/inicio.css"
export default function PageInicio() {
  return (
    <div className="snap-container">
      <section id="inicio" className="page-section">
        <main className="parent">
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