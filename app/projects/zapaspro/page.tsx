"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { BackHomeButton } from "@/components/back-home-button"
import { BackFeaturedButton } from "@/components/back-featured-button"
import { BackAllProjectsButton } from "@/components/back-all-projects-button"
import { VisitProjectButton } from "@/components/visit-project-button"
import { HandednessToggle } from "@/components/handedness-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { MobileNavDrawer } from "@/components/mobile-nav-drawer"
import { useHandedness } from "@/lib/handedness-context"
import { useLanguage } from "@/lib/language-context"

export default function ZapasProPage() {
  const router = useRouter()
  const { handedness } = useHandedness()
  const { language } = useLanguage()

  return (
    <main className="relative min-h-screen w-full bg-background text-foreground overflow-y-auto">
      <div className={`fixed top-6 z-50 flex items-center gap-3 ${handedness === "right" ? "right-6" : "left-6"}`}>
        {handedness === "right" ? (
          <>
            <span className="hidden min-[900px]:inline-flex gap-3">
              <BackHomeButton animationType="fade" />
              <BackFeaturedButton />
              <BackAllProjectsButton />
              <VisitProjectButton href="https://zapaspro.netlify.app/" />
            </span>
            <HandednessToggle />
            <LanguageToggle />
            <ThemeToggle />
            <HamburgerMenu />
          </>
        ) : (
          <>
            <HamburgerMenu />
            <ThemeToggle />
            <LanguageToggle />
            <HandednessToggle />
            <span className="hidden min-[900px]:inline-flex gap-3">
              <VisitProjectButton href="https://zapaspro.netlify.app/" />
              <BackAllProjectsButton />
              <BackFeaturedButton />
              <BackHomeButton animationType="fade" />
            </span>
          </>
        )}
      </div>
      <MobileNavDrawer>
        <div className="flex flex-col gap-3">
          <BackHomeButton animationType="fade" showLabelOnMobile />
          <BackFeaturedButton showLabelOnMobile />
          <BackAllProjectsButton showLabelOnMobile />
          <VisitProjectButton href="https://zapaspro.netlify.app/" showLabelOnMobile />
        </div>
      </MobileNavDrawer>

      <section className="container mx-auto px-6 py-16 md:py-20 lg:py-24">
        <div className="relative mb-8 flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">ZapasPro</h1>
        </div>

        {language === "en" ? (
          <>
            {/* Summary */}
            <div className="mb-10 rounded-xl border border-foreground/15 bg-muted/40 p-6">
              <h2 className="mb-3 text-2xl font-semibold">Summary</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Sneaker e‑commerce with catalog, product detail with gallery, and a basic cart.</li>
                <li>Frontend in Angular 18 with SSR; Backend in Node.js + Express + TypeScript.</li>
                <li>SQLite persistence via Sequelize; public API for products, users, and stock.</li>
                <li>Deployment ready: frontend on Netlify and backend on Render.</li>
              </ul>
            </div>

            {/* Key Features */}
            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Key Features</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Product catalog with name, price, description, image, gender, color, and brand.</li>
                <li>Product page with image gallery and size‑based stock control.</li>
                <li>Shopping cart: add items and query the cart by user.</li>
                <li>Account and session: email/password login/signup; login returns user data (no JWT).</li>
                <li>Sample data seeding for users, products, and stock.</li>
                <li>CORS configured for http://localhost:4200 and https://zapaspro.netlify.app.</li>
              </ul>
            </div>

            {/* Main Pages */}
            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Main Pages</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Home: entry and primary navigation.</li>
                <li>Shop: product listing.</li>
                <li>Product detail: gallery, info, and purchase actions.</li>
                <li>Auth: basic login/signup.</li>
              </ul>
            </div>

            {/* Architecture and Technologies */}
            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Architecture and Technologies</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Frontend: Angular 18, @angular/ssr, SSR server in server.ts, styles in src/styles.css.</li>
                <li>Backend: Express with controllers and routes at /api/products, /api/users, /api/stock.</li>
                <li>Data: SQLite (src/database/zapaspro.sqlite) managed via Sequelize.</li>
                <li>Config: frontend environment.ts points to https://zapaspro-back.onrender.com/api.</li>
              </ul>
            </div>

            {/* Privacy and Compliance */}
            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Privacy and Compliance</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Simple authentication: backend responds with the user profile; no JWT is issued.</li>
                <li>CORS restricts origins: only local frontend and the production domain.</li>
              </ul>
            </div>

            {/* Current Status and Recent Adjustments */}
            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Current Status and Recent Adjustments</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Database syncs on startup and is populated with seedData.</li>
                <li>SSR and prerender enabled in angular.json; Express server used for rendering.</li>
                <li>Frontend environment already targets the production backend on Render.</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* Resumen */}
            <div className="mb-10 rounded-xl border border-foreground/15 bg-muted/40 p-6">
              <h2 className="mb-3 text-2xl font-semibold">Resumen</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Ecommerce de zapatillas con catálogo, ficha con galería y carrito básico.</li>
                <li>Front en Angular 18 con SSR; Back en Node.js + Express + TypeScript.</li>
                <li>Persistencia en SQLite mediante Sequelize; API pública para productos, usuarios y stock.</li>
                <li>Preparado para despliegue: front en Netlify y back en Render.</li>
              </ul>
            </div>

            {/* Características Clave */}
            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Características Clave</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Catálogo de productos con nombre, precio, descripción, imagen, género, color y marca.</li>
                <li>Ficha de producto con galería de imágenes y control de stock por talla.</li>
                <li>Carrito de compras: añadir ítems y consultar el carrito por usuario.</li>
                <li>Cuenta y sesión: login/registro por email y contraseña; el login devuelve datos del usuario (sin JWT).</li>
                <li>Datos de ejemplo con siembra inicial de usuarios, productos y stock.</li>
                <li>CORS configurado para http://localhost:4200 y https://zapaspro.netlify.app.</li>
              </ul>
            </div>

            {/* Páginas Principales */}
            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Páginas Principales</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Home: entrada y navegación principal.</li>
                <li>Tienda: listado de productos.</li>
                <li>Detalle de producto: galería, info y acciones de compra.</li>
                <li>Auth: login/registro básico.</li>
              </ul>
            </div>

            {/* Arquitectura y Tecnologías */}
            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Arquitectura y Tecnologías</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Frontend: Angular 18, @angular/ssr, servidor SSR en server.ts, estilos en src/styles.css.</li>
                <li>Backend: Express con controladores y rutas en /api/products, /api/users, /api/stock.</li>
                <li>Datos: SQLite (src/database/zapaspro.sqlite) gestionado con Sequelize.</li>
                <li>Configuración: environment.ts del front apunta a https://zapaspro-back.onrender.com/api.</li>
              </ul>
            </div>

            {/* Privacidad y Cumplimiento */}
            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Privacidad y Cumplimiento</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Autenticación simple: el backend responde con el perfil del usuario; no se emite token JWT.</li>
                <li>CORS restringe orígenes: solo front local y dominio de producción.</li>
              </ul>
            </div>

            {/* Estado Actual y Ajustes Recientes */}
            <div className="mb-10">
              <h2 className="mb-3 text-xl font-semibold">Estado Actual y Ajustes Recientes</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Base de datos se sincroniza al arrancar y se puebla con seedData.</li>
                <li>SSR y prerender activados en angular.json; servidor Express para renderizado.</li>
                <li>Entorno de front ya usa el backend de producción en Render.</li>
              </ul>
            </div>
          </>
        )}
      </section>
    </main>
  )
}