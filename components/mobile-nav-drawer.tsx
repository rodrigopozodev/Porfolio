"use client"

import React, { useEffect, useRef, useState } from "react"
import { useHandedness } from "@/lib/handedness-context"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { motion } from "framer-motion"

type Props = {
  children: React.ReactNode
}

export function MobileNavDrawer({ children }: Props) {
  const { handedness } = useHandedness()
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const [viewportW, setViewportW] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0)
  const [drawerW, setDrawerW] = useState<number>(320)

  useEffect(() => {
    const onToggle = () => setOpen((prev) => !prev)
    const onClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("hamburgerMenuToggle", onToggle as EventListener)
    window.addEventListener("keydown", onClose)
    return () => {
      window.removeEventListener("hamburgerMenuToggle", onToggle as EventListener)
      window.removeEventListener("keydown", onClose)
    }
  }, [])

  useEffect(() => {
    try {
      window.dispatchEvent(new CustomEvent("hamburgerMenuOpenChange", { detail: { open } }))
    } catch {}
  }, [open])

  // Medir ancho del drawer y viewport para animación cruzada
  useEffect(() => {
    const measure = () => {
      try {
        setViewportW(window.innerWidth)
        if (drawerRef.current) {
          setDrawerW(drawerRef.current.offsetWidth)
        }
      } catch {}
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // Posición X según estado y zurdo/diestro
  const x = open
    ? (handedness === "right" ? viewportW - drawerW : 0)
    : (handedness === "right" ? viewportW : -drawerW)

  return (
    <div className="min-[900px]:hidden">
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Drawer animado */}
      <motion.div
        ref={drawerRef}
        initial={false}
        animate={{ x }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 bottom-0 left-0 z-[70] w-[78%] max-w-[320px] bg-background/95 border border-foreground/10 shadow-xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Close button inside drawer */}
        <div className={`absolute top-6 ${handedness === "right" ? "right-6" : "left-6"}`}>
          <Button
            variant="outline"
            size="default"
            onClick={() => setOpen(false)}
            className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110 cursor-pointer flex items-center justify-center"
            aria-label="Cerrar menú"
          >
            <X className="h-4 w-4 text-foreground" />
          </Button>
        </div>
        <div className="pt-20 px-4 pb-6 flex flex-col gap-3">
          {children}
        </div>
      </motion.div>
    </div>
  )
}