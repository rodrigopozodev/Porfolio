"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

interface ScrollNavigationProps {
  pages: {
    path: string
    component: React.ReactNode
  }[]
  currentPath: string
}

export function ScrollNavigation({ pages, currentPath }: ScrollNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [isScrolling, setIsScrolling] = useState(false)

  const currentIndex = pages.findIndex((page) => page.path === currentPath)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let timeout: NodeJS.Timeout

    const handleScroll = () => {
      if (isScrolling) return

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        const scrollPosition = container.scrollTop
        const pageHeight = container.clientHeight
        const newIndex = Math.round(scrollPosition / pageHeight)

        if (newIndex !== currentIndex && pages[newIndex]) {
          setIsScrolling(true)
          router.push(pages[newIndex].path)
          setTimeout(() => setIsScrolling(false), 500)
        }
      }, 150)
    }

    container.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      container.removeEventListener("scroll", handleScroll)
      clearTimeout(timeout)
    }
  }, [currentIndex, pages, router, isScrolling])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const pageHeight = container.clientHeight
    container.scrollTo({
      top: currentIndex * pageHeight,
      behavior: "smooth",
    })
  }, [currentIndex])

  return (
    <div ref={containerRef} className="scroll-container h-[93vh] mt-[7vh]">
      {pages.map((page, index) => (
        <div key={page.path} className="scroll-page h-[93vh] w-full">
          {page.component}
        </div>
      ))}
    </div>
  )
}
