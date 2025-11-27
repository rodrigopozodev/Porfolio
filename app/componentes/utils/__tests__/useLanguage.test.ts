import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useLanguage } from "../useLanguage"

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

describe("useLanguage", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("should default to 'es' when no language is stored", () => {
    const { result } = renderHook(() => useLanguage())
    expect(result.current.language).toBe("es")
  })

  it("should use stored language from localStorage", () => {
    localStorage.setItem("language", "en")
    const { result } = renderHook(() => useLanguage())
    expect(result.current.language).toBe("en")
  })

  it("should toggle language from 'es' to 'en'", () => {
    const { result } = renderHook(() => useLanguage())
    
    act(() => {
      result.current.toggleLanguage()
    })

    expect(result.current.language).toBe("en")
    expect(localStorage.getItem("language")).toBe("en")
  })

  it("should toggle language from 'en' to 'es'", () => {
    localStorage.setItem("language", "en")
    const { result } = renderHook(() => useLanguage())
    
    act(() => {
      result.current.toggleLanguage()
    })

    expect(result.current.language).toBe("es")
    expect(localStorage.getItem("language")).toBe("es")
  })

  it("should set language directly", () => {
    const { result } = renderHook(() => useLanguage())
    
    act(() => {
      result.current.setLanguage("en")
    })

    expect(result.current.language).toBe("en")
    expect(localStorage.getItem("language")).toBe("en")
  })
})

