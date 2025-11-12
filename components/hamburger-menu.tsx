"use client"

import React, { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HamburgerMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onOpenChange = (e: Event) => {
      try {
        const detail = (e as CustomEvent).detail as { open?: boolean }
        if (typeof detail?.open === "boolean") setOpen(detail.open)
      } catch {}
    }
    window.addEventListener("hamburgerMenuOpenChange", onOpenChange as EventListener)
    return () => window.removeEventListener("hamburgerMenuOpenChange", onOpenChange as EventListener)
  }, [])

  return (
    <Button
      variant="outline"
      size="default"
      onClick={() => {
        try { window.dispatchEvent(new CustomEvent("hamburgerMenuToggle")) } catch {}
      }}
      className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110 cursor-pointer min-[900px]:hidden flex items-center justify-center"
      aria-label="Abrir menú"
    >
      <div className="flex items-center">
        {open ? <X className="h-4 w-4 text-foreground" /> : <Menu className="h-4 w-4 text-foreground" />}
      </div>
    </Button>
  )
}