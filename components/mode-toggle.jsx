"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update the theme class on the root element when theme changes
  useEffect(() => {
    const root = window.document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme])

  if (!mounted) {
    return <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
  }

  return (
    <button
      className="flex items-center focus:outline-none"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <div className="w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer">
        <div
          className={`bg-white dark:bg-primary w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex justify-center items-center
            ${theme === "dark" ? "translate-x-6" : "translate-x-0"}
          `}
        >
          {theme === "dark" ? (
            <Moon className="h-3 w-3 text-gray-800" />
          ) : (
            <Sun className="h-3 w-3 text-amber-500" />
          )}
        </div>
      </div>
    </button>
  )
}
