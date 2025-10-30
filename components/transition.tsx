"use client"

import { motion, AnimatePresence } from "framer-motion"
import { type ReactNode, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TransitionProps {
  children: ReactNode
  intro?: ReactNode
  introDuration?: number
  transitionDuration?: number
  type?: "curved" | "linear" | "spring"
  direction?: "top" | "bottom" | "left" | "right"
  autoExit?: boolean
  className?: string
}

export function Transition({
  children,
  intro,
  introDuration = 1.5,
  transitionDuration = 1.0,
  type = "curved",
  direction = "bottom",
  autoExit = true,
  className,
}: TransitionProps) {
  const [showIntro, setShowIntro] = useState(!!intro)

  useEffect(() => {
    if (intro && autoExit) {
      const timer = setTimeout(() => {
        setShowIntro(false)
      }, introDuration * 1000)
      return () => clearTimeout(timer)
    }
  }, [intro, autoExit, introDuration])

  const getInitialPosition = () => {
    switch (direction) {
      case "top":
        return { y: "-100%" }
      case "bottom":
        return { y: "100%" }
      case "left":
        return { x: "-100%" }
      case "right":
        return { x: "100%" }
      default:
        return { y: "100%" }
    }
  }

  const getTransition = () => {
    switch (type) {
      case "spring":
        return { type: "spring", stiffness: 100, damping: 20 }
      case "linear":
        return { duration: transitionDuration, ease: "linear" }
      case "curved":
      default:
        return { duration: transitionDuration, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  }

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        {showIntro && intro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={getInitialPosition()}
            transition={getTransition()}
            className={cn("absolute inset-0 z-50", className)}
          >
            {intro}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={getInitialPosition()}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={getTransition()}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
