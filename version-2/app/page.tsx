"use client"
/**
 * Página Inicio: define el grid principal y monta las secciones.
 */
import HeaderInicio from "./componentes/paginas/inicio/Header/HeaderInicio"
import "./componentes/paginas/inicio/styles/grid.css"
import "./componentes/paginas/inicio/styles/inicio.css"
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