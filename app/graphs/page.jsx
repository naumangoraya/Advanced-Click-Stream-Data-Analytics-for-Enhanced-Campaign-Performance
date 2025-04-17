"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, ExternalLink, Calendar, ChevronDown, Check } from "lucide-react"
import DashboardChart from "@/components/dashboard-chart"
import SentimentAnalysis from "@/components/sentiment-analysis"
import PlatformComparison from "@/components/platform-comparison"
import ProductPerformance from "@/components/product-performance"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export default function GraphsPage() {
  const [powerBiUrl, setPowerBiUrl] = useState("http://desktop-uefnm9u/Reports/powerbi/practice_1")
  const [isLoading, setIsLoading] = useState(false)
  const [activeChartType, setActiveChartType] = useState("line")

  // Customization options
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedProducts, setSelectedProducts] = useState(["all"])
  const [selectedPlatforms, setSelectedPlatforms] = useState(["all"])

  // Available products and platforms
  const products = [
    { id: "all", name: "All Products" },
    { id: "smart-watch", name: "Smart Watch" },
    { id: "headphones", name: "Premium Headphones" },
    { id: "phone-case", name: "Phone Case" },
    { id: "wireless-charger", name: "Wireless Charger" },
    { id: "laptop-stand", name: "Laptop Stand" },
  ]

  const platforms = [
    { id: "all", name: "All Platforms" },
    { id: "amazon", name: "Amazon" },
    { id: "aliexpress", name: "AliExpress" },
    { id: "daraz", name: "Daraz" },
  ]

  const timeRanges = [
    { id: "1h", name: "Hourly" },
    { id: "24h", name: "Last 24 Hours" },
    { id: "7d", name: "Last 7 Days" },
    { id: "14d", name: "Last 14 Days" },
    { id: "30d", name: "Monthly" },
    { id: "90d", name: "Quarterly" },
    { id: "1y", name: "Yearly" },
  ]

  const handleRefreshPowerBI = () => {
    setIsLoading(true)
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handleChartTypeChange = (type) => {
    setActiveChartType(type)
  }

  const handleProductSelection = (productId) => {
    if (productId === "all") {
      setSelectedProducts(["all"])
    } else {
      const newSelection = selectedProducts.includes(productId)
        ? selectedProducts.filter((id) => id !== productId)
        : [...selectedProducts.filter((id) => id !== "all"), productId]

      setSelectedProducts(newSelection.length > 0 ? newSelection : ["all"])
    }
  }

  const handlePlatformSelection = (platformId) => {
    if (platformId === "all") {
      setSelectedPlatforms(["all"])
    } else {
      const newSelection = selectedPlatforms.includes(platformId)
        ? selectedPlatforms.filter((id) => id !== platformId)
        : [...selectedPlatforms.filter((id) => id !== "all"), platformId]

      setSelectedPlatforms(newSelection.length > 0 ? newSelection : ["all"])
    }
  }

  // Get display names for selected items
  const getSelectedProductsDisplay = () => {
    if (selectedProducts.includes("all")) return "All Products"
    if (selectedProducts.length === 1) return products.find((p) => p.id === selectedProducts[0])?.name
    return `${selectedProducts.length} Products Selected`
  }

  const getSelectedPlatformsDisplay = () => {
    if (selectedPlatforms.includes("all")) return "All Platforms"
    if (selectedPlatforms.length === 1) return platforms.find((p) => p.id === selectedPlatforms[0])?.name
    return `${selectedPlatforms.length} Platforms Selected`
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Graphs</h1>
        <p className="text-muted-foreground">Visualize and analyze your e-commerce performance data</p>
      </div>

      <Tabs defaultValue="built-in" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="built-in">Built-in Analytics</TabsTrigger>
          <TabsTrigger value="power-bi">Power BI Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="built-in" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant={activeChartType === "bar" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handleChartTypeChange("bar")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 9h6v6H9z" />
                </svg>
                Bar Charts
              </Button>
              <Button
                variant={activeChartType === "line" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handleChartTypeChange("line")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                Line Charts
              </Button>
              <Button
                variant={activeChartType === "pie" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handleChartTypeChange("pie")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M12 10v12" />
                  <path d="M18.5 12 12 10l-6.5 2L12 4z" />
                </svg>
                Pie Charts
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{timeRanges.find((tr) => tr.id === timeRange)?.name || "Time Range"}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Select Time Range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {timeRanges.map((tr) => (
                  <DropdownMenuItem key={tr.id} onClick={() => setTimeRange(tr.id)} className="flex items-center gap-2">
                    {timeRange === tr.id && <Check className="h-4 w-4" />}
                    <span className={timeRange === tr.id ? "font-medium" : ""}>{tr.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <span>{getSelectedProductsDisplay()}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <div className="p-2">
                  <div className="font-medium mb-2">Select Products</div>
                  <div className="space-y-2">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`product-${product.id}`}
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => handleProductSelection(product.id)}
                        />
                        <label htmlFor={`product-${product.id}`} className="text-sm cursor-pointer flex-1">
                          {product.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <span>{getSelectedPlatformsDisplay()}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <div className="p-2">
                  <div className="font-medium mb-2">Select Platforms</div>
                  <div className="space-y-2">
                    {platforms.map((platform) => (
                      <div key={platform.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`platform-${platform.id}`}
                          checked={selectedPlatforms.includes(platform.id)}
                          onCheckedChange={() => handlePlatformSelection(platform.id)}
                        />
                        <label htmlFor={`platform-${platform.id}`} className="text-sm cursor-pointer flex-1">
                          {platform.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Display selected filters as badges */}
            <div className="flex flex-wrap gap-1 ml-2">
              {!selectedProducts.includes("all") &&
                selectedProducts.map((productId) => (
                  <Badge key={productId} variant="outline" className="bg-primary/10">
                    {products.find((p) => p.id === productId)?.name}
                  </Badge>
                ))}

              {!selectedPlatforms.includes("all") &&
                selectedPlatforms.map((platformId) => (
                  <Badge key={platformId} variant="outline" className="bg-primary/10">
                    {platforms.find((p) => p.id === platformId)?.name}
                  </Badge>
                ))}
            </div>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  {timeRanges.find((tr) => tr.id === timeRange)?.name} sales performance
                  {!selectedProducts.includes("all") &&
                    selectedProducts.length === 1 &&
                    ` for ${products.find((p) => p.id === selectedProducts[0])?.name}`}
                  {!selectedPlatforms.includes("all") &&
                    selectedPlatforms.length === 1 &&
                    ` on ${platforms.find((p) => p.id === selectedPlatforms[0])?.name}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardChart
                  chartType={activeChartType}
                  timeRange={timeRange}
                  products={selectedProducts}
                  platforms={selectedPlatforms}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
                <CardDescription>
                  Customer sentiment for
                  {!selectedProducts.includes("all") && selectedProducts.length === 1
                    ? ` ${products.find((p) => p.id === selectedProducts[0])?.name}`
                    : " your products"}
                  {!selectedPlatforms.includes("all") && selectedPlatforms.length === 1
                    ? ` on ${platforms.find((p) => p.id === selectedPlatforms[0])?.name}`
                    : " across platforms"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SentimentAnalysis timeRange={timeRange} products={selectedProducts} platforms={selectedPlatforms} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Comparison</CardTitle>
                <CardDescription>
                  Performance comparison across e-commerce platforms
                  {!selectedProducts.includes("all") &&
                    selectedProducts.length === 1 &&
                    ` for ${products.find((p) => p.id === selectedProducts[0])?.name}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PlatformComparison timeRange={timeRange} products={selectedProducts} platforms={selectedPlatforms} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>
                  Detailed analysis of sales across products
                  {!selectedPlatforms.includes("all") &&
                    selectedPlatforms.length === 1 &&
                    ` on ${platforms.find((p) => p.id === selectedPlatforms[0])?.name}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductPerformance timeRange={timeRange} products={selectedProducts} platforms={selectedPlatforms} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="power-bi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Power BI Integration</CardTitle>
              <CardDescription>Connect to your Power BI reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="power-bi-url">Power BI Report URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="power-bi-url"
                    value={powerBiUrl}
                    onChange={(e) => setPowerBiUrl(e.target.value)}
                    placeholder="Enter Power BI report URL"
                  />
                  <Button variant="outline" size="icon" onClick={handleRefreshPowerBI} disabled={isLoading}>
                    <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border overflow-hidden">
                <div className="bg-muted p-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Power BI Report</span>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-xs">Open in Power BI</span>
                  </Button>
                </div>
                <div className="aspect-video bg-card p-4 flex items-center justify-center">
                  <iframe
                    title="Power BI Report"
                    src={powerBiUrl}
                    className="w-full h-full border-0"
                    style={{ minHeight: "500px" }}
                  >
                    <p>Your browser does not support iframes.</p>
                  </iframe>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
