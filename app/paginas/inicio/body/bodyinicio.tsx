"use client"

import React, { useEffect, useMemo, useState } from "react"
import { logger } from "@/lib/logger"
import { sanitizeName, sanitizeText, sanitizeUrl } from "@/lib/sanitize"
import { useTranslation } from "@/componentes/utils/useTranslation"
import { useLanguage } from "@/componentes/utils/useLanguage"
import { externalUrls, routes } from "@/lib/config"
import TarjetasToggle from "../../../componentes/tarjetas/tarjetasToggle"
import VisitarButton from "../../../componentes/botones/visitar/VisitarButton"
import InformacionButton from "../../../componentes/botones/informacion/InformacionButton"
import ConectarToggle from "../../../componentes/conectar/conectarToggle"
import KineticTestimonial, { Testimonial } from "../../../componentes/testimonios/KineticTestimonial"
import AddReviewButton from "../../../componentes/botones/reseñas/AddReviewButton"
import PalabrasAnimadas from "../../../componentes/palabras-animadas/PalabrasAnimadas"
import VerTrabajosButton from "../../../componentes/botones/ver-trabajos/VerTrabajosButton"

const BodyInicio = () => {
  const t = useTranslation()
  const { language } = useLanguage()
  const [cardFlipped, setCardFlipped] = React.useState(false)
  // El tamaño del nombre se gestiona con CSS (container queries y clamp)
  const [modalOpen, setModalOpen] = useState(false)
  const [nombre, setNombre] = useState("")
  const [puesto, setPuesto] = useState("")
  const [recomendacion, setRecomendacion] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [fotoPreview, setFotoPreview] = useState<string | null>(null)
  const [extras, setExtras] = useState<Testimonial[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/testimonios?language=${language}`, { cache: "no-store" })
        if (!res.ok) {
          logger.warn("Failed to fetch testimonials", { status: res.status, language })
          return
        }
        const rows: unknown[] = await res.json()
        const mapped: Testimonial[] = rows.map((r: any) => ({
          name: r.name,
          handle: r.handle,
          review: r.review,
          avatar: r.avatar ?? null,
          linkedin: r.linkedin ?? null,
        }))
        setExtras(mapped)
      } catch (error) {
        logger.error("Error loading testimonials", error instanceof Error ? error : new Error(String(error)), { language })
      }
    }
    load()
  }, [language])

  const canSubmit = useMemo(() => {
    return nombre.trim().length > 0 && puesto.trim().length > 0 && recomendacion.trim().length > 0
  }, [nombre, puesto, recomendacion])

  const onFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    
    // Validación de archivo
    if (f) {
      // Validar tipo de archivo
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
      if (!allowedTypes.includes(f.type)) {
        logger.warn("Invalid file type uploaded", { type: f.type })
        alert("Solo se permiten imágenes (JPEG, PNG, WebP, GIF)")
        e.target.value = ""
        return
      }
      
      // Validar tamaño (máximo 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (f.size > maxSize) {
        logger.warn("File too large", { size: f.size })
        alert("La imagen no puede exceder 5MB")
        e.target.value = ""
        return
      }
      
      // Limpiar preview anterior
      if (fotoPreview) {
        URL.revokeObjectURL(fotoPreview)
      }
    }
    
    setFotoFile(f)
    setFotoPreview(f ? URL.createObjectURL(f) : null)
  }

  const resetForm = () => {
    setNombre("")
    setPuesto("")
    setRecomendacion("")
    setLinkedin("")
    if (fotoPreview) {
      URL.revokeObjectURL(fotoPreview)
    }
    setFotoFile(null)
    setFotoPreview(null)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    
    // Sanitizar inputs antes de enviar
    const sanitizedName = sanitizeName(nombre.trim())
    const sanitizedHandle = sanitizeText(puesto.trim())
    const sanitizedReview = sanitizeText(recomendacion.trim())
    const sanitizedLinkedin = linkedin.trim() ? sanitizeUrl(linkedin.trim()) : null
    
    // Validar que la sanitización fue exitosa
    if (!sanitizedName || sanitizedName.length === 0) {
      alert(t.validation.nombreRequerido)
      return
    }
    
    if (sanitizedLinkedin === null && linkedin.trim()) {
      alert(t.validation.urlInvalida)
      return
    }
    
    const nuevo: Testimonial = {
      name: sanitizedName,
      handle: sanitizedHandle,
      review: sanitizedReview,
      avatar: fotoPreview ?? null,
      linkedin: sanitizedLinkedin,
    }
    ;(async () => {
      try {
        const res = await fetch(`/api/testimonios`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...nuevo, language }),
        })
        if (res.ok) {
          const inserted = await res.json()
          const mapped: Testimonial = {
            name: inserted.name,
            handle: inserted.handle,
            review: inserted.review,
            avatar: inserted.avatar ?? null,
            linkedin: inserted.linkedin ?? null,
          }
          setExtras((prev) => [mapped, ...prev])
        } else {
          logger.warn("Failed to submit testimonial", { status: res.status })
        }
      } catch (error) {
        logger.error("Error submitting testimonial", error instanceof Error ? error : new Error(String(error)))
      }
      setModalOpen(false)
      resetForm()
    })()
  }

  return (
    <>
      <div className="recomendaciones box">
        <div className="div1">
          <h2 className="titulo">{t.testimonios.titulo}</h2>
        </div>
        <div className="div2"><KineticTestimonial desktopColumns={1} extraTestimonials={extras} /></div>
        <div className="div3">
          <AddReviewButton onClick={() => setModalOpen(true)} />
        </div>
        {modalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) setModalOpen(false)
            }}
          >
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-900 dark:text-white border-2 border-black dark:border-white">
              <div className="mb-4 flex items-center justify-between">
                <h2 id="modal-title" className="text-lg font-semibold">{t.testimonios.nuevaReseña}</h2>
                <button 
                  aria-label={t.testimonios.cerrar} 
                  onClick={() => setModalOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setModalOpen(false)
                  }}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <label className="flex flex-col gap-1">
                  <span>{t.testimonios.nombre}</span>
                  <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="input border-2 border-black dark:border-white rounded-md px-3 py-2 bg-transparent placeholder:text-neutral-500 dark:placeholder:text-neutral-400" placeholder={t.testimonios.nombrePlaceholder} required />
                </label>
                <label className="flex flex-col gap-1">
                  <span>{t.testimonios.puesto}</span>
                  <input type="text" value={puesto} onChange={(e) => setPuesto(e.target.value)} className="input border-2 border-black dark:border-white rounded-md px-3 py-2 bg-transparent placeholder:text-neutral-500 dark:placeholder:text-neutral-400" placeholder={t.testimonios.puestoPlaceholder} required />
                </label>
                <label className="flex flex-col gap-1">
                  <span>{t.testimonios.recomendacion}</span>
                  <textarea value={recomendacion} onChange={(e) => setRecomendacion(e.target.value)} className="textarea border-2 border-black dark:border-white rounded-md px-3 py-2 bg-transparent placeholder:text-neutral-500 dark:placeholder:text-neutral-400" rows={4} placeholder={t.testimonios.recomendacionPlaceholder} required />
                </label>
                <label className="flex flex-col gap-1">
                  <span>{t.testimonios.linkedin}</span>
                  <input type="url" placeholder={t.testimonios.linkedinPlaceholder} value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="input border-2 border-black dark:border-white rounded-md px-3 py-2 bg-transparent placeholder:text-neutral-500 dark:placeholder:text-neutral-400" />
                </label>
                <label className="flex flex-col gap-1">
                  <span>{t.testimonios.foto}</span>
                  <input id="fotoInput" type="file" accept="image/*" onChange={onFotoChange} className="sr-only" />
                  <div className="flex items-center gap-3">
                    <label htmlFor="fotoInput" className="btn border-2 border-black dark:border-white rounded-md px-3 py-2 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white cursor-pointer">{t.testimonios.seleccionarFoto}</label>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">{fotoFile ? fotoFile.name : t.testimonios.ningunaSeleccionada}</span>
                  </div>
                  {fotoPreview && <img src={fotoPreview} alt="Previsualización" className="mt-2 h-16 w-16 rounded-full object-cover" />}
                </label>
                <button type="submit" className="btn border-2 border-black dark:border-white rounded-md px-3 py-2 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white" disabled={!canSubmit}>{t.testimonios.enviar}</button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="personal box">
        <div className="div1">
          <img 
            src="/Rodrigo.png" 
            alt="Rodrigo Pozo Sánchez, desarrollador" 
            loading="eager" 
            decoding="sync" 
            fetchPriority="high" 
          />
        </div>
        <div className="div2">
          <h1 className="nombre">{t.personal.name}</h1>
        </div>
        <div className="div3" role="status" aria-live="polite">
          <PalabrasAnimadas />
        </div>
        <div className="div4">
          <VerTrabajosButton />
        </div>
        <div className="div5"><ConectarToggle /></div>
      </div>
      <div className="destacado box">
        <div className="proyectoDestacado">
          <div className="div1">
            <h2 className="titulo">{t.proyectos.destacado}</h2>
          </div>
          <div className="div2">
            <TarjetasToggle 
              imageSrc="/League Tracker.png" 
              imageName="League Tracker"
              visitUrl={externalUrls.leagueTracker}
              infoHref={routes.leagueTracker}
              onFlipChange={setCardFlipped}
            />
          </div>
          <div className="div3" aria-hidden="true">
            {cardFlipped && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", width: "100%", height: "100%", padding: "0.5rem" }}>
                <InformacionButton href={routes.leagueTracker} className="w-full h-full" />
                <VisitarButton url={externalUrls.leagueTracker} className="w-full h-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default BodyInicio