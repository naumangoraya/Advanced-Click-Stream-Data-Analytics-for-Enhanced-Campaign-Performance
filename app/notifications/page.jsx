"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingDown, TrendingUp, Mail, AlertCircle, Bell, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "sentiment",
      title: "Negative Sentiment Alert",
      description:
        "Your 'Premium Headphones' product is receiving negative reviews on Amazon, primarily about battery life.",
      date: "2023-06-12T09:45:00Z",
      status: "unread",
      severity: "high",
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
    {
      id: 2,
      type: "sales",
      title: "Sales Increase",
      description: "Your 'Smart Watch' sales have increased by 15% on all platforms compared to last month.",
      date: "2023-06-12T08:30:00Z",
      status: "unread",
      severity: "info",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 3,
      type: "sales",
      title: "Sales Drop Alert",
      description: "Your 'Phone Case' sales have dropped by 8% on AliExpress in the last week.",
      date: "2023-06-11T14:20:00Z",
      status: "read",
      severity: "medium",
      icon: TrendingDown,
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      id: 4,
      type: "email",
      title: "Weekly Report Sent",
      description: "Your weekly sales and performance report has been sent to john@example.com.",
      date: "2023-06-11T09:00:00Z",
      status: "read",
      severity: "info",
      icon: Mail,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 5,
      type: "sentiment",
      title: "Sentiment Improvement",
      description: "The sentiment for your 'Smart Watch' product has improved by 12% on Amazon this month.",
      date: "2023-06-10T16:45:00Z",
      status: "read",
      severity: "info",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 6,
      type: "system",
      title: "Platform Connected",
      description: "Successfully connected to Daraz platform for data synchronization.",
      date: "2023-06-10T11:30:00Z",
      status: "read",
      severity: "info",
      icon: Bell,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
  ])

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        status: "read",
      })),
    )
  }

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, status: "read" } : notification,
      ),
    )
  }

  // Helper to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return diffInHours === 0 ? "Less than an hour ago" : `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`
    } else {
      const options = { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
      return date.toLocaleDateString("en-US", options)
    }
  }

  const unreadCount = notifications.filter((n) => n.status === "unread").length

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with alerts and important information</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sentiment">Sentiment Alerts</SelectItem>
              <SelectItem value="sales">Sales Alerts</SelectItem>
              <SelectItem value="email">Email Notifications</SelectItem>
              <SelectItem value="system">System Notifications</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="relative">
            All
            {unreadCount > 0 && (
              <Badge className="ml-1 h-5 w-5 p-0 text-xs flex items-center justify-center">{unreadCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="info">Information</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-colors ${notification.status === "unread" ? "border-l-4 border-l-primary" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div
                    className={`rounded-full ${notification.bgColor} p-3 h-10 w-10 flex items-center justify-center shrink-0`}
                  >
                    <notification.icon className={`h-5 w-5 ${notification.color}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      {notification.status === "unread" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-8"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                      <Badge
                        variant="outline"
                        className={`
                          ${
                            notification.severity === "high"
                              ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                              : notification.severity === "medium"
                                ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                                : "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                          }
                        `}
                      >
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {notifications
            .filter((n) => n.status === "unread")
            .map((notification) => (
              <Card key={notification.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div
                      className={`rounded-full ${notification.bgColor} p-3 h-10 w-10 flex items-center justify-center shrink-0`}
                    >
                      <notification.icon className={`h-5 w-5 ${notification.color}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-8"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                        <Badge
                          variant="outline"
                          className={`
                          ${
                            notification.severity === "high"
                              ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                              : notification.severity === "medium"
                                ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                                : "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                          }
                        `}
                        >
                          {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {notifications.filter((n) => n.status === "unread").length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                <p className="text-muted-foreground">You have no unread notifications.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          {notifications
            .filter((n) => n.severity === "high" || n.severity === "medium")
            .map((notification) => (
              <Card
                key={notification.id}
                className={`transition-colors ${notification.status === "unread" ? "border-l-4 border-l-primary" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div
                      className={`rounded-full ${notification.bgColor} p-3 h-10 w-10 flex items-center justify-center shrink-0`}
                    >
                      <notification.icon className={`h-5 w-5 ${notification.color}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                        </div>
                        {notification.status === "unread" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-8"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                        <Badge
                          variant="outline"
                          className={`
                          ${
                            notification.severity === "high"
                              ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                          }
                        `}
                        >
                          {notification.severity === "high" ? "High Priority" : "Medium Priority"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {notifications.filter((n) => n.severity === "high" || n.severity === "medium").length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No alerts</h3>
                <p className="text-muted-foreground">You have no high or medium priority alerts at the moment.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          {notifications
            .filter((n) => n.severity === "info")
            .map((notification) => (
              <Card
                key={notification.id}
                className={`transition-colors ${notification.status === "unread" ? "border-l-4 border-l-primary" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div
                      className={`rounded-full ${notification.bgColor} p-3 h-10 w-10 flex items-center justify-center shrink-0`}
                    >
                      <notification.icon className={`h-5 w-5 ${notification.color}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                        </div>
                        {notification.status === "unread" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-8"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                        >
                          Information
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {notifications.filter((n) => n.severity === "info").length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No information</h3>
                <p className="text-muted-foreground">You have no informational notifications at the moment.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Customize how and when you receive notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <div>
                    <h4 className="font-medium">Sales Drop Alerts</h4>
                    <p className="text-sm text-muted-foreground">Notify when sales drop below expected levels</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 text-sm">
                    <select className="rounded-md border px-2 py-1 text-sm">
                      <option>Immediately</option>
                      <option>Daily Digest</option>
                      <option>Weekly Digest</option>
                    </select>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <div>
                    <h4 className="font-medium">Sentiment Alerts</h4>
                    <p className="text-sm text-muted-foreground">Notify on negative customer sentiment</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 text-sm">
                    <select className="rounded-md border px-2 py-1 text-sm">
                      <option>Immediately</option>
                      <option>Daily Digest</option>
                      <option>Weekly Digest</option>
                    </select>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium">Report Delivery</h4>
                    <p className="text-sm text-muted-foreground">Notifications when reports are generated and sent</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 text-sm">
                    <select className="rounded-md border px-2 py-1 text-sm">
                      <option>Immediately</option>
                      <option selected>Daily Digest</option>
                      <option>Weekly Digest</option>
                    </select>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium">System Notifications</h4>
                    <p className="text-sm text-muted-foreground">Updates about system and platform connections</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 text-sm">
                    <select className="rounded-md border px-2 py-1 text-sm">
                      <option>Immediately</option>
                      <option selected>Daily Digest</option>
                      <option>Weekly Digest</option>
                    </select>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
