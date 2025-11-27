/**
 * Root layout de la aplicación.
 * Carga fuentes, aplica clases de tema y envuelve el contenido con una transición.
 */
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Transition from "./componentes/transiciones/TransitionFull"
import { ErrorBoundary } from "./componentes/utils/ErrorBoundary"
import SkipLink from "./componentes/utils/SkipLink"
import ErrorBoundaryWrapper from "./componentes/utils/ErrorBoundaryWrapper"
import { appConfig, externalUrls } from "./lib/config"
import { PersonStructuredData, WebSiteStructuredData } from "./componentes/utils/StructuredData"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.url),
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
  keywords: [
    "portfolio",
    "desarrollador",
    "developer",
    "frontend",
    "React",
    "Next.js",
    "TypeScript",
    "Rodrigo Pozo Sánchez",
  ],
  authors: [{ name: appConfig.author }],
  creator: appConfig.author,
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: appConfig.url,
    title: appConfig.name,
    description: appConfig.description,
    siteName: appConfig.name,
    images: [
      {
        url: "/Rodrigo.png",
        width: 1200,
        height: 630,
        alt: appConfig.author,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.name,
    description: appConfig.description,
    images: ["/Rodrigo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/icon-github.svg" fetchPriority="high" />
        <link rel="preload" as="image" href="/icon-linkedin.svg" fetchPriority="high" />
        <link rel="preload" as="image" href="/icon-gmail.svg" fetchPriority="high" />
        <link rel="preload" as="image" href="/icon-linkedin-hover.svg" fetchPriority="high" />
        <link rel="preload" as="image" href="/Rodrigo.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/icon-translate.svg" fetchPriority="high" />
        <link rel="preload" as="image" href="/icon-translate-hover.png" fetchPriority="high" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var root = document.documentElement;
                  root.classList.remove('light');
                  root.classList.remove('dark');
                  if (theme === 'system') {
                    var sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    root.classList.add(sys);
                  } else {
                    root.classList.add(theme);
                  }
                } catch (e) {
                  // Silently fail theme initialization - it's not critical
                  // Error will be handled by useTheme hook on client side
                }
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered:', registration);
                    })
                    .catch((error) => {
                      console.log('SW registration failed:', error);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PersonStructuredData
          name={appConfig.author}
          jobTitle="Desarrollador Frontend"
          url={appConfig.url}
          image={`${appConfig.url}/Rodrigo.png`}
          sameAs={[externalUrls.github, externalUrls.linkedin]}
          email="rodrigopozosanchez@gmail.com"
        />
        <WebSiteStructuredData
          name={appConfig.name}
          url={appConfig.url}
          description={appConfig.description}
        />
        <SkipLink />
        <ErrorBoundaryWrapper>
          <div className="min-h-screen">
            <Transition className="bg-neutral-900 dark:bg-white">{children}</Transition>
          </div>
        </ErrorBoundaryWrapper>
      </body>
    </html>
  )
}