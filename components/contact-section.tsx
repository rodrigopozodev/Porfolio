"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

export function ContactSection() {
  const { language } = useLanguage()

  const t = translations[language].contact

  return (
    <section
      id="contact"
      className="snap-section flex items-center justify-center bg-background px-4 py-8 min-[900px]:px-6 min-[900px]:py-10 lg:py-12"
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground min-[900px]:mb-3 min-[900px]:text-3xl lg:mb-4 lg:text-5xl">
            {t.title}
          </h2>
          <p className="mb-6 text-sm text-muted-foreground min-[900px]:mb-8 min-[900px]:text-base lg:mb-12 lg:text-lg">{t.subtitle}</p>
        </div>

        <div className="flex flex-col items-center space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{t.connect}</h3>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-transparent" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-transparent" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-transparent" asChild>
                  <a href="mailto:maria@example.com" aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            <Button variant="outline" size="lg" className="gap-2 rounded-full bg-transparent">
              <Download className="h-4 w-4" />
              {t.download}
            </Button>

            <footer className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
              <p>{t.footer}</p>
            </footer>
        </div>
      </div>
    </section>
  )
}
