"use client"

import "./conectar.css"
import { useTranslation } from "../utils/useTranslation"
import { externalUrls } from "@/lib/config"

const ConectarToggle = () => {
  const t = useTranslation()
  
  return (
    <div className="conectar">
      <h3 className="titulo">{t.personal.conectaConmigo}</h3>
      <div className="github cell">
        <button 
          className="circle" 
          aria-label={t.conectar.github} 
          data-label="github"
          onClick={() => window.open(externalUrls.github, "_blank", "noopener,noreferrer")}
        >
          <span className="iconGit">
            <img src="/icon-github.svg" alt="GitHub" className="iconGitImg" width={28} height={28} loading="eager" decoding="sync" fetchPriority="high" />
          </span>
        </button>
      </div>
      <div className="linkedin cell">
        <a className="circle" aria-label={t.conectar.linkedin} href={externalUrls.linkedin} target="_blank" rel="noopener noreferrer" data-label="linkedin">
          <span className="iconLinked">
            <img src="/icon-linkedin.svg" alt="LinkedIn" className="iconLinkedDefault" width={28} height={28} loading="eager" decoding="sync" fetchPriority="high" />
            <img src="/icon-linkedin-hover.svg" alt="LinkedIn Hover" className="iconLinkedHover" width={28} height={28} loading="eager" decoding="sync" fetchPriority="high" />
          </span>
        </a>
      </div>
      <div className="correo cell">
        <button 
          className="circle" 
          aria-label={t.conectar.email} 
          data-label="correo"
          onClick={() => window.open(externalUrls.email, "_blank", "noopener,noreferrer")}
        >
          <span className="iconMail">
            <img src="/icon-gmail.svg" alt="Gmail" width={28} height={28} loading="eager" decoding="sync" fetchPriority="high" />
          </span>
        </button>
      </div>
      <button 
        className="cv" 
        aria-label={t.conectar.descargarCV}
        onClick={() => {
          const link = document.createElement("a")
          link.href = "/CV_Rodrigo_Pozo_Sánchez.pdf"
          link.download = "CV_Rodrigo_Pozo_Sánchez.pdf"
          link.click()
        }}
      >
        <span>{t.conectar.descargarCV}</span>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M12 5v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 10l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 19h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}

export default ConectarToggle