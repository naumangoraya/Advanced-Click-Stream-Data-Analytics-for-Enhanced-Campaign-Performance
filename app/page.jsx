"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Users, ShoppingCart, TrendingUp, Bell, AlertTriangle, Settings } from "lucide-react"
import DashboardChart from "@/components/dashboard-chart"
import RecentNotifications from "@/components/recent-notifications"
import PlatformComparison from "@/components/platform-comparison"
import SentimentAnalysis from "@/components/sentiment-analysis"
import ProductPerformance from "@/components/product-performance"
import DashboardCustomizer from "@/components/dashboard-customizer"

export default function Home() {
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [dashboardConfig, setDashboardConfig] = useState({
    cards: {
      revenue: { show: true, order: 1 },
      orders: { show: true, order: 2 },
      customers: { show: true, order: 3 },
      conversion: { show: true, order: 4 },
    },
    sections: {
      overview: { show: true, order: 1 },
      sales: { show: true, order: 2 },
      sentiment: { show: true, order: 3 },
      platforms: { show: true, order: 4 },
      forecast: { show: true, order: 5 },
      alerts: { show: true, order: 6 },
    },
    charts: {
      type: "line",
      timeRange: "30d",
    },
  })

  // Get visible cards sorted by order
  const getVisibleCards = () => {
    return Object.entries(dashboardConfig.cards)
      .filter(([_, config]) => config.show)
      .sort((a, b) => a[1].order - b[1].order)
      .map(([key]) => key)
  }

  // Get visible sections sorted by order
  const getVisibleSections = () => {
    return Object.entries(dashboardConfig.sections)
      .filter(([_, config]) => config.show)
      .sort((a, b) => a[1].order - b[1].order)
      .map(([key]) => key)
  }

  const visibleCards = getVisibleCards()
  const visibleSections = getVisibleSections()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Your e-commerce performance at a glance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowCustomizer(true)} className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Customize Dashboard
          </Button>
          <Button>Export Report</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {visibleCards.includes("revenue") && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium">Total Revenue</p>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">$45,231.89</h3>
                <p className="text-sm text-green-500">+20.1%</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
            </CardContent>
          </Card>
        )}

        {visibleCards.includes("orders") && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium">Total Orders</p>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">2,345</h3>
                <p className="text-sm text-green-500">+12.4%</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
            </CardContent>
          </Card>
        )}

        {visibleCards.includes("customers") && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium">Active Customers</p>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">1,895</h3>
                <p className="text-sm text-green-500">+8.2%</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
            </CardContent>
          </Card>
        )}

        {visibleCards.includes("conversion") && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium">Conversion Rate</p>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">3.85%</h3>
                <p className="text-sm text-red-500">-1.2%</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          {visibleSections.includes("overview") && <TabsTrigger value="overview">Overview</TabsTrigger>}
          {visibleSections.includes("sales") && <TabsTrigger value="sales">Sales</TabsTrigger>}
          {visibleSections.includes("sentiment") && <TabsTrigger value="sentiment">Sentiment</TabsTrigger>}
          {visibleSections.includes("platforms") && <TabsTrigger value="platforms">Platforms</TabsTrigger>}
        </TabsList>

        {visibleSections.includes("overview") && (
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>Monthly sales performance across all platforms</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <DashboardChart
                    chartType={dashboardConfig.charts.type}
                    timeRange={dashboardConfig.charts.timeRange}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>Latest alerts and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentNotifications />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {visibleSections.includes("sales") && (
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Detailed analysis of sales across products and platforms</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ProductPerformance timeRange={dashboardConfig.charts.timeRange} />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {visibleSections.includes("sentiment") && (
          <TabsContent value="sentiment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
                <CardDescription>Customer sentiment for your products across platforms</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SentimentAnalysis timeRange={dashboardConfig.charts.timeRange} />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {visibleSections.includes("platforms") && (
          <TabsContent value="platforms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Comparison</CardTitle>
                <CardDescription>Performance comparison across e-commerce platforms</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <PlatformComparison timeRange={dashboardConfig.charts.timeRange} />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {visibleSections.includes("forecast") && visibleSections.includes("alerts") && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {visibleSections.includes("forecast") && (
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Forecasted Sales</CardTitle>
                <CardDescription>Projected sales for the next 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <DashboardChart chartType={dashboardConfig.charts.type} timeRange={dashboardConfig.charts.timeRange} />
              </CardContent>
            </Card>
          )}

          {visibleSections.includes("alerts") && (
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Critical Alerts</CardTitle>
                <CardDescription>Important notifications requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Negative Sentiment Alert</p>
                      <p className="text-xs text-muted-foreground">
                        Your "Premium Headphones" product is receiving negative reviews on Amazon.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                      <Bell className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Sales Drop Alert</p>
                      <p className="text-xs text-muted-foreground">
                        Your "Smart Watch" sales have dropped by 15% on AliExpress in the last week.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Dashboard Customizer Dialog */}
      <DashboardCustomizer
        open={showCustomizer}
        onOpenChange={setShowCustomizer}
        config={dashboardConfig}
        onConfigChange={setDashboardConfig}
      />
    </div>
  )
}
