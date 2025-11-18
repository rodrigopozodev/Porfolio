"use client"

import React, { useState } from "react"
import "./tarjetas.css"

interface Props {
  imageSrc: string
  imageName: string
}

const TarjetasToggle = ({ imageSrc, imageName }: Props) => {
  const [flipped, setFlipped] = useState(false)
  const normalizedSrc = imageSrc.replace(/\s/g, "%20")
  return (
    <div className="flip-card" onClick={() => setFlipped((p) => !p)} aria-label={imageName}>
      <div className={`flip-inner ${flipped ? "flipped" : ""}`} style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transition: "transform 0.6s ease" }}>
        <div
          className="flip-face flip-front"
          style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", overflow: "hidden" }}
        >
          <img
            src={normalizedSrc}
            alt={imageName}
            className="flip-image"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div className="flip-face flip-back" style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", overflow: "hidden", transform: "rotateY(180deg)" }}>
          <div className="flip-content">
            <div className="row title">{imageName}</div>
            <div className="row summary">Resumen del proyecto.</div>
            <div className="row techs">Tecnologías utilizadas.</div>
            <div className="row actions">
              <div className="action-left">Información</div>
              <div className="action-right">Visitar</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TarjetasToggle