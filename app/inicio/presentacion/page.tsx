"use client"

import { Button } from "@/components/ui/button"
import { usePortfolio } from "@/lib/context/portfolio-context"
import { translations } from "@/lib/translations"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PresentacionPage() {
  const { language } = usePortfolio()
  const t = translations[language].home.presentation

  return (
    <div className="min-h-[92vh] w-full flex items-center justify-center bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-16">
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
              <Image src="/images/rodrigo.png" alt="Rodrigo Pozo Sanchez" fill className="object-cover" priority />
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left space-y-2 sm:space-y-3 lg:space-y-4 max-w-2xl">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground">{t.greeting}</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance leading-tight">
              {t.name}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-primary font-semibold">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground text-balance leading-relaxed">
              {t.description}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-3">
              <Link href="/proyectos">
                <Button size="default" className="gap-2 text-sm sm:text-base">
                  {t.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Button variant="ghost" size="icon" asChild className="h-9 w-9 sm:h-10 sm:w-10">
                <a href="https://github.com/rodrigopozodev" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-9 w-9 sm:h-10 sm:w-10">
                <a href="https://www.linkedin.com/in/rodrigopozosanchez/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-9 w-9 sm:h-10 sm:w-10">
                <a href="mailto:rodrigopozosanchz@gmail.com">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
