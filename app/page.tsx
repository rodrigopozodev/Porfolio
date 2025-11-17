"use client"
// Página Home: compone la portada (Inicio), la sección de Proyectos
// y la navegación/controles flotantes de tema, idioma y lateralidad.

import React from "react"
import { Inicio } from "@/components/paginas/inicio"
import { Proyectos } from "@/components/paginas/proyectos"
import { PageNavigation } from "@/components/ui/page-navigation"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { HandednessToggle } from "@/components/ui/handedness-toggle"
import HeaderInicio from "@/components/ui/header/page"
import { motion } from "framer-motion"
import { useHandedness } from "@/lib/context/handedness-context"
import { useEffect, useState } from "react"

export default function Home() {
  return <main className="min-h-[100vh] w-full" />
}
