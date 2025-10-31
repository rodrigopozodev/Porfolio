import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Transition from "@/components/ui/transition"
import { LanguageProvider } from "@/lib/language-context"
import { HandednessProvider } from "@/lib/handedness-context"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rodrigo Pozo Sánchez - Desarrollador Web",
  description: "Portfolio de Desarrollador web especializada en crear experiencias digitales excepcionales",
  generator: "v0.app",
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
        <LanguageProvider>
          <HandednessProvider>
          <Transition
            intro={null}
            introDuration={2}
            transitionDuration={1}
            type="curved"
            direction="bottom"
            skip
            autoExit={false}
          >
            {children}
          </Transition>
          </HandednessProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
