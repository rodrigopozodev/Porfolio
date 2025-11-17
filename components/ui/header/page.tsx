"use client"

import React from "react"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { HandednessToggle } from "@/components/ui/handedness-toggle"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { HamburgerMenu } from "@/components/ui/hamburger-menu"
import { MobileNavDrawer } from "@/components/ui/mobile-nav-drawer"
import { useHandedness } from "@/lib/context/handedness-context"

type HeaderProps = {
  mode?: "mobile" | "desktop"
}

export default function HeaderInicio({ mode = "desktop" }: HeaderProps) {
  const { handedness } = useHandedness()

  if (mode === "mobile") {
    return (
      <>
        <div className="header-grid fixed z-50 left-0 right-0" style={{ top: "calc(env(safe-area-inset-top, 0px) + 1.5rem)" }}>
          <div className="col1">
            <LanguageToggle size="default" variant="outline" />
          </div>
          <div className="col2">
            <HandednessToggle size="default" variant="outline" />
          </div>
          <div className="col3">
            <ThemeToggle size="default" variant="outline" />
          </div>
        </div>
        <HamburgerMenu />
        <MobileNavDrawer>{null}</MobileNavDrawer>
      </>
    )
  }

  return (
    <>
      <div className="header-grid fixed z-50 left-0 right-0" style={{ top: "calc(env(safe-area-inset-top, 0px) + 1.5rem)" }}>
        <div className="col1">
          <LanguageToggle size="default" variant="outline" />
        </div>
        <div className="col2">
          <HandednessToggle size="default" variant="outline" />
        </div>
        <div className="col3">
          <ThemeToggle size="default" variant="outline" />
        </div>
      </div>
      <HamburgerMenu />
    </>
  )
}