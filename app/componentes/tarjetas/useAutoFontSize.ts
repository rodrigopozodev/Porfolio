"use client"

import { useEffect, useRef, useState } from "react"

interface UseAutoFontSizeOptions {
  minFontSize?: number
  maxFontSize?: number
  step?: number
}

export function useAutoFontSize({
  minFontSize = 0.65,
  maxFontSize = 1.8,
  step = 0.05,
}: UseAutoFontSizeOptions = {}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState(maxFontSize)

  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    const adjustFontSize = () => {
      if (!element) return

      // Buscar el contenedor .summary o .techs (el padre directo)
      const container = element.closest(".summary, .techs") as HTMLElement
      if (!container) return

      // Obtener altura disponible del contenedor (descontando padding)
      const containerStyle = window.getComputedStyle(container)
      const paddingTop = parseFloat(containerStyle.paddingTop) || 0
      const paddingBottom = parseFloat(containerStyle.paddingBottom) || 0
      const containerHeight = container.clientHeight - paddingTop - paddingBottom
      
      if (containerHeight <= 0) return

      let currentSize = maxFontSize
      let fits = false

      // Verificar si el contenido cabe
      const checkFits = () => {
        // Temporariamente permitir que el elemento se expanda para medir
        const originalHeight = element.style.height
        const originalMaxHeight = element.style.maxHeight
        
        element.style.height = "auto"
        element.style.maxHeight = "none"
        
        // Forzar reflow para obtener medidas precisas
        void element.offsetHeight
        
        // Medir el contenido real
        const scrollHeight = element.scrollHeight
        const availableHeight = containerHeight
        
        // Restaurar estilos inmediatamente
        element.style.height = originalHeight || ""
        element.style.maxHeight = originalMaxHeight || ""
        
        // Pequeño margen para evitar cortes por redondeo de píxeles
        return scrollHeight <= availableHeight + 2
      }

      // Empezar con el tamaño máximo
      element.style.fontSize = `${currentSize}rem`
      fits = checkFits()

      // Reducir el tamaño hasta que quepa
      while (currentSize >= minFontSize && !fits) {
        currentSize -= step
        if (currentSize < minFontSize) break
        element.style.fontSize = `${currentSize}rem`
        fits = checkFits()
      }

      // Si aún no cabe con el mínimo, usar el mínimo
      if (!fits && currentSize >= minFontSize) {
        currentSize = Math.max(minFontSize, currentSize)
        element.style.fontSize = `${currentSize}rem`
      }

      setFontSize(currentSize)
    }

    // Ajustar inicialmente con un pequeño delay para asegurar que el DOM esté listo
    const timeoutId = setTimeout(() => {
      adjustFontSize()
    }, 100)

    // Observar cambios en el tamaño del contenedor
    const resizeObserver = new ResizeObserver(() => {
      adjustFontSize()
    })

    if (element.parentElement) {
      resizeObserver.observe(element.parentElement)
    }

    // También observar cambios en el contenido
    const contentObserver = new MutationObserver(() => {
      adjustFontSize()
    })

    contentObserver.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => {
      clearTimeout(timeoutId)
      resizeObserver.disconnect()
      contentObserver.disconnect()
    }
  }, [minFontSize, maxFontSize, step])

  return { contentRef, fontSize }
}

