"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function PlatformComparison({ timeRange = "30d", products = ["all"], platforms = ["all"] }) {
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

          // Base data for each platform
          const baseData = {
            amazon: [85, 80, 90, 75, 85, 90],
            aliexpress: [65, 70, 60, 85, 60, 75],
            daraz: [55, 65, 70, 90, 50, 65],
          }

          // Filter platforms based on selection
          const selectedPlatforms = platforms.includes("all")
            ? ["amazon", "aliexpress", "daraz"]
            : platforms.filter((p) => p !== "all")

          // Adjust data based on product selection
          const productImpacts = {
            "smart-watch": { amazon: 5, aliexpress: -5, daraz: 0 },
            headphones: { amazon: -10, aliexpress: 5, daraz: 0 },
            "phone-case": { amazon: 0, aliexpress: 0, daraz: 15 },
            "wireless-charger": { amazon: 5, aliexpress: 10, daraz: -5 },
            "laptop-stand": { amazon: -5, aliexpress: 5, daraz: 10 },
          }

          // Apply product impacts
          const adjustedData = JSON.parse(JSON.stringify(baseData)) // Deep copy

          if (!products.includes("all")) {
            products
              .filter((p) => p !== "all")
              .forEach((productId) => {
                const impact = productImpacts[productId]
                if (impact) {
                  Object.keys(impact).forEach((platform) => {
                    if (adjustedData[platform]) {
                      adjustedData[platform] = adjustedData[platform].map((val) =>
                        Math.min(100, Math.max(0, val + impact[platform])),
                      )
                    }
                  })
                }
              })
          }

          // Adjust data based on time range
          const timeRangeVolatility = {
            "1h": 20,
            "24h": 15,
            "7d": 10,
            "14d": 7,
            "30d": 5,
            "90d": 3,
            "1y": 2,
          }

          const volatility = timeRangeVolatility[timeRange] || 5

          // Add randomness based on volatility
          Object.keys(adjustedData).forEach((platform) => {
            adjustedData[platform] = adjustedData[platform].map((val) => {
              const randomFactor = Math.floor(Math.random() * volatility * 2) - volatility
              return Math.min(100, Math.max(0, val + randomFactor))
            })
          })

          // Create datasets for the chart
          const datasets = selectedPlatforms.map((platform) => {
            const colors = {
              amazon: {
                bg: "rgba(37, 99, 235, 0.2)",
                border: "rgba(37, 99, 235, 0.8)",
                point: "rgba(37, 99, 235, 1)",
              },
              aliexpress: {
                bg: "rgba(245, 158, 11, 0.2)",
                border: "rgba(245, 158, 11, 0.8)",
                point: "rgba(245, 158, 11, 1)",
              },
              daraz: {
                bg: "rgba(16, 185, 129, 0.2)",
                border: "rgba(16, 185, 129, 0.8)",
                point: "rgba(16, 185, 129, 1)",
              },
            }

            const platformName =
              {
                amazon: "Amazon",
                aliexpress: "AliExpress",
                daraz: "Daraz",
              }[platform] || platform

            return {
              label: platformName,
              data: adjustedData[platform],
              backgroundColor: colors[platform].bg,
              borderColor: colors[platform].border,
              pointBackgroundColor: colors[platform].point,
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: colors[platform].point,
            }
          })

          // Create the chart
          const ctx = chartRef.current.getContext("2d")
          chartRef.current.chart = new Chart(ctx, {
            type: "radar",
            data: {
              labels: ["Revenue", "Orders", "Customer Satisfaction", "Growth Rate", "Conversion Rate", "Return Rate"],
              datasets: datasets,
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                r: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    display: false,
                  },
                  grid: {
                    color: gridColor,
                  },
                  pointLabels: {
                    color: textColor,
                    font: {
                      size: 12,
                      weight: 800,
                    },
                  },
                  angleLines: {
                    color: gridColor,
                  },
                },
              },
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
      "Amazon leads in most performance metrics, especially in revenue and customer satisfaction. AliExpress shows a strong growth rate, suggesting potential for increased future performance. Daraz has the highest growth potential but needs improvement in conversion rates."

    // Product-specific insights
    if (!products.includes("all")) {
      if (products.includes("smart-watch") && products.length === 1) {
        insight =
          "For Smart Watches, Amazon significantly outperforms other platforms in revenue and customer satisfaction. Consider focusing marketing efforts here."
      } else if (products.includes("headphones") && products.length === 1) {
        insight =
          "Premium Headphones are performing better on AliExpress than expected, with particularly strong growth rates."
      } else if (products.includes("phone-case") && products.length === 1) {
        insight =
          "Phone Cases show surprisingly strong performance on Daraz, with excellent growth rates and customer satisfaction."
      }
    }

    // Platform-specific insights
    if (!platforms.includes("all") && platforms.length === 1) {
      if (platforms.includes("amazon")) {
        insight =
          "Amazon shows balanced performance across all metrics, with particularly strong customer satisfaction and revenue generation."
      } else if (platforms.includes("aliexpress")) {
        insight =
          "AliExpress demonstrates exceptional growth rate but needs improvement in conversion rate and customer satisfaction."
      } else if (platforms.includes("daraz")) {
        insight =
          "Daraz has the highest growth potential among all platforms but currently lags in revenue and conversion rates."
      }
    }

    // Time-range specific insights
    if (timeRange === "1h" || timeRange === "24h" || timeRange === "7d") {
      insight += " Short-term data shows more volatility. Consider analyzing longer periods for strategic decisions."
    } else if (timeRange === "1y") {
      insight += " Annual data reveals consistent performance patterns that can inform long-term strategy."
    }

    return insight
  }

  return (
    <div className="space-y-4">
      <div className="h-[350px] w-full">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="mt-4 space-y-3">
        <h4 className="font-medium">Platform Performance Insights</h4>
        <p className="text-sm text-muted-foreground">{getInsights()}</p>
      </div>
    </div>
  )
}
