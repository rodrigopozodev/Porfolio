"use client"

// Botón para volver al listado completo de proyectos (ruta "/projects").
// Dispara una animación de transición con overlay antes de navegar,
// y utiliza el diccionario de traducciones para el texto accesible.
import React from "react"
import { Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/context/language-context"
import { translations } from "@/lib/i18n/translations"
import { useRouter } from "next/navigation"

// Prop opcional para mostrar la etiqueta también en móvil.
export function BackAllProjectsButton({ showLabelOnMobile = false }: { showLabelOnMobile?: boolean }) {
  // Idioma actual para obtener el texto localizado del botón.
  const { language } = useLanguage()
  // Navegador de Next para realizar el cambio de ruta.
  const router = useRouter()
  // Etiqueta localizada para accesibilidad y visual.
  const label = translations[language].ui.backToAllProjects

  return (
    <Button
      // Estilo y tamaño consistentes con los demás botones de la UI.
      variant="outline"
      size="default"
      // Al hacer clic, ejecuta animación previa y luego navega a "/projects".
      onClick={() => {
        try {
          window.dispatchEvent(
            new CustomEvent("routeSweep", {
              detail: {
                type: "fade",
                className: "bg-neutral-900 dark:bg-white",
                transitionDuration: 0.6,
              },
            })
          )
        } catch {}

        const navigate = () => router.push("/projects")
        window.addEventListener("routeSweepFinished", navigate, { once: true })
        // Fallback por si el evento no se emite: navega tras 800ms.
        window.setTimeout(() => {
          try { window.removeEventListener("routeSweepFinished", navigate as unknown as EventListener) } catch {}
          navigate()
        }, 800)
      }}
      // Apariencia del botón y comportamiento en hover.
      className="h-10 px-4 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110 cursor-pointer inline-flex items-center justify-center whitespace-nowrap"
      // Texto accesible para lectores de pantalla.
      aria-label={label}
    >
      <div className="flex items-center gap-1">
        {/* Icono tipo grid para representar el listado completo */}
        <Grid3X3 className="h-4 w-4 text-foreground" />
        {/* Mostrar texto en móvil si showLabelOnMobile=true; si no, solo en >=900px */}
        <span className={showLabelOnMobile ? "text-xs font-semibold" : "text-xs font-semibold hidden min-[900px]:inline"}>{label}</span>
      </div>
    </Button>
  )
}
