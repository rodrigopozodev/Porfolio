"use client"

import { useAutoFontSize } from "../useAutoFontSize"

export default function ResumenLeagueTracker() {
  const { contentRef } = useAutoFontSize({
    minFontSize: 0.6,
    maxFontSize: 1.5,
    step: 0.05,
  })

  return (
    <div className="summary">
      <div className="summary-content" ref={contentRef}>
        <div>League Tracker es una <strong>plataforma web</strong> para <strong>analizar el rendimiento</strong> de jugadores de League of Legends.</div>
        <div>Permite <strong>buscar y comparar múltiples jugadores</strong> simultáneamente desde cualquier región del juego.</div>
        <div>Ofrece <strong>seguimiento de rango, LP, historial de partidas</strong> y <strong>análisis de maestría de campeones</strong>.</div>
        <div>Los usuarios pueden crear <strong>cuentas</strong> para <strong>vincular su cuenta de Riot Games</strong> y recibir <strong>recomendaciones personalizadas</strong>.</div>
        <div>Transforma datos del juego en <strong>insights accionables</strong> para ayudar a jugadores a <strong>mejorar su rendimiento</strong>.</div>
      </div>
    </div>
  )
}

