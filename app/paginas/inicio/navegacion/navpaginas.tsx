"use client"

import React, { useEffect, useLayoutEffect, useMemo, useState } from "react"
import { HomeIcon, HomeIconHandle } from "@/componentes/svg/inicio/HomeIcon"
import { SquareStackIcon, SquareStackIconHandle } from "@/componentes/svg/proyectos/SquareStackIcon"
import { logger } from "@/lib/logger"
import { useTranslation } from "@/componentes/utils/useTranslation"

const NavPaginas = () => {
  const t = useTranslation()
  const initialCount = typeof window !== "undefined" ? (document.querySelectorAll<HTMLElement>(".page-section").length || 2) : 2
  const [active, setActive] = useState(0)
  const [count, setCount] = useState(initialCount)
  const [labels, setLabels] = useState<string[]>([])

  useLayoutEffect(() => {
    const container = document.querySelector<HTMLElement>(".snap-container")
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".page-section"))
    setCount(sections.length || 2)
    try {
      const ls = sections.map((s) => {
        const id = s.id?.trim() || ""
        if (id.toLowerCase() === "inicio") return t.nav.inicio
        if (id.toLowerCase() === "proyectos") return t.nav.proyectos
        return id ? id : "Sección"
      })
      setLabels(ls)
    } catch (error) {
      logger.warn("Failed to extract section labels", { error })
    }

    if (!container || sections.length === 0) return

    // Establecer página activa antes del primer paint
    try {
      const vis = sections
        .map((s, idx) => ({ idx, rect: s.getBoundingClientRect() }))
        .sort((a, b) => Math.abs(a.rect.top) - Math.abs(b.rect.top))
      const topIdx = vis[0]?.idx ?? 0
      setActive(topIdx)
    } catch (error) {
      logger.warn("Failed to set initial active section", { error })
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.6)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (top) {
          const idx = sections.indexOf(top.target as HTMLElement)
          if (idx !== -1) setActive(idx)
        }
      },
      { root: container, threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] }
    )

    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const dots = useMemo(() => Array.from({ length: Math.max(count, 0) }), [count])
  const homeRef = React.useRef<HomeIconHandle | null>(null)
  const projectsRef = React.useRef<SquareStackIconHandle | null>(null)
  // Los iconos se muestran siempre para primer y último punto
  const [showText, setShowText] = useState(true)
  const topButtonRef = React.useRef<HTMLButtonElement | null>(null)
  const bottomButtonRef = React.useRef<HTMLButtonElement | null>(null)
  const topTextRef = React.useRef<HTMLSpanElement | null>(null)
  const bottomTextRef = React.useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      const margin = 8
      const iconW = 18
      const padX = 16 /* padding horizontal total 8+8 */
      const topTextW = (topTextRef.current?.offsetWidth ?? 0)
      const bottomTextW = (bottomTextRef.current?.offsetWidth ?? 0)
      const topW = Math.max(iconW, topTextW) + padX
      const bottomW = Math.max(iconW, bottomTextW) + padX
      const topCenter = topButtonRef.current ? (topButtonRef.current.getBoundingClientRect().left + topButtonRef.current.getBoundingClientRect().width / 2) : vw / 2
      const bottomCenter = bottomButtonRef.current ? (bottomButtonRef.current.getBoundingClientRect().left + bottomButtonRef.current.getBoundingClientRect().width / 2) : vw / 2
      const okTop = (topCenter - topW / 2) >= margin && (topCenter + topW / 2) <= (vw - margin)
      const okBottom = (bottomCenter - bottomW / 2) >= margin && (bottomCenter + bottomW / 2) <= (vw - margin)
      setShowText(okTop && okBottom)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const goto = (index: number) => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".page-section"))
    const el = sections[index]
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="nav-dots" aria-label={`Navegación páginas (${count})`}>
      {dots.map((_, i) => (
        <button
          key={i}
          className={`nav-dot ${i === active ? "active" : ""}`}
          aria-label={`Ir a ${labels[i] ?? `página ${i + 1}`} de ${count}`}
          aria-current={i === active ? "page" : undefined}
          onClick={() => goto(i)}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" && i > 0) {
              e.preventDefault()
              goto(i - 1)
            } else if (e.key === "ArrowDown" && i < count - 1) {
              e.preventDefault()
              goto(i + 1)
            }
          }}
          onMouseEnter={() => {
            if (i === 0) homeRef.current?.startAnimation()
            if (i === count - 1) projectsRef.current?.startAnimation()
            // recalcular con medición de texto
            const vw = window.innerWidth
            const margin = 2
            const iconW = 4.5
            const padX = 4
            const topTextW = (topTextRef.current?.offsetWidth ?? 0)
            const bottomTextW = (bottomTextRef.current?.offsetWidth ?? 0)
            const topW = Math.max(iconW, topTextW) + padX
            const bottomW = Math.max(iconW, bottomTextW) + padX
            const topCenter = topButtonRef.current ? (topButtonRef.current.getBoundingClientRect().left + topButtonRef.current.getBoundingClientRect().width / 2) : vw / 2
            const bottomCenter = bottomButtonRef.current ? (bottomButtonRef.current.getBoundingClientRect().left + bottomButtonRef.current.getBoundingClientRect().width / 2) : vw / 2
            const okTop = (topCenter - topW / 2) >= margin && (topCenter + topW / 2) <= (vw - margin)
            const okBottom = (bottomCenter - bottomW / 2) >= margin && (bottomCenter + bottomW / 2) <= (vw - margin)
            setShowText(okTop && okBottom)
          }}
          onMouseLeave={() => { if (i === 0) homeRef.current?.stopAnimation(); if (i === count - 1) projectsRef.current?.stopAnimation(); }}
          ref={i === 0 ? topButtonRef : (i === count - 1 ? bottomButtonRef : undefined)}
        >
          <span className="sr-only">{labels[i] ?? `Sección ${i + 1}`}</span>
          {i === 0 || i === count - 1 ? (
            <span className={`nav-label nav-label-icon ${showText ? "has-text" : ""}`}>
              {i === 0 ? <HomeIcon ref={homeRef} size={4.5} /> : <SquareStackIcon ref={projectsRef} size={4.5} />}
              {/* El texto siempre se renderiza para medir su ancho, pero se oculta si no cabe */}
              <span ref={i === 0 ? topTextRef : bottomTextRef} className="nav-label-text">{labels[i] ?? (i === 0 ? "Inicio" : "Proyectos")}</span>
              {!showText && null}
            </span>
          ) : (
            <span className="nav-label">{labels[i] ?? `Sección ${i + 1}`}</span>
          )}
        </button>
      ))}
    </div>
  )
}

export default NavPaginas