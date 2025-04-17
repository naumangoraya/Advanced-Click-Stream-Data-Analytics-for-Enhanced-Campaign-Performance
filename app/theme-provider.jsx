"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect } from "react"

export function ThemeProvider({ children, ...props }) {
  // Force theme update on mount
  useEffect(() => {
    // Apply theme class to both html and body elements
    const applyTheme = (theme) => {
      const htmlElement = document.documentElement
      const bodyElement = document.body

      if (theme === "dark") {
        htmlElement.classList.add("dark")
        htmlElement.classList.remove("light")
        bodyElement.classList.add("dark")
        bodyElement.classList.remove("light")
      } else {
        htmlElement.classList.add("light")
        htmlElement.classList.remove("dark")
        bodyElement.classList.add("light")
        bodyElement.classList.remove("dark")
      }
    }

    // Get current theme from localStorage or default to light
    const currentTheme = localStorage.getItem("theme") || "light"

    applyTheme(currentTheme)
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
