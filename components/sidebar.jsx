"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Upload, LinkIcon, BarChart2, Mail, MessageSquare, Bell, FileText, Menu, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [expanded, setExpanded] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setExpanded(false)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const toggleSidebar = () => {
    setExpanded(!expanded)
  }

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/login")
  }

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "File Upload", href: "/file-upload", icon: Upload },
    { name: "Link Upload", href: "/link-upload", icon: LinkIcon },
    { name: "Graphs", href: "/graphs", icon: BarChart2 },
    { name: "Email Settings", href: "/email", icon: Mail },
    { name: "Chatbot", href: "/chatbot", icon: MessageSquare },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Files & Links", href: "/files-links", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className={`relative border-r bg-sidebar transition-all duration-300 ${expanded ? "w-64" : "w-16"}`}>
      <div className="flex h-16 items-center justify-between px-4">
        {expanded && (
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <BarChart2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold">ClickAnalyst</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8">
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          {expanded && (
            <h2 className="mb-2 px-4 text-xs font-semibold uppercase text-sidebar-foreground/70">Main Menu</h2>
          )}
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  pathname === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent",
                )}
              >
                <item.icon
                  className="h-5 w-5 flex-shrink-0"
                  style={{
                    marginRight: expanded ? "0.5rem" : "0",
                    marginLeft: expanded ? "0" : "auto",
                    marginRight: expanded ? "0.5rem" : "auto",
                  }}
                />
                {expanded && <span>{item.name}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatar.png" alt="User avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {expanded && (
            <div className="flex flex-col text-sm">
              <span className="font-medium">John Doe</span>
              <span className="text-xs text-sidebar-foreground/70">john@example.com</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
