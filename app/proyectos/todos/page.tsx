"use client"

import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { usePortfolio } from "@/lib/context/portfolio-context"
import { translations } from "@/lib/translations"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function TodosPage() {
  const { language } = usePortfolio()
  const t = translations[language].projects.all
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Plataforma completa de comercio electrónico con gestión de productos, carrito de compras y sistema de pagos integrado.",
      image: "/ecommerce-concept.jpg",
      technologies: ["Next.js", "Stripe", "PostgreSQL"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 2,
      title: "Portfolio Generator",
      description:
        "Generador de portfolios para desarrolladores con plantillas modernas, editor visual y exportación automática.",
      image: "/creative-portfolio-layout.jpg",
      technologies: ["React", "Node.js", "MongoDB"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 3,
      title: "Task Management",
      description:
        "Aplicación de gestión de tareas colaborativa con tableros Kanban, asignaciones y tracking de progreso.",
      image: "/tasks-list-interface.jpg",
      technologies: ["TypeScript", "WebSockets", "Redis"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 4,
      title: "Blog Platform",
      description: "Plataforma de blogs con editor markdown avanzado, sistema de comentarios y SEO optimizado.",
      image: "/blog-concept-design.jpg",
      technologies: ["Next.js", "MDX", "Prisma"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 5,
      title: "Weather App",
      description:
        "Aplicación del clima con pronóstico extendido, geolocalización y alertas meteorológicas personalizadas.",
      image: "/weather-scene.jpg",
      technologies: ["React", "Weather API", "Geolocation"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: 6,
      title: "Chat Application",
      description: "Chat en tiempo real con salas privadas, compartición de archivos y videollamadas integradas.",
      image: "/stylized-chat-bubbles.jpg",
      technologies: ["Socket.io", "WebRTC", "Express"],
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

  const desktopScrollRef = useRef<HTMLDivElement>(null)
  const [desktopIndex, setDesktopIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth >= 1024) {
        setDesktopIndex((prev) => (prev + 1) % projects.length)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [projects.length])

  useEffect(() => {
    if (desktopScrollRef.current && window.innerWidth >= 1024) {
      const cardWidth = 400 + 24 // width + gap
      desktopScrollRef.current.scrollTo({
        left: cardWidth * desktopIndex,
        behavior: "smooth",
      })
    }
  }, [desktopIndex])

  const scrollPrev = () => {
    if (window.innerWidth < 1024) {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    } else {
      setDesktopIndex((prev) => (prev - 1 + projects.length) % projects.length)
    }
  }

  const scrollNext = () => {
    if (window.innerWidth < 1024) {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    } else {
      setDesktopIndex((prev) => (prev + 1) % projects.length)
    }
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-background overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-balance text-foreground">{t.title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground text-balance">{t.subtitle}</p>
        </div>

        <div className="relative">
          {/* Vista carrusel para móvil y tablet */}
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
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg bg-background/95 backdrop-blur-sm hover:bg-background z-10"
              onClick={scrollNext}
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
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

          <div className="hidden lg:block relative">
            <div
              ref={desktopScrollRef}
              className="flex gap-6 overflow-x-hidden scroll-smooth hide-scrollbar"
              style={{ width: "100%", maxWidth: "1248px", margin: "0 auto" }}
            >
              {projects.map((project) => (
                <div key={project.id} className="flex-shrink-0" style={{ width: "400px" }}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    technologies={project.technologies}
                    demoUrl={project.demoUrl}
                    githubUrl={project.githubUrl}
                  />
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 rounded-full shadow-lg bg-background/95 backdrop-blur-sm hover:bg-background z-10"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 rounded-full shadow-lg bg-background/95 backdrop-blur-sm hover:bg-background z-10"
              onClick={scrollNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            <div className="flex justify-center gap-2 mt-6">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setDesktopIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === desktopIndex ? "w-8 bg-primary" : "w-2 bg-primary/30"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
