"use client"

import React, { useEffect, useMemo, useState } from "react"
import KineticTestimonial, { Testimonial } from "@/components/ui/kinetic-testimonials"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"
import { useAuth } from "@/context/AuthContext"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function TestimonialsSection() {
  const { user, loading, signInWithLinkedIn, signOut } = useAuth()
  const { language } = useLanguage()
  const tTestimonials = translations[language].testimonials
  const [dbTestimonials, setDbTestimonials] = useState<Testimonial[]>([])
  const [reviewInput, setReviewInput] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const staticTestimonials: Testimonial[] = useMemo(
    () => [
      {
        name: "Ana López",
        handle: "Frontend Engineer @ TechCo",
        review: "Trabajar con Rodrigo fue súper eficiente. Gran atención al detalle.",
        avatar: "https://i.pravatar.cc/100?img=1",
      },
      {
        name: "Carlos Méndez",
        handle: "Product Manager",
        review: "Excelente comunicación y entrega puntual. Recomendado al 100%.",
        avatar: "https://i.pravatar.cc/100?img=2",
      },
      {
        name: "Lucía García",
        handle: "UX Designer",
        review: "Propuso soluciones creativas y escalables para nuestro proyecto.",
        avatar: "https://i.pravatar.cc/100?img=3",
      },
      {
        name: "Javier Ruiz",
        handle: "Fullstack Developer",
        review: "Código limpio y buenas prácticas. Muy profesional.",
        avatar: "https://i.pravatar.cc/100?img=4",
      },
      {
        name: "Marta Fernández",
        handle: "QA Engineer",
        review: "Detectó problemas y propuso soluciones con rapidez.",
        avatar: "https://i.pravatar.cc/100?img=5",
      },
      {
        name: "Pedro Sánchez",
        handle: "Data Analyst",
        review: "Aportó métricas claras y decisiones basadas en datos.",
        avatar: "https://i.pravatar.cc/100?img=6",
      },
      {
        name: "Laura Torres",
        handle: "Product Owner",
        review: "Gran alineación con negocio y foco en valor.",
        avatar: "https://i.pravatar.cc/100?img=7",
      },
      {
        name: "Diego Romero",
        handle: "DevOps Engineer",
        review: "Pipelines estables y despliegues sin sorpresas.",
        avatar: "https://i.pravatar.cc/100?img=8",
      },
      {
        name: "Sofía Núñez",
        handle: "UI Engineer",
        review: "Microinteracciones cuidadas y accesibilidad impecable.",
        avatar: "https://i.pravatar.cc/100?img=9",
      },
      {
        name: "Andrés Pérez",
        handle: "Tech Lead",
        review: "Buen criterio técnico y liderazgo calmado.",
        avatar: "https://i.pravatar.cc/100?img=10",
      },
      {
        name: "Julia Herrera",
        handle: "Backend Developer",
        review: "APIs bien diseñadas y documentadas.",
        avatar: "https://i.pravatar.cc/100?img=11",
      },
      {
        name: "Marcos Ortiz",
        handle: "Mobile Engineer",
        review: "Integraciones móviles fluidas y rendimiento óptimo.",
        avatar: "https://i.pravatar.cc/100?img=12",
      },
      {
        name: "Valeria Gómez",
        handle: "Scrum Master",
        review: "La dinámica del equipo mejoró notablemente.",
        avatar: "https://i.pravatar.cc/100?img=13",
      },
      {
        name: "Sergio Alonso",
        handle: "Security Engineer",
        review: "Buenas prácticas de seguridad desde el inicio.",
        avatar: "https://i.pravatar.cc/100?img=14",
      },
      {
        name: "Elena Ruiz",
        handle: "Content Strategist",
        review: "Mensajes claros y consistentes en todo el sitio.",
        avatar: "https://i.pravatar.cc/100?img=15",
      },
      {
        name: "Nicolás Cabrera",
        handle: "SRE",
        review: "Observabilidad y alertas bien afinadas.",
        avatar: "https://i.pravatar.cc/100?img=16",
      },
      {
        name: "Carolina Vega",
        handle: "Marketing Specialist",
        review: "Landing pages con conversión superior.",
        avatar: "https://i.pravatar.cc/100?img=17",
      },
      {
        name: "Tomás Medina",
        handle: "Researcher",
        review: "Prototipos rápidos que validaron hipótesis.",
        avatar: "https://i.pravatar.cc/100?img=18",
      },
      {
        name: "Daniela Rojas",
        handle: "Project Manager",
        review: "Entrega a tiempo y gestión impecable.",
        avatar: "https://i.pravatar.cc/100?img=19",
      },
      {
        name: "Bruno Castillo",
        handle: "Software Architect",
        review: "Arquitectura sólida y escalable.",
        avatar: "https://i.pravatar.cc/100?img=20",
      },
      {
        name: "Irene Morales",
        handle: "QA Lead",
        review: "La cobertura de tests mejoró el producto.",
        avatar: "https://i.pravatar.cc/100?img=21",
      },
    ],
    []
  )

  useEffect(() => {
    const client = supabase
    if (!client) return
    const fetchTestimonials = async () => {
      const { data, error } = await client
        .from("testimonials")
        .select("name, handle, review, avatar, created_at")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setDbTestimonials(
          data.map((d) => ({ name: d.name, handle: d.handle, review: d.review, avatar: d.avatar }))
        )
      }
    }
    fetchTestimonials()

    const channel = client
      .channel("public:testimonials")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "testimonials" },
        (payload: any) => {
          const newItem = payload.new
          setDbTestimonials((prev) => [{
            name: newItem.name,
            handle: newItem.handle,
            review: newItem.review,
            avatar: newItem.avatar,
          }, ...prev])
        }
      )
      .subscribe()

    return () => {
      client.removeChannel(channel)
    }
  }, [])

  const allTestimonials = useMemo(() => {
    return [...staticTestimonials, ...dbTestimonials]
  }, [staticTestimonials, dbTestimonials])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !reviewInput.trim()) return
    setSubmitting(true)

    const meta: any = user.user_metadata || {}
    const name = meta.name || `${meta.given_name ?? ""} ${meta.family_name ?? ""}`.trim() || "Usuario LinkedIn"
    const avatar = meta.picture || meta.avatar_url || "https://i.pravatar.cc/100?u=linkedin"
    const handle = meta.headline || meta.job_title || meta.email || "LinkedIn"

    const client = supabase
    if (!client) return
    const { error } = await client.from("testimonials").insert({
      name,
      handle,
      review: reviewInput.trim(),
      avatar,
    })
    if (!error) {
      setReviewInput("")
    }
    setSubmitting(false)
  }

  return (
    <div className="space-y-4">

      <KineticTestimonial
        testimonials={allTestimonials}
        className="bg-transparent not-prose"
        cardClassName="shadow-lg"
        avatarClassName="ring-2 ring-blue-500"
        desktopColumns={2}
        tabletColumns={1}
        mobileColumns={1}
        title={tTestimonials.title}
        subtitle={tTestimonials.subtitle}
      />

      {!loading && !user && (
        <div className="flex items-center justify-center">
          <Button 
            variant="secondary" 
            className="w-full min-[900px]:w-auto rounded-full justify-center cursor-pointer mx-auto"
            onClick={signInWithLinkedIn}
          >
            Realizar Recomendación
          </Button>
        </div>
      )}

      {!loading && user && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            value={reviewInput}
            onChange={(e) => setReviewInput(e.target.value)}
            className="w-full rounded-md border p-2 text-sm bg-background"
            placeholder="Escribe tu recomendación profesional aquí..."
            rows={4}
          />
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={submitting || !reviewInput.trim()} className="cursor-pointer">
              {submitting ? "Enviando..." : "Enviar recomendación"}
            </Button>
            <Button variant="outline" onClick={signOut} className="cursor-pointer">
              Cerrar sesión
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}