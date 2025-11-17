"use client"

import React, { useState } from "react"

interface Props {
  imageSrc: string
  imageName: string
}

const TarjetasToggle = ({ imageSrc, imageName }: Props) => {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className="flip-card" onClick={() => setFlipped((p) => !p)} aria-label={imageName}>
      <div className={`flip-inner ${flipped ? "flipped" : ""}`}>
        <div className="flip-face flip-front">
          <img src={imageSrc} alt={imageName} className="flip-image" />
        </div>
        <div className="flip-face flip-back">
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
      <style jsx>{`
        .flip-card { width: 100%; height: 100%; perspective: 1000px; cursor: pointer; }
        .flip-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.6s ease; }
        .flip-inner.flipped { transform: rotateY(180deg); }
        .flip-face { position: absolute; inset: 0; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .flip-front { background: transparent; }
        .flip-back { transform: rotateY(180deg); padding: 0; border: 2px solid #ef4444; }
        :global(html.light) .flip-back { background: #000000; color: #ffffff; }
        :global(html.dark) .flip-back { background: #ffffff; color: #171717; }
        .flip-image { width: 100%; height: 100%; object-fit: cover; display: block; }
        .flip-content { display: grid; grid-template-rows: 10% 40% 40% 10%; width: 100%; height: 100%; gap: 0; }
        .row { display: flex; align-items: center; justify-content: center; text-align: center; border: 1px solid #ef4444; height: 100%; box-sizing: border-box; }
        .title { font-weight: 700; font-size: 1rem; }
        .summary, .techs { font-size: 0.95rem; padding: 0; }
        .actions { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .action-left, .action-right { display: flex; align-items: center; justify-content: center; border: 1px solid #ef4444; border-radius: 0; font-weight: 600; font-size: 0.9rem; height: 100%; box-sizing: border-box; }
      `}</style>
    </div>
  )
}

export default TarjetasToggle