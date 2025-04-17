import { TrendingDown, TrendingUp, AlertTriangle, Mail } from "lucide-react"

export default function RecentNotifications() {
  const notifications = [
    {
      id: 1,
      type: "sentiment",
      title: "Negative Sentiment Alert",
      description: "Premium Headphones receiving negative reviews on Amazon",
      time: "2 hours ago",
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
    {
      id: 2,
      type: "sales",
      title: "Sales Increase",
      description: "Smart Watch sales up by 15% on all platforms",
      time: "5 hours ago",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 3,
      type: "sales",
      title: "Sales Drop Alert",
      description: "Phone Case sales down by 8% on AliExpress",
      time: "12 hours ago",
      icon: TrendingDown,
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      id: 4,
      type: "email",
      title: "Weekly Report Sent",
      description: "Sales and performance report sent to john@example.com",
      time: "1 day ago",
      icon: Mail,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
  ]

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 cursor-pointer"
        >
          <div className={`rounded-full ${notification.bgColor} p-2`}>
            <notification.icon className={`h-4 w-4 ${notification.color}`} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">{notification.title}</p>
            <p className="text-xs text-muted-foreground">{notification.description}</p>
            <p className="text-xs text-muted-foreground">{notification.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
