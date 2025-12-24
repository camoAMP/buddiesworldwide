"use client"

export default function BootTrace({ tag = "Boot" }: { tag?: string }) {
  console.log(`[${tag}] mounted`)
  return null
}
