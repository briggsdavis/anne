type LogLevel = "error" | "warn" | "info" | "debug"

interface LogContext {
  [key: string]: unknown
}

class Logger {
  private isDevelopment: boolean

  constructor() {
    // Safely access NODE_ENV with fallback
    this.isDevelopment = typeof process !== "undefined" && process.env?.NODE_ENV === "development"
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString()
    const baseMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`

    if (context && Object.keys(context).length > 0) {
      return `${baseMessage}\nContext: ${JSON.stringify(context, null, 2)}`
    }

    return baseMessage
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    const formattedMessage = this.formatMessage(level, message, context)

    // In development, use console for immediate feedback
    if (this.isDevelopment) {
      switch (level) {
        case "error":
          console.error(formattedMessage)
          break
        case "warn":
          console.warn(formattedMessage)
          break
        case "info":
          console.info(formattedMessage)
          break
        case "debug":
          console.debug(formattedMessage)
          break
      }
    } else {
      // In production, you might want to send logs to a service like Sentry, LogRocket, etc.
      // For now, we'll just suppress non-error logs
      if (level === "error") {
        console.error(formattedMessage)
      }
    }
  }

  error(message: string, context?: LogContext): void {
    this.log("error", message, context)
  }

  warn(message: string, context?: LogContext): void {
    this.log("warn", message, context)
  }

  info(message: string, context?: LogContext): void {
    this.log("info", message, context)
  }

  debug(message: string, context?: LogContext): void {
    this.log("debug", message, context)
  }

  // Specialized error logging for API errors
  apiError(operation: string, error: unknown, additionalContext?: LogContext): void {
    this.error(`API Error in ${operation}`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      ...additionalContext,
    })
  }

  // Specialized logging for authentication events
  authEvent(event: string, context?: LogContext): void {
    this.info(`Auth Event: ${event}`, context)
  }
}

// Export singleton instance
export const logger = new Logger()

// Export types for use in other files
export type { LogLevel, LogContext }
