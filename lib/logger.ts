interface LogContext {
  requestId?: string
  userId?: string
  route?: string
  method?: string
  [key: string]: any
}

class Logger {
  private context: LogContext = {}

  setContext(context: LogContext) {
    this.context = { ...this.context, ...context }
  }

  private log(level: string, message: string, meta: any = {}) {
    const timestamp = new Date().toISOString()
    const logEntry = {
      timestamp,
      level,
      message,
      ...this.context,
      ...meta,
    }

    if (process.env.NODE_ENV === "production") {
      console.log(JSON.stringify(logEntry))
    } else {
      console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, meta)
    }
  }

  info(message: string, meta?: any) {
    this.log("info", message, meta)
  }

  warn(message: string, meta?: any) {
    this.log("warn", message, meta)
  }

  error(message: string, meta?: any) {
    this.log("error", message, meta)
  }

  debug(message: string, meta?: any) {
    if (process.env.NODE_ENV !== "production") {
      this.log("debug", message, meta)
    }
  }
}

export const logger = new Logger()
