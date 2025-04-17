"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function ProductPerformance({ timeRange = "30d", products = ["all"], platforms = ["all"] }) {
  const chartRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initializeChart = async () => {
        const { Chart, registerables } = await import("chart.js")
        Chart.register(...registerables)

        if (chartRef.current) {
          // Destroy previous chart instance if it exists
          if (chartRef.current.chart) {
            chartRef.current.chart.destroy()
          }

          const isDarkMode = theme === "dark"
          const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
          // Force white text in dark mode
          const textColor = isDarkMode ? "#FFFFFF" : "#000000"

          // Base data for all products
          const baseRevenueData = {
            "smart-watch": 18500,
            headphones: 12300,
            "phone-case": 8500,
            "wireless-charger": 5200,
            "laptop-stand": 4100,
          }

          const baseUnitsData = {
            "smart-watch": 850,
            headphones: 380,
            "phone-case": 1250,
            "wireless-charger": 420,
            "laptop-stand": 280,
          }

          // Filter products based on selection
          const productLabels = {
            "smart-watch": "Smart Watch",
            headphones: "Premium Headphones",
            "phone-case": "Phone Case",
            "wireless-charger": "Wireless Charger",
            "laptop-stand": "Laptop Stand",
          }

          const selectedProductIds = products.includes("all")
            ? Object.keys(baseRevenueData)
            : products.filter((p) => p !== "all" && baseRevenueData[p] !== undefined)

          const selectedProductLabels = selectedProductIds.map((id) => productLabels[id] || id)

          // Platform multipliers
          const platformMultipliers = {
            amazon: { revenue: 1.2, units: 1.1 },
            aliexpress: { revenue: 0.8, units: 1.3 },
            daraz: { revenue: 0.6, units: 0.9 },
          }

          // Calculate platform impact
          let revenueMultiplier = 1
          let unitsMultiplier = 1

          if (!platforms.includes("all")) {
            let totalRevenueMultiplier = 0
            let totalUnitsMultiplier = 0

            platforms
              .filter((p) => p !== "all")
              .forEach((platform) => {
                if (platformMultipliers[platform]) {
                  totalRevenueMultiplier += platformMultipliers[platform].revenue
                  totalUnitsMultiplier += platformMultipliers[platform].units
                }
              })

            const platformCount = platforms.filter((p) => p !== "all").length
            if (platformCount > 0) {
              revenueMultiplier = totalRevenueMultiplier / platformCount
              unitsMultiplier = totalUnitsMultiplier / platformCount
            }
          }

          // Time range multipliers
          const timeMultipliers = {
            "1h": 0.01,
            "24h": 0.03,
            "7d": 0.2,
            "14d": 0.4,
            "30d": 1,
            "90d": 3,
            "1y": 12,
          }

          const timeMultiplier = timeMultipliers[timeRange] || 1

          // Generate final data
          const revenueData = selectedProductIds.map((id) =>
            Math.round(baseRevenueData[id] * revenueMultiplier * timeMultiplier),
          )

          const unitsData = selectedProductIds.map((id) =>
            Math.round(baseUnitsData[id] * unitsMultiplier * timeMultiplier),
          )

          // Create the chart
          const ctx = chartRef.current.getContext("2d")
          chartRef.current.chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: selectedProductLabels,
              datasets: [
                {
                  label: "Revenue",
                  data: revenueData,
                  backgroundColor: "rgba(37, 99, 235, 0.7)",
                  borderColor: "rgba(37, 99, 235, 1)",
                  borderWidth: 1,
                },
                {
                  label: "Units Sold",
                  data: unitsData,
                  backgroundColor: "rgba(16, 185, 129, 0.7)",
                  borderColor: "rgba(16, 185, 129, 1)",
                  borderWidth: 1,
                  yAxisID: "y1",
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    boxWidth: 10,
                    usePointStyle: true,
                    pointStyle: "circle",
                    color: textColor,
                    font: {
                      weight: 800,
                      size: 12,
                    },
                  },
                },
                tooltip: {
                  enabled: true,
                  mode: "index",
                  intersect: false,
                  backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                  titleColor: isDarkMode ? "#ffffff" : "#111827",
                  bodyColor: isDarkMode ? "#d1d5db" : "#4b5563",
                  borderColor: isDarkMode ? "#4b5563" : "#e5e7eb",
                  borderWidth: 1,
                  padding: 10,
                  cornerRadius: 4,
                  boxPadding: 3,
                  callbacks: {
                    label: (context) => {
                      const label = context.dataset.label || ""
                      const value = context.raw

                      if (label === "Revenue") {
                        return `${label}: $${value.toLocaleString()}`
                      } else {
                        return `${label}: ${value.toLocaleString()}`
                      }
                    },
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: textColor,
                    font: {
                      weight: 800,
                      size: 12,
                    },
                  },
                  title: {
                    display: true,
                    text: "Products",
                    color: textColor,
                    font: {
                      weight: 800,
                      size: 14,
                    },
                  },
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    display: true,
                    color: gridColor,
                  },
                  ticks: {
                    color: textColor,
                    font: {
                      weight: 800,
                      size: 12,
                    },
                    callback: (value) => "$" + value.toLocaleString(),
                  },
                  title: {
                    display: true,
                    text: "Revenue ($)",
                    color: textColor,
                    font: {
                      weight: 800,
                      size: 14,
                    },
                  },
                },
                y1: {
                  beginAtZero: true,
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: textColor,
                    font: {
                      weight: 800,
                      size: 12,
                    },
                  },
                  position: "right",
                  title: {
                    display: true,
                    text: "Units Sold",
                    color: textColor,
                    font: {
                      weight: 800,
                      size: 14,
                    },
                  },
                },
              },
            },
          })
        }
      }

      initializeChart()
    }

    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }
    }
  }, [theme, timeRange, products, platforms])

  // Generate insights based on filters
  const getInsights = () => {
    // Default insight
    let insight =
      "Smart Watches generate the highest revenue despite moderate unit sales, indicating a high profit margin. Phone Cases have the highest unit sales but lower revenue, suggesting they are entry-level products that could be used for upselling."

    // Platform-specific insights
    if (!platforms.includes("all")) {
      if (platforms.includes("amazon") && platforms.length === 1) {
        insight =
          "On Amazon, Smart Watches and Premium Headphones are your top performers in terms of revenue. Consider increasing marketing budget for these products on this platform."
      } else if (platforms.includes("aliexpress") && platforms.length === 1) {
        insight =
          "On AliExpress, Phone Cases sell in much higher volumes than other products. Consider bundle offers with other products to increase average order value."
      } else if (platforms.includes("daraz") && platforms.length === 1) {
        insight =
          "Daraz shows lower overall performance but has good potential for growth, especially for Smart Watches which outperform other products on this platform."
      }
    }

    // Product-specific insights
    if (!products.includes("all") && products.length === 1) {
      const productId = products[0]
      if (productId === "smart-watch") {
        insight =
          "Smart Watches are your premium product with the highest profit margin. They perform exceptionally well on Amazon but have growth potential on other platforms."
      } else if (productId === "headphones") {
        insight =
          "Premium Headphones show consistent performance across platforms with good revenue generation. Consider product improvements to address the negative sentiment on Amazon."
      } else if (productId === "phone-case") {
        insight =
          "Phone Cases are your volume leader with the highest unit sales. Consider introducing premium variants to increase the average selling price."
      }
    }

    // Time-range specific insights
    if (timeRange === "1h" || timeRange === "24h") {
      insight +=
        " This short-term data shows typical daily patterns. For strategic decisions, consider analyzing monthly or quarterly data."
    } else if (timeRange === "1y") {
      insight +=
        " Annual data shows consistent product performance patterns that can inform your long-term product strategy."
    }

    return insight
  }

  return (
    <div className="space-y-4">
      <div className="h-[350px] w-full">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="mt-4 space-y-3">
        <h4 className="font-medium">Product Performance Insights</h4>
        <p className="text-sm text-muted-foreground">{getInsights()}</p>
      </div>
    </div>
  )
}
