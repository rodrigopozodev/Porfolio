"use client"

import React, { useEffect, useState } from "react"
import TarjetasToggle from "../../../tarjetas/tarjetasToggle"

const BodyInicio = () => {
  const [isCompact, setIsCompact] = useState(() => {
    if (typeof window === "undefined") return true
    return window.innerWidth <= 1250 && window.innerHeight <= 1000
  })

  useEffect(() => {
    const check = () => {
      const portrait = window.matchMedia && window.matchMedia("(orientation: portrait)").matches
      const compact = window.innerWidth <= 1024 || window.innerHeight <= 1000 || portrait
      setIsCompact(compact)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // El tamaño del nombre se gestiona con CSS (container queries y clamp)

  return (
    <>
      {!isCompact && (
        <div className="recomendaciones box">
          <div className="div1"><span className="titulo">Recomendaciones</span></div>
          <div className="div2">testimonio</div>
          <div className="div3">reseña</div>
        </div>
      )}
      <div className="personal box">
        <div className="div1"><img src="/Rodrigo.png" alt="Rodrigo" /></div>
        <div className="div2"><span className="nombre">Rodrigo Pozo Sánchez</span></div>
        <div className="div3">Palabras animadas</div>
        <div className="div4">Ver trabajos</div>
        <div className="div5">Contactarme</div>
      </div>
      {!isCompact && (
        <div className="destacado box">
          <div className="proyectoDestacado">
            <div className="div1"><span className="titulo">Proyecto destacado</span></div>
            <div className="div2"><TarjetasToggle imageSrc="/League Tracker.png" imageName="League Tracker" /></div>
            <div className="div3">reservado</div>
          </div>
        </div>
      )}
    </>
  )
}

export default BodyInicio