import { test, expect } from "@playwright/test"
import { injectAxe, checkA11y } from "axe-playwright"

test.describe("Accessibility", () => {
  test("should have no accessibility violations", async ({ page }) => {
    await page.goto("/")
    
    // Inyectar axe-core
    await injectAxe(page)
    
    // Verificar accesibilidad
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    })
  })

  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/")

    // Verificar que hay al menos un h1
    const h1 = page.locator("h1")
    const h1Count = await h1.count()
    expect(h1Count).toBeGreaterThan(0)

    // Verificar que hay h2 para secciones
    const h2 = page.locator("h2")
    const h2Count = await h2.count()
    expect(h2Count).toBeGreaterThan(0)
  })

  test("should have proper ARIA labels", async ({ page }) => {
    await page.goto("/")

    // Verificar que los botones tienen aria-labels
    const buttons = page.locator("button")
    const buttonCount = await buttons.count()

    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i)
      const ariaLabel = await button.getAttribute("aria-label")
      const textContent = await button.textContent()
      
      // Al menos debe tener aria-label o contenido de texto
      expect(ariaLabel || textContent?.trim()).toBeTruthy()
    }
  })

  test("should be keyboard navigable", async ({ page }) => {
    await page.goto("/")

    // Navegar con Tab
    await page.keyboard.press("Tab")
    
    // Verificar que algún elemento tiene focus
    const focusedElement = page.locator(":focus")
    await expect(focusedElement).toBeVisible()
  })

  test("should have proper color contrast", async ({ page }) => {
    await page.goto("/")

    // Verificar que el texto es legible
    const body = page.locator("body")
    const color = await body.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return {
        color: style.color,
        backgroundColor: style.backgroundColor,
      }
    })

    // Verificar que hay contraste (colores no son iguales)
    expect(color.color).not.toBe(color.backgroundColor)
  })
})

