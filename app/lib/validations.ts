/**
 * Schemas de validación usando Zod.
 * Centraliza toda la validación de datos de la aplicación.
 */
import { z } from "zod"
import { validationConfig } from "./config"

/**
 * Schema para testimonios con validación mejorada.
 */
export const testimonialSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(validationConfig.maxNameLength, `El nombre no puede exceder ${validationConfig.maxNameLength} caracteres`)
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/, "El nombre solo puede contener letras, espacios, guiones y apóstrofes")
    .trim(),
  handle: z
    .string()
    .min(1, "El puesto es requerido")
    .max(validationConfig.maxHandleLength, `El puesto no puede exceder ${validationConfig.maxHandleLength} caracteres`)
    .trim(),
  review: z
    .string()
    .min(10, "La recomendación debe tener al menos 10 caracteres")
    .max(validationConfig.maxReviewLength, `La recomendación no puede exceder ${validationConfig.maxReviewLength} caracteres`)
    .trim(),
  avatar: z
    .string()
    .url("La URL del avatar debe ser válida")
    .refine((url) => {
      try {
        const parsed = new URL(url)
        return ["http:", "https:"].includes(parsed.protocol)
      } catch {
        return false
      }
    }, "La URL debe usar http o https")
    .optional()
    .nullable()
    .or(z.literal("").transform(() => null)),
  linkedin: z
    .string()
    .url("La URL de LinkedIn debe ser válida")
    .refine((url) => {
      try {
        const parsed = new URL(url)
        return ["http:", "https:"].includes(parsed.protocol) && 
               (parsed.hostname.includes("linkedin.com") || parsed.hostname.includes("www.linkedin.com"))
      } catch {
        return false
      }
    }, "La URL debe ser de LinkedIn")
    .max(validationConfig.maxLinkedInUrlLength, `La URL no puede exceder ${validationConfig.maxLinkedInUrlLength} caracteres`)
    .optional()
    .nullable()
    .or(z.literal("").transform(() => null)),
  language: z.enum(["es", "en"]).default("es"),
})

export type TestimonialInput = z.infer<typeof testimonialSchema>

/**
 * Schema para validar parámetros de query de API.
 */
export const testimonialQuerySchema = z.object({
  language: z.enum(["es", "en"]).optional().default("es"),
})

/**
 * Schema para validar IDs numéricos.
 */
export const idSchema = z.coerce.number().int().positive()

/**
 * Helper para validar datos y obtener errores formateados.
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: true
  data: T
} | {
  success: false
  errors: string[]
} {
  const result = schema.safeParse(data)
  
  if (result.success) {
    return { success: true, data: result.data }
  }

  const errors = result.error.issues.map((err) => {
    const path = err.path.length > 0 ? `${err.path.join(".")}: ` : ""
    return `${path}${err.message}`
  })

  return { success: false, errors }
}

