import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useHandedness } from "../useHandedness"

describe("useHandedness", () => {
  beforeEach(() => {
    // Limpiar event listeners
    window.removeEventListener("handednessChange", () => {})
  })

  it("debería inicializar con modo 'right' por defecto", () => {
    const { result } = renderHook(() => useHandedness())
    expect(result.current.mode).toBe("right")
  })

  it("debería cambiar modo correctamente", () => {
    const { result } = renderHook(() => useHandedness())
    
    act(() => {
      result.current.setMode("left")
    })

    expect(result.current.mode).toBe("left")
  })

  it("debería hacer toggle entre left y right", () => {
    const { result } = renderHook(() => useHandedness())
    
    expect(result.current.mode).toBe("right")

    act(() => {
      result.current.toggleMode()
    })
    expect(result.current.mode).toBe("left")

    act(() => {
      result.current.toggleMode()
    })
    expect(result.current.mode).toBe("right")
  })

  it("debería escuchar eventos de cambio de lateralidad", () => {
    const { result } = renderHook(() => useHandedness())
    
    act(() => {
      window.dispatchEvent(
        new CustomEvent("handednessChange", { detail: { mode: "left" } })
      )
    })

    expect(result.current.mode).toBe("left")
  })
})

