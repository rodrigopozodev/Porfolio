"use client"

import { usePathname } from "next/navigation"
import { ScrollNavigation } from "@/components/scroll-navigation"
import PresentacionPage from "./presentacion/page"
import ContactoPage from "./contacto/page"

export default function InicioLayout() {
  const pathname = usePathname()

  const pages = [
    {
      path: "/inicio/presentacion",
      component: <PresentacionPage />,
    },
    {
      path: "/inicio/contacto",
      component: <ContactoPage />,
    },
  ]

  const currentPath = pathname === "/inicio" ? "/inicio/presentacion" : pathname

  return <ScrollNavigation pages={pages} currentPath={currentPath} />
}
