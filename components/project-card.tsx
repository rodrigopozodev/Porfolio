"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePortfolio } from "@/lib/context/portfolio-context"
import { translations } from "@/lib/translations"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
}

export function ProjectCard({ title, description, image, technologies, demoUrl, githubUrl }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const { language } = usePortfolio()
  const t = translations[language].projects.comingSoon

  return (
    <div
      className="relative w-full h-64 sm:h-72 md:h-80 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card - Image */}
        <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden shadow-xl">
          {/* Imagen con blur */}
          <Image 
            src={image || "/placeholder.svg"} 
            alt={title} 
            fill 
            className="object-cover blur-sm scale-110" 
          />
          {/* Overlay encima */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
          {/* "Coming Soon" / "Próximamente" centrado */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              {t}
            </span>
          </div>
        </div>

        {/* Back of card - Information */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-lg bg-card border border-border shadow-xl p-4 sm:p-6 flex flex-col overflow-hidden">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground line-clamp-1">{title}</h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-3 flex-grow overflow-y-auto line-clamp-3">
            {description}
          </p>

          <div className="space-y-3 flex-shrink-0">
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              {demoUrl && (
                <Button size="sm" asChild className="flex-1 text-xs sm:text-sm">
                  <a href={demoUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Demo
                  </a>
                </Button>
              )}
              {githubUrl && (
                <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent text-xs sm:text-sm">
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
