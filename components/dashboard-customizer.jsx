"use client"

import React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardCustomizer({ open, onOpenChange, config, onConfigChange }) {
  const [localConfig, setLocalConfig] = useState(config)

  const handleSave = () => {
    onConfigChange(localConfig)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setLocalConfig(config)
    onOpenChange(false)
  }

  const toggleCardVisibility = (cardId) => {
    setLocalConfig({
      ...localConfig,
      cards: {
        ...localConfig.cards,
        [cardId]: {
          ...localConfig.cards[cardId],
          show: !localConfig.cards[cardId].show,
        },
      },
    })
  }

  const toggleSectionVisibility = (sectionId) => {
    setLocalConfig({
      ...localConfig,
      sections: {
        ...localConfig.sections,
        [sectionId]: {
          ...localConfig.sections[sectionId],
          show: !localConfig.sections[sectionId].show,
        },
      },
    })
  }

  const moveCardUp = (cardId) => {
    const currentOrder = localConfig.cards[cardId].order
    const cardToSwap = Object.entries(localConfig.cards).find(([key, value]) => value.order === currentOrder - 1)

    if (cardToSwap) {
      setLocalConfig({
        ...localConfig,
        cards: {
          ...localConfig.cards,
          [cardId]: {
            ...localConfig.cards[cardId],
            order: currentOrder - 1,
          },
          [cardToSwap[0]]: {
            ...localConfig.cards[cardToSwap[0]],
            order: currentOrder,
          },
        },
      })
    }
  }

  const moveCardDown = (cardId) => {
    const currentOrder = localConfig.cards[cardId].order
    const cardToSwap = Object.entries(localConfig.cards).find(([key, value]) => value.order === currentOrder + 1)

    if (cardToSwap) {
      setLocalConfig({
        ...localConfig,
        cards: {
          ...localConfig.cards,
          [cardId]: {
            ...localConfig.cards[cardId],
            order: currentOrder + 1,
          },
          [cardToSwap[0]]: {
            ...localConfig.cards[cardToSwap[0]],
            order: currentOrder,
          },
        },
      })
    }
  }

  const moveSectionUp = (sectionId) => {
    const currentOrder = localConfig.sections[sectionId].order
    const sectionToSwap = Object.entries(localConfig.sections).find(([key, value]) => value.order === currentOrder - 1)

    if (sectionToSwap) {
      setLocalConfig({
        ...localConfig,
        sections: {
          ...localConfig.sections,
          [sectionId]: {
            ...localConfig.sections[sectionId],
            order: currentOrder - 1,
          },
          [sectionToSwap[0]]: {
            ...localConfig.sections[sectionToSwap[0]],
            order: currentOrder,
          },
        },
      })
    }
  }

  const moveSectionDown = (sectionId) => {
    const currentOrder = localConfig.sections[sectionId].order
    const sectionToSwap = Object.entries(localConfig.sections).find(([key, value]) => value.order === currentOrder + 1)

    if (sectionToSwap) {
      setLocalConfig({
        ...localConfig,
        sections: {
          ...localConfig.sections,
          [sectionId]: {
            ...localConfig.sections[sectionId],
            order: currentOrder + 1,
          },
          [sectionToSwap[0]]: {
            ...localConfig.sections[sectionToSwap[0]],
            order: currentOrder,
          },
        },
      })
    }
  }

  const setChartType = (type) => {
    setLocalConfig({
      ...localConfig,
      charts: {
        ...localConfig.charts,
        type,
      },
    })
  }

  const setTimeRange = (timeRange) => {
    setLocalConfig({
      ...localConfig,
      charts: {
        ...localConfig.charts,
        timeRange,
      },
    })
  }

  // Get sorted cards and sections for display
  const sortedCards = Object.entries(localConfig.cards)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([key, value]) => ({ id: key, ...value }))

  const sortedSections = Object.entries(localConfig.sections)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([key, value]) => ({ id: key, ...value }))

  const cardLabels = {
    revenue: { name: "Total Revenue", icon: DollarSign },
    orders: { name: "Total Orders", icon: ShoppingCart },
    customers: { name: "Active Customers", icon: Users },
    conversion: { name: "Conversion Rate", icon: TrendingUp },
  }

  const sectionLabels = {
    overview: "Overview",
    sales: "Sales Performance",
    sentiment: "Sentiment Analysis",
    platforms: "Platform Comparison",
    forecast: "Forecasted Sales",
    alerts: "Critical Alerts",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Dashboard</DialogTitle>
          <DialogDescription>Configure which elements to display and their order on your dashboard</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="cards" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="cards">Summary Cards</TabsTrigger>
            <TabsTrigger value="sections">Dashboard Sections</TabsTrigger>
            <TabsTrigger value="charts">Chart Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-4">
            <div className="grid gap-4">
              {sortedCards.map((card) => (
                <Card key={card.id} className="flex items-center p-2">
                  <CardContent className="flex items-center justify-between p-2 w-full">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`card-${card.id}`}
                        checked={card.show}
                        onCheckedChange={() => toggleCardVisibility(card.id)}
                      />
                      <div className="flex items-center gap-2">
                        {cardLabels[card.id]?.icon &&
                          React.createElement(cardLabels[card.id].icon, {
                            className: "h-4 w-4 text-muted-foreground",
                          })}
                        <Label htmlFor={`card-${card.id}`} className="font-medium">
                          {cardLabels[card.id]?.name || card.id}
                        </Label>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => moveCardUp(card.id)}
                        disabled={card.order === 1}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => moveCardDown(card.id)}
                        disabled={card.order === Object.keys(localConfig.cards).length}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sections" className="space-y-4">
            <div className="grid gap-4">
              {sortedSections.map((section) => (
                <Card key={section.id} className="flex items-center p-2">
                  <CardContent className="flex items-center justify-between p-2 w-full">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`section-${section.id}`}
                        checked={section.show}
                        onCheckedChange={() => toggleSectionVisibility(section.id)}
                      />
                      <Label htmlFor={`section-${section.id}`} className="font-medium">
                        {sectionLabels[section.id] || section.id}
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => moveSectionUp(section.id)}
                        disabled={section.order === 1}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => moveSectionDown(section.id)}
                        disabled={section.order === Object.keys(localConfig.sections).length}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Chart Type</h3>
                <RadioGroup
                  value={localConfig.charts.type}
                  onValueChange={setChartType}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="line" id="chart-line" />
                    <Label htmlFor="chart-line">Line Chart</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bar" id="chart-bar" />
                    <Label htmlFor="chart-bar">Bar Chart</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pie" id="chart-pie" />
                    <Label htmlFor="chart-pie">Pie Chart</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Time Range</h3>
                <Select value={localConfig.charts.timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Hourly</SelectItem>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="14d">Last 14 Days</SelectItem>
                    <SelectItem value="30d">Monthly</SelectItem>
                    <SelectItem value="90d">Quarterly</SelectItem>
                    <SelectItem value="1y">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
