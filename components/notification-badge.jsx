"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

export function NotificationBadge({ count = 0 }) {
  const [isVisible, setIsVisible] = useState(true)

  // Optional: Add a pulsing effect for new notifications
  useEffect(() => {
    if (count > 0) {
      const interval = setInterval(() => {
        setIsVisible((prev) => !prev)
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [count])

  if (count === 0) return null

  return (
    <Badge
      className={`absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-70"}`}
    >
      {count > 9 ? "9+" : count}
    </Badge>
  )
}
