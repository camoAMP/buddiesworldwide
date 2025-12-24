"use client"

import { toast } from "@/hooks/use-toast"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorResponse {
  ok: false
  code: string
  message: string
  requestId?: string
}

export function showErrorToast(error: ErrorResponse | Error | string) {
  let title = "Something went wrong"
  let description = "Please try again later"
  let requestId: string | undefined

  if (typeof error === "string") {
    description = error
  } else if (error instanceof Error) {
    description = error.message
  } else {
    title = error.code || "Error"
    description = error.message
    requestId = error.requestId
  }

  toast({
    variant: "destructive",
    title,
    description,
    action: requestId ? (
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          navigator.clipboard.writeText(requestId!)
          toast({ title: "Copied!", description: "Request ID copied to clipboard" })
        }}
      >
        <Copy className="h-3 w-3 mr-1" />
        Copy ID
      </Button>
    ) : undefined,
  })
}

// Fetch wrapper that shows error toasts
export async function fetchWithErrorHandling(url: string, options?: RequestInit): Promise<any> {
  try {
    const response = await fetch(url, options)
    const data = await response.json()

    if (!response.ok || !data.ok) {
      showErrorToast(data)
      throw new Error(data.message || "Request failed")
    }

    return data.data
  } catch (error) {
    if (error instanceof Error) {
      showErrorToast(error)
    }
    throw error
  }
}
