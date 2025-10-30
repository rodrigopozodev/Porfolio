"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

export function ContactSection() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const t = translations[language].contact

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
  }

  return (
    <section
      id="contact"
      className="snap-section flex items-center justify-center bg-background px-4 py-8 md:px-6 md:py-10 lg:py-12"
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground md:mb-3 md:text-3xl lg:mb-4 lg:text-5xl">
            {t.title}
          </h2>
          <p className="mb-6 text-sm text-muted-foreground md:mb-8 md:text-base lg:mb-12 lg:text-lg">{t.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12"
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12"
                required
              />
            </div>
            <div>
              <Textarea
                placeholder={t.messagePlaceholder}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-[120px] resize-none"
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full gap-2 rounded-full">
              <Mail className="h-4 w-4" />
              {t.send}
            </Button>
          </form>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{t.connect}</h3>
              <div className="flex gap-4">
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
      </div>
    </section>
  )
}
