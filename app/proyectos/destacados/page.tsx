"use client"

import { ProjectCard } from "@/components/project-card"
import { usePortfolio } from "@/lib/context/portfolio-context"
import { translations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function DestacadosPage() {
  const { language } = usePortfolio()
  const t = translations[language].projects.featured
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Plataforma completa de comercio electrónico con sistema de pagos integrado, gestión de inventario y panel de administración.",
      image: "/ecommerce-platform-concept.png",
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 2,
      title: "Portfolio Generator",
      description:
        "Generador automático de portfolios para desarrolladores con plantillas personalizables y exportación a múltiples formatos.",
      image: "/creative-portfolio-layout.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 3,
      title: "Task Management App",
      description:
        "Aplicación de gestión de tareas con colaboración en tiempo real, notificaciones y sincronización entre dispositivos.",
      image: "/task-management-interface.png",
      technologies: ["TypeScript", "WebSockets", "Redis", "React"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 1024) {
        setCurrentIndex((prev) => (prev + 1) % projects.length)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [projects.length])

  useEffect(() => {
    if (scrollRef.current && window.innerWidth < 1024) {
      const cardWidth = scrollRef.current.scrollWidth / projects.length
      scrollRef.current.scrollTo({
        left: cardWidth * currentIndex,
        behavior: "smooth",
      })
    }
  }, [currentIndex, projects.length])

  const scrollPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const scrollNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  return (
    <div className="min-h-[92vh] w-full flex items-center justify-center bg-background overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-balance text-foreground">{t.title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground text-balance">{t.subtitle}</p>
        </div>

        <div className="relative">
          <div className="block lg:hidden">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar"
            >
              {projects.map((project) => (
                <div key={project.id} className="flex-shrink-0 w-full snap-center flex justify-center px-2">
                  <div className="w-full max-w-sm">
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      technologies={project.technologies}
                      demoUrl={project.demoUrl}
                      githubUrl={project.githubUrl}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg bg-background/95 backdrop-blur-sm hover:bg-background z-10"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg bg-background/95 backdrop-blur-sm hover:bg-background z-10"
              onClick={scrollNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="flex justify-center gap-2 mt-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/30"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                demoUrl={project.demoUrl}
                githubUrl={project.githubUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
