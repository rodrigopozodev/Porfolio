"use client"

import React, { useState, useMemo } from "react"
import Image from "next/image"
import "./tarjetas.css"
import VisitarButton from "../botones/visitar/VisitarButton"
import InformacionButton from "../botones/informacion/InformacionButton"
import ResumenLeagueTracker from "./resumen-proyecto/ResumenLeagueTracker"
import TecnologiasLeagueTracker from "./tecnologias-utilizadas/TecnologiasLeagueTracker"

interface Props {
  imageSrc: string
  imageName: string
  visitUrl?: string
  infoHref?: string
  onFlipChange?: (flipped: boolean) => void
}

// Función para obtener el nombre del componente basado en el nombre del proyecto
const getComponentName = (projectName: string): string => {
  // Convertir "League Tracker" a "LeagueTracker"
  return projectName.replace(/\s+/g, "")
}

const TarjetasToggle = ({ imageSrc, imageName, visitUrl, infoHref, onFlipChange }: Props) => {
  const [flipped, setFlipped] = useState(false)
  const normalizedSrc = imageSrc.replace(/\s/g, "%20")
  
  const handleFlip = () => {
    const newFlipped = !flipped
    setFlipped(newFlipped)
    onFlipChange?.(newFlipped)
  }
  
  // Determinar qué componentes usar según el nombre del proyecto
  const componentName = useMemo(() => getComponentName(imageName), [imageName])
  
  const ResumenComponent = useMemo(() => {
    switch (componentName) {
      case "LeagueTracker":
        return ResumenLeagueTracker
      default:
        return null
    }
  }, [componentName])
  
  const TecnologiasComponent = useMemo(() => {
    switch (componentName) {
      case "LeagueTracker":
        return TecnologiasLeagueTracker
      default:
        return null
    }
  }, [componentName])
  return (
    <div 
      className="flip-card" 
      onClick={handleFlip} 
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleFlip()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${imageName} - Click para ver detalles`}
    >
      <div className={`flip-inner ${flipped ? "flipped" : ""}`} style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transition: "transform 0.6s ease" }}>
        <div
          className="flip-face flip-front"
          style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", overflow: "hidden" }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={normalizedSrc}
              alt={imageName}
              fill
              className="flip-image"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="flip-face flip-back" style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", overflow: "hidden", transform: "rotateY(180deg)" }}>
          <div className="flip-content">
            <div className="row title">{imageName}</div>
            <div className="row summary">
              {ResumenComponent ? <ResumenComponent /> : <div>Resumen del proyecto.</div>}
            </div>
            <div className="row techs">
              {TecnologiasComponent ? <TecnologiasComponent /> : <div>Tecnologías utilizadas.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TarjetasToggle