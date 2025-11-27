import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useTheme, useIsDark } from "../useTheme"

describe("useTheme", () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear()
    document.documentElement.className = ""
  })

  it("debería inicializar con tema 'system' por defecto", () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe("system")
  })

  it("debería cargar tema desde localStorage", () => {
    localStorage.setItem("theme", "dark")
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe("dark")
  })

  it("debería cambiar tema correctamente", () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.setTheme("dark")
    })

    expect(result.current.theme).toBe("dark")
    expect(document.documentElement.classList.contains("dark")).toBe(true)
    expect(localStorage.getItem("theme")).toBe("dark")
  })

  it("debería hacer toggle entre light y dark", () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.setTheme("light")
    })
    expect(result.current.theme).toBe("light")

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toBe("dark")

    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toBe("light")
  })

  it("debería detectar correctamente si es dark", () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.setTheme("dark")
    })
    expect(result.current.isDark).toBe(true)

    act(() => {
      result.current.setTheme("light")
    })
    expect(result.current.isDark).toBe(false)
  })
})

describe("useIsDark", () => {
  beforeEach(() => {
    document.documentElement.className = ""
  })

  it("debería detectar tema dark", () => {
    document.documentElement.classList.add("dark")
    const { result } = renderHook(() => useIsDark())
    expect(result.current).toBe(true)
  })

  it("debería detectar tema light", () => {
    document.documentElement.classList.add("light")
    const { result } = renderHook(() => useIsDark())
    expect(result.current).toBe(false)
  })
})

