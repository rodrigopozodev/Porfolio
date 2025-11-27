import { describe, it, expect, beforeEach } from "vitest"
import { rateLimit, getRequestIdentifier } from "../rateLimit"

describe("rateLimit", () => {
  beforeEach(() => {
    // Rate limit store is in-memory, so we need to wait for cleanup
    // In a real scenario, we'd use a proper cleanup mechanism
  })

  it("should allow requests within limit", () => {
    const result = rateLimit("test-ip", 10, 60000)
    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(9)
  })

  it("should block requests exceeding limit", () => {
    const identifier = "test-ip-2"
    const maxRequests = 3

    // Make requests up to limit
    for (let i = 0; i < maxRequests; i++) {
      rateLimit(identifier, maxRequests, 60000)
    }

    // Next request should be blocked
    const result = rateLimit(identifier, maxRequests, 60000)
    expect(result.allowed).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it("should reset after window expires", async () => {
    const identifier = "test-ip-3"
    const maxRequests = 2
    const windowMs = 100 // Very short window for testing

    // Exceed limit
    rateLimit(identifier, maxRequests, windowMs)
    rateLimit(identifier, maxRequests, windowMs)
    const blocked = rateLimit(identifier, maxRequests, windowMs)
    expect(blocked.allowed).toBe(false)

    // Wait for window to expire
    await new Promise((resolve) => setTimeout(resolve, 150))

    // Should be allowed again
    const allowed = rateLimit(identifier, maxRequests, windowMs)
    expect(allowed.allowed).toBe(true)
  })

  it("should return correct reset time", () => {
    const result = rateLimit("test-ip-4", 10, 60000)
    expect(result.resetTime).toBeGreaterThan(Date.now())
    expect(result.resetTime).toBeLessThanOrEqual(Date.now() + 60000)
  })
})

describe("getRequestIdentifier", () => {
  it("should extract IP from x-forwarded-for header", () => {
    const request = new Request("http://example.com", {
      headers: {
        "x-forwarded-for": "192.168.1.1, 10.0.0.1",
      },
    })
    expect(getRequestIdentifier(request)).toBe("192.168.1.1")
  })

  it("should use x-real-ip if x-forwarded-for is not present", () => {
    const request = new Request("http://example.com", {
      headers: {
        "x-real-ip": "192.168.1.2",
      },
    })
    expect(getRequestIdentifier(request)).toBe("192.168.1.2")
  })

  it("should return 'unknown' if no IP headers are present", () => {
    const request = new Request("http://example.com")
    expect(getRequestIdentifier(request)).toBe("unknown")
  })
})

