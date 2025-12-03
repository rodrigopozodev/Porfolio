"use client"

import { usePathname } from "next/navigation"
import { ScrollNavigation } from "@/components/scroll-navigation"
import DestacadosPage from "./destacados/page"
import TodosPage from "./todos/page"

export default function ProyectosLayout() {
  const pathname = usePathname()

  const pages = [
    {
      path: "/proyectos/destacados",
      component: <DestacadosPage />,
    },
    {
      path: "/proyectos/todos",
      component: <TodosPage />,
    },
  ]

  const currentPath = pathname === "/proyectos" ? "/proyectos/destacados" : pathname

  return <ScrollNavigation pages={pages} currentPath={currentPath} />
}
