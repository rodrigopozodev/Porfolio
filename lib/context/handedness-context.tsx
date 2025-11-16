"use client"

// Este archivo gestiona la "lateralidad" (diestro/zurdo) de la interfaz.
// Con React Context se comparte el valor entre componentes para colocar
// elementos a la izquierda o derecha y recordar la preferencia del usuario.
import React, { createContext, useContext, useEffect, useState } from "react"

// Posibles valores de lateralidad.
type Handedness = "right" | "left"

// Datos que expone el contexto: valor actual, setter y un método para alternar.
type Ctx = {
  handedness: Handedness
  setHandedness: (h: Handedness) => void
  toggle: () => void
}

// Contexto de lateralidad. Se inicializa como nulo y se valida en el hook.
const HandednessContext = createContext<Ctx | null>(null)

// Proveedor del contexto: almacena el estado y lo sincroniza con el documento.
export function HandednessProvider({ children }: { children: React.ReactNode }) {
  const [handedness, setHandedness] = useState<Handedness>("right")

  // Persist and reflect in document dataset for CSS hooks if needed
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("handedness", handedness)
      document.documentElement.dataset.handed = handedness
    }
  }, [handedness])

  // Alterna entre diestro y zurdo.
  const toggle = () => setHandedness(prev => (prev === "right" ? "left" : "right"))

  return (
    <HandednessContext.Provider value={{ handedness, setHandedness, toggle }}>
      {children}
    </HandednessContext.Provider>
  )
}

// Hook de conveniencia para acceder al contexto.
export function useHandedness() {
  const ctx = useContext(HandednessContext)
  if (!ctx) throw new Error("useHandedness must be used within HandednessProvider")
  return ctx
}
