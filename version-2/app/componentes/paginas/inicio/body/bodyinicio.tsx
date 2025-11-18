"use client"

import React from "react"
import TarjetasToggle from "../../../tarjetas/tarjetasToggle"
import ConectarToggle from "../../../conectar/conectarToggle"

const BodyInicio = () => {
  // El tamaño del nombre se gestiona con CSS (container queries y clamp)

  return (
    <>
      <div className="recomendaciones box">
        <div className="div1"><span className="titulo">Recomendaciones</span></div>
        <div className="div2">testimonio</div>
        <div className="div3">reseña</div>
      </div>
      <div className="personal box">
        <div className="div1"><img src="/Rodrigo.png" alt="Rodrigo" loading="eager" decoding="sync" fetchPriority="high" /></div>
        <div className="div2"><span className="nombre">Rodrigo Pozo Sánchez</span></div>
        <div className="div3">Palabras animadas</div>
        <div className="div4">Ver trabajos</div>
        <div className="div5"><ConectarToggle /></div>
      </div>
      <div className="destacado box">
        <div className="proyectoDestacado">
          <div className="div1"><span className="titulo">Proyecto destacado</span></div>
          <div className="div2"><TarjetasToggle imageSrc="/League Tracker.png" imageName="League Tracker" /></div>
          <div className="div3" aria-hidden="true"></div>
        </div>
      </div>
    </>
  )
}

export default BodyInicio