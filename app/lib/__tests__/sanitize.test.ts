import { describe, it, expect } from "vitest"
import { sanitizeText, sanitizeUrl, sanitizeEmail, sanitizeName, escapeHtml } from "../sanitize"

describe("sanitize", () => {
  describe("sanitizeText", () => {
    it("should remove HTML tags", () => {
      expect(sanitizeText("<script>alert('xss')</script>")).toBe("scriptalert('xss')script")
    })

    it("should remove javascript: protocol", () => {
      expect(sanitizeText("javascript:alert('xss')")).toBe("alert('xss')")
    })

    it("should remove event handlers", () => {
      expect(sanitizeText("onclick=alert('xss')")).toBe("alert('xss')")
    })

    it("should trim whitespace", () => {
      expect(sanitizeText("  hello  ")).toBe("hello")
    })
  })

  describe("sanitizeUrl", () => {
    it("should accept valid http URLs", () => {
      expect(sanitizeUrl("http://example.com")).toBe("http://example.com/")
    })

    it("should accept valid https URLs", () => {
      expect(sanitizeUrl("https://example.com")).toBe("https://example.com/")
    })

    it("should reject javascript: URLs", () => {
      expect(sanitizeUrl("javascript:alert('xss')")).toBeNull()
    })

    it("should reject invalid URLs", () => {
      expect(sanitizeUrl("not-a-url")).toBeNull()
    })
  })

  describe("sanitizeEmail", () => {
    it("should accept valid emails", () => {
      expect(sanitizeEmail("test@example.com")).toBe("test@example.com")
    })

    it("should reject invalid emails", () => {
      expect(sanitizeEmail("not-an-email")).toBeNull()
    })

    it("should lowercase emails", () => {
      expect(sanitizeEmail("TEST@EXAMPLE.COM")).toBe("test@example.com")
    })
  })

  describe("sanitizeName", () => {
    it("should allow letters, spaces, hyphens, and apostrophes", () => {
      expect(sanitizeName("John O'Connor-Smith")).toBe("John O'Connor-Smith")
    })

    it("should remove special characters", () => {
      expect(sanitizeName("John<script>alert('xss')</script>")).toBe("John")
    })

    it("should limit length to 100 characters", () => {
      const longName = "a".repeat(150)
      expect(sanitizeName(longName).length).toBe(100)
    })
  })

  describe("escapeHtml", () => {
    it("should escape HTML special characters", () => {
      expect(escapeHtml("<script>alert('xss')</script>")).toBe(
        "&lt;script&gt;alert(&#039;xss&#039;)&lt;/script&gt;"
      )
    })

    it("should escape quotes", () => {
      expect(escapeHtml('"hello"')).toBe("&quot;hello&quot;")
    })
  })
})

