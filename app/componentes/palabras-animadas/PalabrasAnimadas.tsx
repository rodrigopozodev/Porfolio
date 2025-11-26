"use client"

import Typeanimation from "../../../components/ui/typeanimation"

export default function PalabrasAnimadas() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-2">
      <div className="text-center">
        <h2 
          className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 md:mb-2"
          style={{ 
            color: '#6b7280',
            fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility'
          }}
        >
          Impulsando tu negocio con
        </h2>
        <div 
          style={{ 
            color: '#3b82f6',
            fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility'
          }}
        >
          <Typeanimation
            words={[" Soluciones", " Calidad", " Innovación"]}
            typingSpeed="slow"
            deletingSpeed="slow"
            gradientFrom="blue-500"
            gradientTo="blue-500"
            pauseDuration={2000}
            className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold inline-block"
          />
        </div>
      </div>
    </div>
  )
}

