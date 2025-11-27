"use client"

import { useAutoFontSize } from "../useAutoFontSize"

export default function TecnologiasLeagueTracker() {
  const { contentRef } = useAutoFontSize({
    minFontSize: 0.6,
    maxFontSize: 1.5,
    step: 0.05,
  })

  return (
    <div className="techs">
      <div className="techs-content" ref={contentRef}>
        <div><strong>Frontend:</strong> Next.js 15.5.6 con App Router, React 19.1.0 y TypeScript 5.</div>
        <div><strong>Backend:</strong> Supabase para autenticación, base de datos y gestión de sesiones.</div>
        <div><strong>Estilos:</strong> Tailwind CSS 4 con PostCSS para diseño responsivo y animaciones.</div>
        <div><strong>APIs:</strong> Integración con la API oficial de Riot Games para datos de jugadores y partidas.</div>
        <div><strong>Servicios:</strong> Nodemailer, Resend y Twilio para comunicación, bcryptjs para seguridad, y Lucide React para iconos.</div>
      </div>
    </div>
  )
}

