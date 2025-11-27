"use client"
/**
 * HandednessToggle: alterna entre modo diestro y zurdo.
 */

import { useHandedness } from "@/componentes/utils/useHandedness"
import { useIsDark } from "@/componentes/utils/useTheme"
import styles from "../../../paginas/inicio/Header/HeaderInicio.module.css"

export default function HandednessToggle() {
  const { mode, toggleMode } = useHandedness()
  const isDark = useIsDark()

  return (
    <button
      onClick={toggleMode}
      className={styles.headerButton}
      aria-label="Cambiar lateralidad"
    >
      <span className={`${styles.iconWrap} ${styles.iconWrapLateralidad}`}>
        {(() => {
          const staticSrc = isDark ? "/hand-static-dark.png" : "/hand-static-light.png"
          const staticInvert = isDark ? (mode === "left") : (mode === "right")
          const staticClass = `${styles.iconStatic} ${staticInvert ? styles.invertXImg : ""}`
          const hoverSrc = isDark ? "/hand-hover-dark.gif" : "/hand-hover-light.gif"
          const hoverInvert = isDark ? (mode === "left") : (mode === "right")
          const hoverClass = `${styles.iconHoverGif} ${hoverInvert ? styles.invertX : ""}`
          return (
            <>
              <img src={staticSrc} alt="Lateralidad" width={28} height={28} className={staticClass} loading="eager" decoding="sync" fetchPriority="high" />
              <img src={hoverSrc} alt="Lateralidad animada" width={28} height={28} className={hoverClass} loading="eager" decoding="sync" fetchPriority="high" />
            </>
          )
        })()}
      </span>
      <span>{mode === "left" ? "Zurdo" : "Diestro"}</span>
    </button>
  )
}
