import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { PortfolioProvider } from "@/lib/context/portfolio-context"
import { PortfolioHeader } from "@/components/portfolio-header"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rodrigo Pozo Sánchez",
  description: "Portfolio de desarrollador Full Stack con diseño moderno y responsive",
  generator: "v0.app",
  icons: {
    icon: "/images/rodrigo.png",
    apple: "/images/rodrigo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans antialiased bg-background`}>
        <PortfolioProvider>
          <PortfolioHeader />
          {children}
        </PortfolioProvider>
        <Analytics />
      </body>
    </html>
  )
}
