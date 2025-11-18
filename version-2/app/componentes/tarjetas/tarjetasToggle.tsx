"use client"

import React, { useEffect, useRef, useState } from "react"

interface Props {
  imageSrc: string
  imageName: string
}

const TarjetasToggle = ({ imageSrc, imageName }: Props) => {
  const [flipped, setFlipped] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const normalizedSrc = imageSrc.replace(/\s/g, "%20")

  useEffect(() => {
    setLoaded(false)
    const img = imgRef.current
    if (!img) return
    if (img.complete) setLoaded(true)
  }, [normalizedSrc])
  return (
    <div className="flip-card" onClick={() => setFlipped((p) => !p)} aria-label={imageName}>
      <div className={`flip-inner ${flipped ? "flipped" : ""}`} style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transition: "transform 0.6s ease" }}>
        <div
          className="flip-face flip-front"
          style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", overflow: "hidden" }}
        >
          <div className="flip-loader" style={{ opacity: loaded ? 0 : 1, transition: "opacity 240ms ease", pointerEvents: "none" }} />
          <img
            src={normalizedSrc}
            alt={imageName}
            className="flip-image"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: loaded ? 1 : 0, transition: "opacity 240ms ease" }}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            ref={imgRef}
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
      <style jsx>{`
        .flip-card { width: 100%; height: 100%; perspective: 1000px; cursor: pointer; }
        .flip-inner { will-change: transform; }
        .flip-inner.flipped { transform: rotateY(180deg); }
        .flip-face {}
        .flip-front { background: transparent; }
        .flip-back { transform: rotateY(180deg); padding: 0; border: 2px solid #ef4444; }
        :global(html.light) .flip-back { background: #000000; color: #ffffff; }
        :global(html.dark) .flip-back { background: #ffffff; color: #171717; }
        .flip-loader { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.12) 37%, rgba(0,0,0,0.06) 63%); background-size: 400% 100%; animation: shimmer 1.2s ease-in-out infinite; }
        :global(html.dark) .flip-loader { background: linear-gradient(90deg, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.16) 37%, rgba(255,255,255,0.08) 63%); }
        .flip-image { width: 100%; height: 100%; object-fit: cover; display: block; }
        .flip-content { display: grid; grid-template-rows: 10% 40% 40% 10%; width: 100%; height: 100%; gap: 0; }
        .row { display: flex; align-items: center; justify-content: center; text-align: center; border: 1px solid #ef4444; height: 100%; box-sizing: border-box; }
        .title { font-weight: 700; font-size: 1rem; }
        .summary, .techs { font-size: 0.95rem; padding: 0; }
        .actions { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .action-left, .action-right { display: flex; align-items: center; justify-content: center; border: 1px solid #ef4444; border-radius: 0; font-weight: 600; font-size: 0.9rem; height: 100%; box-sizing: border-box; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>
    </div>
  )
}

export default TarjetasToggle