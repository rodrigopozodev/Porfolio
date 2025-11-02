"use client"

import React, { useMemo, useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

export interface Testimonial {
  name: string
  handle: string
  review: string
  avatar: string
}

interface KineticTestimonialProps {
  testimonials?: Testimonial[]
  className?: string
  cardClassName?: string
  avatarClassName?: string
  desktopColumns?: number
  tabletColumns?: number
  mobileColumns?: number
  speed?: number
  title?: string
  subtitle?: string
}

export default function KineticTestimonial({
  testimonials = [],
  className = "",
  cardClassName = "",
  avatarClassName = "",
  desktopColumns = 2,
  tabletColumns = 2,
  mobileColumns = 2,
  speed = 2.4,
  title,
  subtitle,
}: KineticTestimonialProps) {
  // Respetar la cantidad de columnas solicitadas (desktopColumns)
  const colCountDesktop = Math.max(1, Math.min(6, desktopColumns))
  const baseDuration = Math.max(8, 28 / speed) // menor duración = más rápido
  // Reducir velocidad 50% en todas las pantallas: duración x2
  const finalDuration = Math.round((baseDuration * 2) * 100) / 100

  // Distribuir testimonios en columnas de forma uniforme
  const columns = useMemo(() => {
    const cols: Testimonial[][] = Array.from({ length: colCountDesktop }, () => [])
    testimonials.forEach((t, i) => {
      cols[i % colCountDesktop].push(t)
    })
    return cols
  }, [testimonials, colCountDesktop])

  // Refs y estado para rellenar huecos y evitar espacios en columnas cortas
  const innerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [spacers, setSpacers] = useState<number[]>(Array(colCountDesktop).fill(0))
  const [isNarrow, setIsNarrow] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1300px)')
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      // @ts-ignore
      setIsNarrow(e.matches ?? e.currentTarget.matches)
    }
    // inicial
    setIsNarrow(mq.matches)
    // suscribirse a cambios
    mq.addEventListener ? mq.addEventListener('change', handler as any) : mq.addListener(handler as any)
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', handler as any) : mq.removeListener(handler as any)
    }
  }, [])

  useEffect(() => {
    // Recalcular espaciadores tras render inicial
    const nextSpacers = [...spacers]
    for (let i = 0; i < columns.length; i++) {
      const inner = innerRefs.current[i]
      const container = inner?.parentElement
      if (!inner || !container) continue
      const baseHeight = inner.scrollHeight
      const desiredHeight = container.clientHeight * 2
      const missing = Math.max(0, desiredHeight - baseHeight)
      const spacer = Math.floor(missing / 2)
      nextSpacers[i] = spacer
    }
    // Solo actualiza si cambio algo para evitar bucles
    if (nextSpacers.some((v, idx) => v !== spacers[idx])) {
      setSpacers(nextSpacers)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns])

  return (
    <div className={`w-full ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6 text-center px-3">
          {title && (
            <h3 className="font-bold bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500 bg-clip-text text-transparent whitespace-nowrap tracking-tight max-w-full text-[clamp(0.95rem,8cqw,2.3rem)]">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-2 text-xs min-[700px]:text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}

      <div className={`relative overflow-hidden h-[520px] min-[900px]:h-[560px] kinetic-mask`}>

        <div
          className={
            `grid gap-4 h-full ` +
            // columnas por breakpoint (enumeradas para Tailwind JIT)
            (mobileColumns === 1 ? 'grid-cols-1 ' : mobileColumns === 2 ? 'grid-cols-2 ' : 'grid-cols-3 ') +
            (tabletColumns === 1 ? 'sm:grid-cols-1 ' : tabletColumns === 2 ? 'sm:grid-cols-2 ' : 'sm:grid-cols-3 ') +
            // En desktop, usar 1 columna en lg y aplicar el número deseado solo en xl+
            (desktopColumns === 1 ? 'lg:grid-cols-1 xl:grid-cols-1 ' : desktopColumns === 2 ? 'lg:grid-cols-1 xl:grid-cols-2 ' : 'lg:grid-cols-1 xl:grid-cols-3 ')
          }
        >
          {columns.map((col, colIdx) => {
            // duplicamos para bucle sin cortes aparentes (top->bottom)
            const loopItems = [...col, ...col]
            return (
              <div
                key={`col-${colIdx}`}
                className={`kinetic-column ${colIdx % 2 === 1 ? 'reverse' : ''} relative h-full overflow-hidden ${colIdx > 0 ? 'max-[1300px]:hidden' : ''}`}
              >
                <div
                  ref={(el) => { innerRefs.current[colIdx] = el; }}
                  className="kinetic-inner flex flex-col gap-4 will-change-transform transform-gpu"
                  style={{
                    // CSS var consumida por globals.css para duración
                    // @ts-ignore
                    "--kinetic-duration": `${finalDuration}s`,
                    // iniciar todas las columnas simultáneamente (sin desfase)
                    // @ts-ignore
                    "--kinetic-delay": `0s`,
                  }}
                >
                  {/* Primera pasada */}
                  {col.map((t, idx) => {
                    const avatar = (t.avatar || '').replace(/`/g, '').trim()
                    return (
                    <Card
                      key={`first-${t.name}-${idx}`}
                      className={`group relative w-full overflow-hidden p-4 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded-xl shrink-0 ${cardClassName} transition-shadow hover:shadow-lg hover:ring-1 hover:ring-blue-200 dark:hover:ring-blue-400`}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-200/40 via-blue-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-sky-500/20 dark:via-blue-500/10" />
                      <p className="text-sm leading-relaxed mb-4">“{t.review}”</p>
                      <div className="flex items-center gap-3">
                        <img
                          src={avatar}
                          alt={t.name}
                          className={`h-10 w-10 rounded-full object-cover ring-2 ring-blue-500 ${avatarClassName}`}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold">{t.name}</p>
                          <p className="text-xs text-neutral-500 dark:text-white/70">{t.handle}</p>
                        </div>
                      </div>
                    </Card>
                    )
                  })}
                  {/* Espaciador simétrico para igualar altura requerida */}
                  {!isNarrow && spacers[colIdx] > 0 && (
                    <div className="shrink-0" style={{ height: spacers[colIdx] }} />
                  )}
                  {/* Segunda pasada */}
                  {col.map((t, idx) => {
                    const avatar = (t.avatar || '').replace(/`/g, '').trim()
                    return (
                    <Card
                      key={`second-${t.name}-${idx}`}
                      className={`group relative w-full overflow-hidden p-4 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded-xl shrink-0 ${cardClassName} transition-shadow hover:shadow-lg hover:ring-1 hover:ring-blue-200 dark:hover:ring-blue-400`}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-200/40 via-blue-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-sky-500/20 dark:via-blue-500/10" />
                      <p className="text-sm leading-relaxed mb-4">“{t.review}”</p>
                      <div className="flex items-center gap-3">
                        <img
                          src={avatar}
                          alt={t.name}
                          className={`h-10 w-10 rounded-full object-cover ring-2 ring-blue-500 ${avatarClassName}`}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold">{t.name}</p>
                          <p className="text-xs text-neutral-500 dark:text-white/70">{t.handle}</p>
                        </div>
                      </div>
                    </Card>
                    )
                  })}
                  {/* Segundo espaciador para que ambas mitades midan lo mismo */}
                  {spacers[colIdx] > 0 && (
                    <div className="shrink-0" style={{ height: spacers[colIdx] }} />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}