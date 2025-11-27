/**
 * Sistema de logging centralizado.
 * Permite logging estructurado con diferentes niveles y facilita integración con servicios externos.
 */

type LogLevel = "debug" | "info" | "warn" | "error"

interface LogContext {
  [key: string]: unknown
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development"

  private log(level: LogLevel, message: string, context?: LogContext, error?: Error) {
    const timestamp = new Date().toISOString()
    const logEntry = {
      timestamp,
      level,
      message,
      ...(context && { context }),
      ...(error && {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      }),
    }

    // In development, log to console with colors
    if (this.isDevelopment) {
      const styles = {
        debug: "color: #6b7280",
        info: "color: #3b82f6",
        warn: "color: #f59e0b",
        error: "color: #ef4444",
      }
      console[level === "debug" ? "log" : level](
        `%c[${level.toUpperCase()}] ${message}`,
        styles[level],
        logEntry
      )
    } else {
      // In production, you could send to external service (Sentry, LogRocket, etc.)
      // Example: sendToLoggingService(logEntry)
    }

    // Always log errors to console.error
    if (level === "error") {
      console.error(`[ERROR] ${message}`, error || context)
    }
  }

  debug(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      this.log("debug", message, context)
    }
  }

  info(message: string, context?: LogContext) {
    this.log("info", message, context)
  }

  warn(message: string, context?: LogContext) {
    this.log("warn", message, context)
  }

  error(message: string, error?: Error, context?: LogContext) {
    this.log("error", message, context, error)
  }
}

export const logger = new Logger()

