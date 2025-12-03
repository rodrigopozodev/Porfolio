"use client"

import { Card } from "@/components/ui/card"
import { usePortfolio } from "@/lib/context/portfolio-context"
import { translations } from "@/lib/translations"

export default function TecnologiasPage() {
  const { language } = usePortfolio()
  const t = translations[language].about.technologies

  const technologies = [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "PostgreSQL", category: "Backend" },
    { name: "MongoDB", category: "Backend" },
    { name: "Figma", category: "Design" },
    { name: "Git", category: "Tools" },
    { name: "Docker", category: "Tools" },
    { name: "AWS", category: "Tools" },
  ]

  const categories = ["Frontend", "Backend", "Design", "Tools"]

  return (
    <div className="h-full w-full flex items-center justify-center bg-background overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-balance">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground text-balance">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {categories.map((category) => (
            <Card key={category} className="p-4 sm:p-5 lg:p-6">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4 text-primary">{category}</h3>
              <div className="space-y-2">
                {technologies
                  .filter((tech) => tech.category === category)
                  .map((tech) => (
                    <div key={tech.name} className="px-3 py-2 bg-muted rounded-md text-xs sm:text-sm font-medium">
                      {tech.name}
                    </div>
                  ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
