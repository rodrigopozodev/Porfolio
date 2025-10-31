"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Handedness = "right" | "left"

type Ctx = {
  handedness: Handedness
  setHandedness: (h: Handedness) => void
  toggle: () => void
}

const HandednessContext = createContext<Ctx | null>(null)

export function HandednessProvider({ children }: { children: React.ReactNode }) {
  const [handedness, setHandedness] = useState<Handedness>("right")

  // Persist and reflect in document dataset for CSS hooks if needed
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("handedness", handedness)
      document.documentElement.dataset.handed = handedness
    }
  }, [handedness])

  const toggle = () => setHandedness(prev => (prev === "right" ? "left" : "right"))

  return (
    <HandednessContext.Provider value={{ handedness, setHandedness, toggle }}>
      {children}
    </HandednessContext.Provider>
  )
}

export function useHandedness() {
  const ctx = useContext(HandednessContext)
  if (!ctx) throw new Error("useHandedness must be used within HandednessProvider")
  return ctx
}