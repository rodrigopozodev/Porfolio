"use client"
/**
 * ThemeToggle: alterna entre temas light/dark y aplica clases en <html>.
 */

import { useRef } from "react"
import { MoonIcon, MoonIconHandle } from "@/componentes/svg/tema-ocuro/MoonIcon"
import { SunIcon, SunIconHandle } from "@/componentes/svg/tema-claro/SunIcon"
import { useTheme } from "@/componentes/utils/useTheme"
import styles from "../../../paginas/inicio/Header/HeaderInicio.module.css"

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  const sunRef = useRef<SunIconHandle | null>(null)
  const moonRef = useRef<MoonIconHandle | null>(null)

  return (
    <button
      onClick={toggleTheme}
      className={styles.headerButton}
      aria-label="Cambiar tema"
      onMouseEnter={() => { if (isDark) { moonRef.current?.startAnimation() } else { sunRef.current?.startAnimation() } }}
      onMouseLeave={() => { if (isDark) { moonRef.current?.stopAnimation() } else { sunRef.current?.stopAnimation() } }}
    >
      <span className={styles.iconWrap}>
        {!isDark && (
          <SunIcon ref={sunRef} size={16} className={styles.iconSunSvg} />
        )}
        {isDark && (
          <MoonIcon ref={moonRef} size={16} className={styles.iconMoonSvg} />
        )}
      </span>
    </button>
  )
}