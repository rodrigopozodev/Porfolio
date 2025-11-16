"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import KineticTestimonial, { Testimonial } from "@/components/ui/kinetic-testimonials"
import { Button } from "@/components/ui/button"
import { Announcement, AnnouncementTitle } from "@/components/ui/announcement"
// Eliminamos Supabase y usamos API local (SQLite)
// Eliminamos requisito de autenticación para el formulario
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/i18n/translations"

export function TestimonialsSection() {
  const loading = false
  const { language } = useLanguage()
  const tTestimonials = translations[language].testimonials
  const [dbTestimonials, setDbTestimonials] = useState<Testimonial[]>([])
  const [reviewInput, setReviewInput] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [jobTitleInput, setJobTitleInput] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [lastNameInput, setLastNameInput] = useState("")
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [errors, setErrors] = useState<{ name?: string; lastName?: string; review?: string }>({})

  const isFormValid = useMemo(() => {
    return (
      nameInput.trim().length >= 2 &&
      lastNameInput.trim().length >= 2 &&
      reviewInput.trim().length >= 5
    )
  }, [nameInput, lastNameInput, reviewInput])

  const validateForm = () => {
    const newErrors: { name?: string; lastName?: string; review?: string } = {}
    const nameTrim = nameInput.trim()
    const lastNameTrim = lastNameInput.trim()
    const reviewTrim = reviewInput.trim()

    if (nameTrim.length < 2) {
      newErrors.name = language === 'es' ? 'Nombre demasiado corto' : 'Name is too short'
    }
    if (lastNameTrim.length < 2) {
      newErrors.lastName = language === 'es' ? 'Apellidos demasiado cortos' : 'Last name is too short'
    }
    if (reviewTrim.length < 5) {
      newErrors.review = language === 'es' ? 'La recomendación debe tener al menos 5 caracteres' : 'Recommendation must be at least 5 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const staticTestimonials: Testimonial[] = useMemo(() => {
    if (language === 'en') {
      return [
        { name: "Ana López", handle: "Frontend Engineer @ TechCo", review: "Working with Rodrigo was super efficient. Great attention to detail.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
        { name: "Carlos Méndez", handle: "Product Manager", review: "Excellent communication and on-time delivery. 100% recommended.", avatar: "https://randomuser.me/api/portraits/men/59.jpg" },
        { name: "Lucía García", handle: "UX Designer", review: "Proposed creative and scalable solutions for our project.", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
        { name: "Javier Ruiz", handle: "Fullstack Developer", review: "Clean code and good practices. Very professional.", avatar: "https://randomuser.me/api/portraits/men/62.jpg" },
        { name: "Marta Fernández", handle: "QA Engineer", review: "Identified issues and proposed solutions quickly.", avatar: "https://randomuser.me/api/portraits/women/46.jpg" },
        { name: "Pedro Sánchez", handle: "Data Analyst", review: "Delivered clear metrics and data-driven decisions.", avatar: "https://randomuser.me/api/portraits/men/56.jpg" },
        { name: "Laura Torres", handle: "Product Owner", review: "Strong business alignment and focus on value.", avatar: "https://randomuser.me/api/portraits/women/61.jpg" },
        { name: "Diego Romero", handle: "DevOps Engineer", review: "Stable pipelines and surprise-free deployments.", avatar: "https://randomuser.me/api/portraits/men/54.jpg" },
        { name: "Sofía Núñez", handle: "UI Engineer", review: "Thoughtful microinteractions and impeccable accessibility.", avatar: "https://randomuser.me/api/portraits/women/53.jpg" },
        { name: "Andrés Pérez", handle: "Tech Lead", review: "Sound technical judgment and calm leadership.", avatar: "https://randomuser.me/api/portraits/men/63.jpg" },
        { name: "Julia Herrera", handle: "Backend Developer", review: "Well-designed and documented APIs.", avatar: "https://randomuser.me/api/portraits/women/57.jpg" },
        { name: "Marcos Ortiz", handle: "Mobile Engineer", review: "Smooth mobile integrations and optimal performance.", avatar: "https://randomuser.me/api/portraits/men/55.jpg" },
        { name: "Valeria Gómez", handle: "Scrum Master", review: "The team's dynamics improved noticeably.", avatar: "https://randomuser.me/api/portraits/women/49.jpg" },
        { name: "Sergio Alonso", handle: "Security Engineer", review: "Security best practices from the start.", avatar: "https://randomuser.me/api/portraits/men/50.jpg" },
        { name: "Elena Ruiz", handle: "Content Strategist", review: "Clear and consistent messaging across the site.", avatar: "https://randomuser.me/api/portraits/women/64.jpg" },
        { name: "Nicolás Cabrera", handle: "SRE", review: "Observability and alerts finely tuned.", avatar: "https://randomuser.me/api/portraits/men/58.jpg" },
        { name: "Carolina Vega", handle: "Marketing Specialist", review: "Landing pages with superior conversion.", avatar: "https://randomuser.me/api/portraits/women/60.jpg" },
        { name: "Tomás Medina", handle: "Researcher", review: "Fast prototypes that validated hypotheses.", avatar: "https://randomuser.me/api/portraits/men/66.jpg" },
        { name: "Daniela Rojas", handle: "Project Manager", review: "On-time delivery and flawless management.", avatar: "https://randomuser.me/api/portraits/women/58.jpg" },
        { name: "Bruno Castillo", handle: "Software Architect", review: "Solid, scalable architecture.", avatar: "https://randomuser.me/api/portraits/men/51.jpg" },
        { name: "Irene Morales", handle: "QA Lead", review: "Test coverage improved the product.", avatar: "https://randomuser.me/api/portraits/women/52.jpg" },
      ]
    }
    return [
      { name: "Ana López", handle: "Frontend Engineer @ TechCo", review: "Trabajar con Rodrigo fue súper eficiente. Gran atención al detalle.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
      { name: "Carlos Méndez", handle: "Product Manager", review: "Excelente comunicación y entrega puntual. Recomendado al 100%.", avatar: "https://randomuser.me/api/portraits/men/59.jpg" },
      { name: "Lucía García", handle: "UX Designer", review: "Propuso soluciones creativas y escalables para nuestro proyecto.", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
      { name: "Javier Ruiz", handle: "Fullstack Developer", review: "Código limpio y buenas prácticas. Muy profesional.", avatar: "https://randomuser.me/api/portraits/men/62.jpg" },
      { name: "Marta Fernández", handle: "QA Engineer", review: "Detectó problemas y propuso soluciones con rapidez.", avatar: "https://randomuser.me/api/portraits/women/46.jpg" },
      { name: "Pedro Sánchez", handle: "Data Analyst", review: "Aportó métricas claras y decisiones basadas en datos.", avatar: "https://randomuser.me/api/portraits/men/56.jpg" },
      { name: "Laura Torres", handle: "Product Owner", review: "Gran alineación con negocio y foco en valor.", avatar: "https://randomuser.me/api/portraits/women/61.jpg" },
      { name: "Diego Romero", handle: "DevOps Engineer", review: "Pipelines estables y despliegues sin sorpresas.", avatar: "https://randomuser.me/api/portraits/men/54.jpg" },
      { name: "Sofía Núñez", handle: "UI Engineer", review: "Microinteracciones cuidadas y accesibilidad impecable.", avatar: "https://randomuser.me/api/portraits/women/53.jpg" },
      { name: "Andrés Pérez", handle: "Tech Lead", review: "Buen criterio técnico y liderazgo calmado.", avatar: "https://randomuser.me/api/portraits/men/63.jpg" },
      { name: "Julia Herrera", handle: "Backend Developer", review: "APIs bien diseñadas y documentadas.", avatar: "https://randomuser.me/api/portraits/women/57.jpg" },
      { name: "Marcos Ortiz", handle: "Mobile Engineer", review: "Integraciones móviles fluidas y rendimiento óptimo.", avatar: "https://randomuser.me/api/portraits/men/55.jpg" },
      { name: "Valeria Gómez", handle: "Scrum Master", review: "La dinámica del equipo mejoró notablemente.", avatar: "https://randomuser.me/api/portraits/women/49.jpg" },
      { name: "Sergio Alonso", handle: "Security Engineer", review: "Buenas prácticas de seguridad desde el inicio.", avatar: "https://randomuser.me/api/portraits/men/50.jpg" },
      { name: "Elena Ruiz", handle: "Content Strategist", review: "Mensajes claros y consistentes en todo el sitio.", avatar: "https://randomuser.me/api/portraits/women/64.jpg" },
      { name: "Nicolás Cabrera", handle: "SRE", review: "Observabilidad y alertas bien afinadas.", avatar: "https://randomuser.me/api/portraits/men/58.jpg" },
      { name: "Carolina Vega", handle: "Marketing Specialist", review: "Landing pages con conversión superior.", avatar: "https://randomuser.me/api/portraits/women/60.jpg" },
      { name: "Tomás Medina", handle: "Researcher", review: "Prototipos rápidos que validaron hipótesis.", avatar: "https://randomuser.me/api/portraits/men/66.jpg" },
      { name: "Daniela Rojas", handle: "Project Manager", review: "Entrega a tiempo y gestión impecable.", avatar: "https://randomuser.me/api/portraits/women/58.jpg" },
      { name: "Bruno Castillo", handle: "Software Architect", review: "Arquitectura sólida y escalable.", avatar: "https://randomuser.me/api/portraits/men/51.jpg" },
      { name: "Irene Morales", handle: "QA Lead", review: "La cobertura de tests mejoró el producto.", avatar: "https://randomuser.me/api/portraits/women/52.jpg" },
    ]
  }, [language])

  useEffect(() => {
    const loadTestimonials = async (lang: string) => {
      try {
        const res = await fetch(`/api/testimonials?language=${lang}`, { cache: "no-store" })
        if (!res.ok) return
        const data = await res.json()
        if (Array.isArray(data)) {
          let mapped = data.map((d: any) => ({
            name: d.name,
            handle: String(d.handle ?? ""),
            review: lang === 'en' ? String(d.review_en ?? d.review) : String(d.review),
            avatar: d.avatar || null,
          }))
          // Fallback de cliente: si estamos en EN y falta review_en, usamos el original
          if (lang === 'en') {
            mapped = mapped.map((item, idx) => {
              const hasEn = String(data[idx]?.review_en ?? "").trim().length > 0
              if (!hasEn) return { ...item, review: String(data[idx]?.review ?? item.review) }
              return item
            })
          }
          setDbTestimonials(mapped)
        }
      } catch {}
    }
    loadTestimonials(language)
  }, [])

  useEffect(() => {
    const loadTestimonials = async (lang: string) => {
      try {
        const res = await fetch(`/api/testimonials?language=${lang}`, { cache: "no-store" })
        if (!res.ok) return
        const data = await res.json()
        if (Array.isArray(data)) {
          let mapped = data.map((d: any) => ({
            name: d.name,
            handle: String(d.handle ?? ""),
            review: lang === 'en' ? String(d.review_en ?? d.review) : String(d.review),
            avatar: d.avatar || null,
          }))
          if (lang === 'en') {
            mapped = mapped.map((item, idx) => {
              const hasEn = String(data[idx]?.review_en ?? "").trim().length > 0
              if (!hasEn) return { ...item, review: String(data[idx]?.review ?? item.review) }
              return item
            })
          }
          setDbTestimonials(mapped)
        }
      } catch {}
    }
    loadTestimonials(language)
  }, [language])

  const allTestimonials = useMemo(() => {
    const staticLeftCount = Math.max(0, staticTestimonials.length - dbTestimonials.length)
    const remainingStatic = staticTestimonials.slice(0, staticLeftCount)
    // Primero las reales (db), luego las estáticas restantes hasta que se reemplacen todas
    return [...dbTestimonials, ...remainingStatic]
  }, [staticTestimonials, dbTestimonials])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewInput.trim()) return
    setSubmitting(true)
    const fullNameRaw = `${nameInput.trim()} ${lastNameInput.trim()}`.trim()
    const name = fullNameRaw || (language === 'es' ? 'Usuario' : 'User')
    const avatar = photoPreviewUrl || ""
    const handle = jobTitleInput.trim()

    // Optimistic update: mostrar inmediatamente sin recargar
    // Validar antes de enviar
    const isValid = validateForm()
    if (!isValid) {
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          handle,
          review: reviewInput.trim(),
          language,
          avatar: photoPreviewUrl || null,
        }),
      })
      if (res.ok) {
        const inserted = await res.json()
        setDbTestimonials((prev) => [
          {
            name: inserted.name,
            handle: String(inserted.handle ?? ""),
            review: language === 'en' ? String(inserted.review_en ?? inserted.review) : String(inserted.review),
            avatar: inserted.avatar || null,
          },
          ...prev,
        ])
        setReviewInput("")
        setJobTitleInput("")
        setNameInput("")
        setLastNameInput("")
        setPhotoFile(null)
        setPhotoPreviewUrl("")
        setErrors({})
        setIsModalOpen(false)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="h-full flex flex-col">

      <KineticTestimonial
        testimonials={allTestimonials}
        className="bg-transparent not-prose flex-1"
        cardClassName="shadow-lg"
        avatarClassName="ring-2 ring-blue-500"
        desktopColumns={2}
        tabletColumns={1}
        mobileColumns={1}
        title={tTestimonials.title}
        subtitle={tTestimonials.subtitle}
      />

      <div className="recommend-btn-wrap mt-auto relative z-10 flex items-center justify-center pointer-events-auto px-2">
        <Announcement movingBorder className="w-full sm:w-auto">
          <AnnouncementTitle className="w-full sm:w-auto">
            <Button
              size="lg"
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-transparent hover:bg-transparent text-black dark:text-white font-semibold transition-all group cta-button cursor-pointer rounded-full px-[clamp(0.75rem,3vw,1rem)] py-[clamp(0.5rem,2vw,0.75rem)] text-[clamp(0.95rem,2.8vw,1.25rem)] w-full sm:w-auto max-w-[min(95vw,480px)] whitespace-normal sm:whitespace-nowrap text-center mx-auto"
            >
              <span className="transition-colors group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent dark:group-hover:from-sky-400 dark:group-hover:to-blue-500">
                {tTestimonials.cta}
              </span>
            </Button>
          </AnnouncementTitle>
        </Announcement>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative z-10 w-[min(92vw,680px)] rounded-lg border bg-popover text-popover-foreground p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[clamp(1rem,2.2vw,1.25rem)] font-semibold">{tTestimonials.title}</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-md px-2 py-1 text-sm hover:bg-foreground/10 cursor-pointer"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[clamp(0.85rem,1.1vw,1rem)] opacity-80" htmlFor="name-input">
                      {tTestimonials.nameLabel}
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className={`w-full rounded-md border p-2 text-sm bg-background ${errors.name ? 'border-red-500' : ''}`}
                      placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                    />
                    {errors.name && (
                      <small className="text-red-600">{errors.name}</small>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[clamp(0.85rem,1.1vw,1rem)] opacity-80" htmlFor="last-name-input">
                      {tTestimonials.lastNameLabel}
                    </label>
                    <input
                      id="last-name-input"
                      type="text"
                      value={lastNameInput}
                      onChange={(e) => setLastNameInput(e.target.value)}
                      className={`w-full rounded-md border p-2 text-sm bg-background ${errors.lastName ? 'border-red-500' : ''}`}
                      placeholder={language === 'es' ? 'Tus apellidos' : 'Your last name(s)'}
                    />
                    {errors.lastName && (
                      <small className="text-red-600">{errors.lastName}</small>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[clamp(0.85rem,1.1vw,1rem)] opacity-80" htmlFor="job-title">
                      {tTestimonials.jobTitleLabel}
                    </label>
                    <input
                      id="job-title"
                      type="text"
                      value={jobTitleInput}
                      onChange={(e) => setJobTitleInput(e.target.value)}
                      className={`w-full rounded-md border p-2 text-sm bg-background`}
                      placeholder={language === 'es' ? 'Ej: Frontend Engineer' : 'e.g., Frontend Engineer'}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[clamp(0.85rem,1.1vw,1rem)] opacity-80" htmlFor="photo-input">
                      {tTestimonials.photoLabel}
                    </label>
                    <input
                      id="photo-input"
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0] ?? null
                        setPhotoFile(f)
                        if (f) {
                          const url = URL.createObjectURL(f)
                          setPhotoPreviewUrl(url)
                        } else {
                          setPhotoPreviewUrl("")
                        }
                      }}
                      className="sr-only"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer"
                    >
                      {tTestimonials.selectFile}
                    </Button>
                  </div>
                </div>
                {photoPreviewUrl && (
                  <div className="mt-1">
                    <img src={photoPreviewUrl} alt="preview" className="w-[clamp(80px,20vw,140px)] aspect-square object-cover rounded-md" />
                  </div>
                )}
                <textarea
                  value={reviewInput}
                  onChange={(e) => setReviewInput(e.target.value)}
                  className={`w-full rounded-md border p-2 text-sm bg-background ${errors.review ? 'border-red-500' : ''}`}
                  placeholder={tTestimonials.textareaPlaceholder}
                  rows={4}
                />
                {errors.review && (
                  <small className="text-red-600">{errors.review}</small>
                )}
                <div className="flex items-center gap-3">
                  <Button type="submit" disabled={submitting || !isFormValid} className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 text-white hover:brightness-110 transition-colors">
                    {submitting ? (language === 'es' ? "Enviando..." : "Sending...") : tTestimonials.send}
                  </Button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}