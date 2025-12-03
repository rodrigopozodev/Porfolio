"use client"

import { Card } from "@/components/ui/card"
import { usePortfolio } from "@/lib/context/portfolio-context"
import { translations } from "@/lib/translations"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactoPage() {
  const { language } = usePortfolio()
  const t = translations[language].home.contact

  return (
    <div className="h-full w-full flex items-center justify-center bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4 text-balance px-2">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground text-balance px-2">{t.subtitle}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 sm:gap-6 lg:gap-8 max-w-3xl mx-auto">
          <Card className="p-4 sm:p-5 lg:p-6 flex-1">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold mb-1 text-base sm:text-lg">{t.email}</h3>
                <p className="text-muted-foreground text-sm sm:text-base break-all">rodrigopozosanchz@gmail.com</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-5 lg:p-6 flex-1">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold mb-1 text-base sm:text-lg">{t.phone}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">+34 620 396 775</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-5 lg:p-6 flex-1">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold mb-1 text-base sm:text-lg">{t.location}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">Madrid, España</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
