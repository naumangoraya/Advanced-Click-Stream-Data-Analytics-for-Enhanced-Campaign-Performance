"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Bell, MessageSquare, LogOut, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import ChatbotPopup from "./chatbot-popup"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { NotificationBadge } from "@/components/notification-badge"

export default function Header() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Implement logout functionality
    console.log("Logging out")
    router.push("/login")
  }

  const handleNotificationClick = () => {
    router.push("/notifications")
  }

  // Don't show header on login page
  if (pathname === "/login") return null

  // Check if we're already on the chatbot page
  const isOnChatbotPage = pathname === "/chatbot"

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex-1"></div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <NotificationBadge count={3} />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Badge variant="outline" className="ml-2">
                  3 New
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <div className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-md">
                  <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Negative Sentiment Alert</p>
                    <p className="text-xs text-muted-foreground">
                      Premium Headphones receiving negative reviews on Amazon
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-md">
                  <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Sales Increase</p>
                    <p className="text-xs text-muted-foreground">Smart Watch sales up by 15% on all platforms</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-md">
                  <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-2">
                    <TrendingDown className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Sales Drop Alert</p>
                    <p className="text-xs text-muted-foreground">Phone Case sales down by 8% on AliExpress</p>
                    <p className="text-xs text-muted-foreground">12 hours ago</p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/notifications")}
                className="cursor-pointer justify-center font-medium"
              >
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!isOnChatbotPage && (
            <Button variant="ghost" size="icon" onClick={() => setIsChatbotOpen(true)}>
              <MessageSquare className="h-5 w-5" />
            </Button>
          )}

          <ModeToggle />
          <Button variant="outline" size="sm" className="ml-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {isChatbotOpen && !isOnChatbotPage && (
        <ChatbotPopup
          onClose={() => setIsChatbotOpen(false)}
          onEnlarge={() => {
            setIsChatbotOpen(false)
            router.push("/chatbot")
          }}
        />
      )}
    </header>
  )
}
