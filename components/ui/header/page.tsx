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

export function Header({ mode = "desktop" }: HeaderProps) {
  const { handedness } = useHandedness()

  if (mode === "mobile") {
    return (
      <>
        <div
          className={"fixed z-50 flex items-center gap-3 left-0 right-0 justify-center"}
          style={{ top: "calc(env(safe-area-inset-top, 0px) + 1.5rem)" }}
        >
          <LanguageToggle />
          <HandednessToggle />
          <ThemeToggle />
          <HamburgerMenu />
        </div>
        <MobileNavDrawer>{null}</MobileNavDrawer>
      </>
    )
  }

  return (
    <div
      className={`fixed z-50 flex items-center gap-3 
        ${handedness === "right"
          ? "left-0 right-0 justify-center min-[900px]:left-auto min-[900px]:right-3 min-[900px]:justify-end"
          : "left-0 right-0 justify-center min-[900px]:right-auto min-[900px]:left-3 min-[900px]:justify-start"}
      `}
      style={{ top: "calc(env(safe-area-inset-top, 0px) + 1.5rem)" }}
    >
      {handedness === "right" ? (
        <>
          <LanguageToggle />
          <HandednessToggle />
          <ThemeToggle />
        </>
      ) : (
        <>
          <ThemeToggle />
          <HandednessToggle />
          <LanguageToggle />
        </>
      )}
      <HamburgerMenu />
    </div>
  )
}