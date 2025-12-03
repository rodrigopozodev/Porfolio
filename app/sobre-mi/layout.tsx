"use client"

import { usePathname } from "next/navigation"
import { ScrollNavigation } from "@/components/scroll-navigation"
import ConocimientosPage from "./conocimientos/page"
import TecnologiasPage from "./tecnologias/page"

export default function SobreMiLayout() {
  const pathname = usePathname()

  const pages = [
    {
      path: "/sobre-mi/conocimientos",
      component: <ConocimientosPage />,
    },
    {
      path: "/sobre-mi/tecnologias",
      component: <TecnologiasPage />,
    },
  ]

  const currentPath = pathname === "/sobre-mi" ? "/sobre-mi/conocimientos" : pathname

  return <ScrollNavigation pages={pages} currentPath={currentPath} />
}
