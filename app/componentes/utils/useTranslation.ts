"use client"

import { useLanguage } from "./useLanguage"
import { getTranslations, type Translations } from "@/lib/translations"

/**
 * Hook para usar traducciones en componentes.
 * Combina useLanguage con el sistema de traducciones.
 * 
 * @example
 * ```tsx
 * const t = useTranslation()
 * return <h1>{t.personal.name}</h1>
 * ```
 */
export function useTranslation(): Translations {
  const { language } = useLanguage()
  return getTranslations(language)
}

