"use client"

import React, { useMemo } from "react"
import Image from "next/image"

export interface Testimonial {
  name: string
  handle: string
  review: string
  avatar?: string | null
  linkedin?: string | null
}

interface Props {
  testimonials?: Testimonial[]
  extraTestimonials?: Testimonial[]
  desktopColumns?: number
  speed?: number
}

const defaultTestimonials: Testimonial[] = [
  { name: "Laura Torres", handle: "Product Owner", review: "Gran alineación con negocio y foco en valor.", avatar: "https://randomuser.me/api/portraits/women/61.jpg" },
  { name: "Sofía Núñez", handle: "UI Engineer", review: "Microinteracciones cuidadas y accesibilidad impecable.", avatar: "https://randomuser.me/api/portraits/women/53.jpg" },
  { name: "Julia Herrera", handle: "Backend Developer", review: "APIs bien diseñadas y documentadas.", avatar: "https://randomuser.me/api/portraits/women/57.jpg" },
  { name: "Nicolás Cabrera", handle: "SRE", review: "Observabilidad y alertas bien afinadas.", avatar: "https://randomuser.me/api/portraits/men/58.jpg" },
  { name: "Tomás Medina", handle: "Researcher", review: "Prototipos rápidos que validaron hipótesis.", avatar: "https://randomuser.me/api/portraits/men/66.jpg" },
  { name: "Bruno Castillo", handle: "Software Architect", review: "Arquitectura sólida y escalable.", avatar: "https://randomuser.me/api/portraits/men/51.jpg" },
]

export default function KineticTestimonial({ testimonials, extraTestimonials, desktopColumns = 2, speed = 2.4 }: Props) {
  const colCountDesktop = Math.max(1, Math.min(6, desktopColumns))
  const baseDuration = Math.max(8, 28 / speed)
  const finalDuration = Math.round((baseDuration * 2 * 0.85 * 0.85 * 0.5) * 100) / 100

  const merged = useMemo(() => {
    if (testimonials && testimonials.length > 0) return testimonials
    const extras = extraTestimonials ?? []
    const defaultCount = defaultTestimonials.length
    const extrasCount = extras.length
    const staticKeep = extrasCount <= defaultCount ? defaultCount : Math.max(0, defaultCount * 2 - extrasCount)
    const prunedDefaults = defaultTestimonials.slice(0, staticKeep)
    return [...prunedDefaults, ...extras]
  }, [testimonials, extraTestimonials])

  const columns = useMemo(() => {
    const cols: Testimonial[][] = Array.from({ length: colCountDesktop }, () => [])
    merged.forEach((t, i) => { cols[i % colCountDesktop].push(t) })
    return cols
  }, [merged, colCountDesktop])

  return (
    <div className="w-full kinetic-mask" style={{ height: "100%" }}>
      <div className={`grid gap-0 h-full ${colCountDesktop === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {columns.map((col, colIdx) => {
          const loopItems = [...col, ...col]
          return (
            <div key={`col-${colIdx}`} className={`kinetic-column ${colIdx % 2 === 1 ? 'reverse' : ''} relative h-full overflow-hidden`}>
              <div
                className="kinetic-inner flex flex-col gap-0 transform-gpu"
                style={{
                  // @ts-ignore
                  "--kinetic-duration": `${finalDuration}s`,
                  // @ts-ignore
                  "--kinetic-delay": `0s`,
                }}
              >
                {loopItems.map((t, idx) => (
                  <div
                    key={`${t.name}-${idx}`}
                    className="kt-card group relative w-full overflow-hidden p-4 bg-transparent rounded-xl shrink-0"
                    style={{ flex: "0 0 25%" }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-300/50 via-blue-200/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-sky-500/30 dark:via-blue-500/20" />
                    <p className="kt-review text-sm leading-relaxed mb-4">{t.review}</p>
                    <div className="kt-footer flex items-center gap-3">
                      {t.avatar && (
                        <div className="kt-avatar h-10 w-10 rounded-full ring-2 ring-blue-500 relative overflow-hidden">
                          <Image
                            src={t.avatar}
                            alt={t.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="kt-meta min-w-0">
                        <p className="kt-name text-sm font-semibold">{t.name}</p>
                        {t.handle && <p className="kt-handle text-xs text-neutral-500 dark:text-white/70">{t.handle}</p>}
                        {t.linkedin && (
                          <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="kt-linkedin text-xs text-blue-600 dark:text-blue-400 underline">
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}