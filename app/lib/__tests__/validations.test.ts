import { describe, it, expect } from "vitest"
import { testimonialSchema, validateData } from "../validations"

describe("testimonialSchema", () => {
  it("debería validar testimonial válido", () => {
    const validTestimonial = {
      name: "Juan Pérez",
      handle: "Desarrollador Senior",
      review: "Excelente trabajo",
      language: "es",
    }

    const result = validateData(testimonialSchema, validTestimonial)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe("Juan Pérez")
    }
  })

  it("debería rechazar testimonial sin nombre", () => {
    const invalidTestimonial = {
      handle: "Desarrollador Senior",
      review: "Excelente trabajo",
    }

    const result = validateData(testimonialSchema, invalidTestimonial)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(0)
    }
  })

  it("debería rechazar nombre muy largo", () => {
    const invalidTestimonial = {
      name: "a".repeat(101),
      handle: "Desarrollador",
      review: "Excelente",
    }

    const result = validateData(testimonialSchema, invalidTestimonial)
    expect(result.success).toBe(false)
  })

  it("debería aceptar linkedin opcional", () => {
    const validTestimonial = {
      name: "Juan Pérez",
      handle: "Desarrollador",
      review: "Excelente",
      linkedin: "https://linkedin.com/in/juan",
    }

    const result = validateData(testimonialSchema, validTestimonial)
    expect(result.success).toBe(true)
  })

  it("debería rechazar linkedin inválido", () => {
    const invalidTestimonial = {
      name: "Juan Pérez",
      handle: "Desarrollador",
      review: "Excelente",
      linkedin: "no-es-una-url",
    }

    const result = validateData(testimonialSchema, invalidTestimonial)
    expect(result.success).toBe(false)
  })
})

