import { defineConfig, devices } from "@playwright/test"

/**
 * Configuración de Playwright para tests E2E.
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./e2e",
  /* Ejecutar tests en paralelo */
  fullyParallel: true,
  /* Fallar el build si hay tests rotos */
  forbidOnly: !!process.env.CI,
  /* Reintentar en CI */
  retries: process.env.CI ? 2 : 0,
  /* Opciones para workers */
  workers: process.env.CI ? 1 : undefined,
  /* Configuración de reporter */
  reporter: process.env.CI ? "html" : "list",
  /* Configuración compartida para todos los proyectos */
  use: {
    /* URL base para usar en navegación */
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
    /* Recopilar trace cuando se retiene un test */
    trace: "on-first-retry",
    /* Screenshot solo cuando falla */
    screenshot: "only-on-failure",
  },

  /* Configurar proyectos para diferentes navegadores */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test en dispositivos móviles */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  /* Ejecutar servidor de desarrollo antes de los tests */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})

