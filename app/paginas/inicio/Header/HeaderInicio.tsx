"use client"
/**
 * HeaderInicio: agrupa los tres toggles en una grilla de 3 columnas.
 */
import LanguageToggle from "../../../componentes/botones/traducción/LanguageToggle"
import HandednessToggle from "../../../componentes/botones/lateralidad/HandednessToggle"
import ThemeToggle from "../../../componentes/botones/temas/ThemeToggle"
import styles from "./HeaderInicio.module.css"

export default function HeaderInicio() {
  return (
    <div className="grid grid-cols-3 w-full h-full gap-0" role="toolbar" aria-label="Configuración de la aplicación">
      <div className="flex justify-center items-center border-2 border-blue-500 box-border min-w-0 min-h-0">
        <LanguageToggle />
      </div>
      <div className="flex justify-center items-center border-2 border-blue-500 box-border min-w-0 min-h-0">
        <HandednessToggle />
      </div>
      <div className="flex justify-center items-center box-border min-w-0 min-h-0">
        <ThemeToggle />
      </div>
    </div>
  )
}