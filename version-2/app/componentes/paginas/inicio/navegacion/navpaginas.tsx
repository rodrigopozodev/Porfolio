"use client"

import React, { useEffect, useLayoutEffect, useMemo, useState } from "react"

const NavPaginas = () => {
  const initialCount = typeof window !== "undefined" ? (document.querySelectorAll<HTMLElement>(".page-section").length || 2) : 2
  const [active, setActive] = useState(0)
  const [count, setCount] = useState(initialCount)

  useLayoutEffect(() => {
    const container = document.querySelector<HTMLElement>(".snap-container")
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".page-section"))
    setCount(sections.length || 2)

    if (!container || sections.length === 0) return

    // Establecer página activa antes del primer paint
    try {
      const vis = sections
        .map((s, idx) => ({ idx, rect: s.getBoundingClientRect() }))
        .sort((a, b) => Math.abs(a.rect.top) - Math.abs(b.rect.top))
      const topIdx = vis[0]?.idx ?? 0
      setActive(topIdx)
    } catch {}

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
          aria-label={`Ir a página ${i + 1} de ${count}`}
          onClick={() => goto(i)}
        />
      ))}
    </div>
  )
}

export default NavPaginas