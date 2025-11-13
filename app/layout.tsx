import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Transition from "@/components/ui/transition"
import RouteReadyEmitter from "@/components/route-ready-emitter"
import { LanguageProvider } from "@/lib/language-context"
import { HandednessProvider } from "@/lib/handedness-context"
import { AuthProvider } from "@/context/AuthContext"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rodrigo Pozo Sánchez - Desarrollador Web",
  description: "Portfolio de Desarrollador web especializada en crear experiencias digitales excepcionales",
  generator: "v0.app",
}

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
        <AuthProvider>
          <LanguageProvider>
            <HandednessProvider>
          <RouteReadyEmitter />
          <Transition
            intro={null}
            // Restauramos configuración por defecto para el botón de temas
            // (curved desde bottom, colores neutros)
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
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
