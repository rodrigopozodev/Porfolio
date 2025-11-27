import { test, expect } from "@playwright/test"

test.describe("Testimonials", () => {
  test("should display testimonials section", async ({ page }) => {
    await page.goto("/")

    const recomendacionesSection = page.locator("#recomendaciones")
    await expect(recomendacionesSection).toBeVisible()
  })

  test("should open testimonial form modal", async ({ page }) => {
    await page.goto("/")

    // Buscar el botón para añadir reseña
    const addReviewButton = page.locator('button:has-text("Añadir reseña"), button:has-text("Add review")').first()
    
    if (await addReviewButton.isVisible()) {
      await addReviewButton.click()

      // Verificar que el modal se abre
      const modal = page.locator('[role="dialog"]')
      await expect(modal).toBeVisible()

      // Verificar que el formulario tiene los campos necesarios
      const nombreInput = page.locator('input[type="text"]').first()
      const puestoInput = page.locator('input[type="text"]').nth(1)
      const recomendacionTextarea = page.locator('textarea')

      await expect(nombreInput).toBeVisible()
      await expect(puestoInput).toBeVisible()
      await expect(recomendacionTextarea).toBeVisible()
    }
  })

  test("should validate testimonial form", async ({ page }) => {
    await page.goto("/")

    const addReviewButton = page.locator('button:has-text("Añadir reseña"), button:has-text("Add review")').first()
    
    if (await addReviewButton.isVisible()) {
      await addReviewButton.click()

      const modal = page.locator('[role="dialog"]')
      await expect(modal).toBeVisible()

      // Intentar enviar sin completar campos
      const submitButton = page.locator('button[type="submit"]')
      
      if (await submitButton.isVisible()) {
        const isDisabled = await submitButton.isDisabled()
        // El botón debería estar deshabilitado si los campos requeridos no están completos
        expect(isDisabled).toBe(true)
      }
    }
  })

  test("should close testimonial modal", async ({ page }) => {
    await page.goto("/")

    const addReviewButton = page.locator('button:has-text("Añadir reseña"), button:has-text("Add review")').first()
    
    if (await addReviewButton.isVisible()) {
      await addReviewButton.click()

      const modal = page.locator('[role="dialog"]')
      await expect(modal).toBeVisible()

      // Cerrar con el botón de cerrar
      const closeButton = page.locator('button[aria-label*="Cerrar" i], button[aria-label*="Close" i]').first()
      
      if (await closeButton.isVisible()) {
        await closeButton.click()
        await expect(modal).not.toBeVisible()
      }
    }
  })
})

