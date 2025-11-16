// Layout raíz de la aplicación: define metadatos, fuentes, estilos globales
// y envuelve la app con providers de idioma y lateralidad.
import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Transition from "@/components/ui/transition"
import RouteReadyEmitter from "@/components/ui/route-ready-emitter"
import { LanguageProvider } from "@/lib/context/language-context"
import { HandednessProvider } from "@/lib/context/handedness-context"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

// Metadatos base del sitio (título, descripción)
export const metadata: Metadata = {
  title: "Rodrigo Pozo Sánchez - Desarrollador Web",
  description: "Portfolio de Desarrollador web especializada en crear experiencias digitales excepcionales",
  generator: "v0.app",
}

// Configuración de viewport para móviles y safe areas
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Script inline para fijar tema oscuro si el sistema/usuario lo indica */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'system';
                if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        {/* Script inline para inicializar lateralidad a "right" antes de hidratación */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Ensure site starts in RIGHT-handed mode before hydration
                try {
                  document.documentElement.dataset.handed = 'right';
                  localStorage.setItem('handedness', 'right');
                } catch (e) {
                  document.documentElement.dataset.handed = 'right';
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {/* Providers de contexto para idioma y lateralidad */}
        <LanguageProvider>
          <HandednessProvider>
            {/* Emisor de evento cuando la ruta está lista (para transiciones) */}
            <RouteReadyEmitter />
            {/* Contenedor de transiciones globales entre páginas */}
            <Transition
              intro={null}
              introDuration={1.5}
              transitionDuration={0.9}
              type="curved"
              direction="bottom"
              className="bg-neutral-900 dark:bg-white"
              skip
              autoExit={false}
            >
              {children}
            </Transition>
          </HandednessProvider>
        </LanguageProvider>
        {/* Analytics de Vercel */}
        <Analytics />
      </body>
    </html>
  )
}
