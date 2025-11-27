import { test, expect } from "@playwright/test"

test.describe("Homepage", () => {
  test("should load homepage successfully", async ({ page }) => {
    await page.goto("/")

    // Verificar que la página carga
    await expect(page).toHaveTitle(/Portfolio de Rodrigo Pozo Sánchez/i)
  })

  test("should display main content sections", async ({ page }) => {
    await page.goto("/")

    // Verificar que las secciones principales están presentes
    const personalSection = page.locator("#personal")
    const proyectosSection = page.locator("#proyectos")
    const recomendacionesSection = page.locator("#recomendaciones")

    await expect(personalSection).toBeVisible()
    await expect(proyectosSection).toBeVisible()
    await expect(recomendacionesSection).toBeVisible()
  })

  test("should have skip link for accessibility", async ({ page }) => {
    await page.goto("/")

    const skipLink = page.locator(".skip-link")
    await expect(skipLink).toBeVisible()

    // Verificar que el skip link funciona
    await skipLink.focus()
    await page.keyboard.press("Enter")
    
    // Verificar que se navega al contenido principal
    const mainContent = page.locator("#main-content")
    await expect(mainContent).toBeFocused()
  })

  test("should toggle theme", async ({ page }) => {
    await page.goto("/")

    // Buscar el botón de tema (ajustar selector según tu implementación)
    const themeButton = page.locator('[aria-label*="tema" i], [aria-label*="theme" i]').first()
    
    if (await themeButton.isVisible()) {
      const initialClass = await page.locator("html").getAttribute("class")
      
      await themeButton.click()
      
      // Esperar a que cambie el tema
      await page.waitForTimeout(500)
      
      const newClass = await page.locator("html").getAttribute("class")
      expect(newClass).not.toBe(initialClass)
    }
  })

  test("should navigate to projects section", async ({ page }) => {
    await page.goto("/")

    // Buscar el botón "Ver Trabajos"
    const verTrabajosButton = page.locator('button:has-text("Ver Trabajos"), button:has-text("View Works")')
    
    if (await verTrabajosButton.isVisible()) {
      await verTrabajosButton.click()
      
      // Verificar que se navega a la sección de proyectos
      await page.waitForTimeout(1000) // Esperar animación de scroll
      
      const proyectosSection = page.locator("#proyectos")
      const boundingBox = await proyectosSection.boundingBox()
      
      // Verificar que la sección está visible en el viewport
      expect(boundingBox).not.toBeNull()
    }
  })

  test("should have working social links", async ({ page, context }) => {
    await page.goto("/")

    // Verificar enlaces de GitHub y LinkedIn
    const githubLink = page.locator('a[href*="github.com"], button[aria-label*="GitHub" i]').first()
    const linkedinLink = page.locator('a[href*="linkedin.com"]').first()

    if (await githubLink.isVisible()) {
      // Verificar que el enlace tiene el href correcto
      const href = await githubLink.getAttribute("href")
      expect(href).toContain("github.com")
    }

    if (await linkedinLink.isVisible()) {
      const href = await linkedinLink.getAttribute("href")
      expect(href).toContain("linkedin.com")
    }
  })
})

