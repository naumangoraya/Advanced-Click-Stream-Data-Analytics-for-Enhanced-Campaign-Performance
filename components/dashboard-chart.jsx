"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function DashboardChart({
  chartType = "line",
  timeRange = "30d",
  products = ["all"],
  platforms = ["all"],
}) {
  const chartRef = useRef(null)
  const { theme } = useTheme()
  const [activeChartType, setActiveChartType] = useState(chartType)

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
          const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"

          // Force white text in dark mode
          const textColor = isDarkMode ? "#FFFFFF" : "#000000"

          const ctx = chartRef.current.getContext("2d")

          // Adjust data based on time range
          let labels = []
          let dataMultiplier = 1

          switch (timeRange) {
            case "1h":
              labels = Array.from({ length: 60 }, (_, i) => `${Math.floor(i / 60)}:${i % 60 < 10 ? "0" : ""}${i % 60}`)
              dataMultiplier = 0.05
              break
            case "24h":
              labels = Array.from({ length: 24 }, (_, i) => `${i}:00`)
              dataMultiplier = 0.2
              break
            case "7d":
              labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
              dataMultiplier = 0.5
              break
            case "14d":
              labels = Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`)
              dataMultiplier = 0.7
              break
            case "30d":
              labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
              dataMultiplier = 0.8
              break
            case "90d":
              labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].slice(0, 3)
              dataMultiplier = 1
              break
            case "1y":
              labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
              dataMultiplier = 1.2
              break
            default:
              labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
          }

          // Generate datasets based on platforms
          let datasets = []

          const platformColors = {
            amazon: {
              border: "#3b82f6",
              background: "rgba(59, 130, 246, 0.2)",
            },
            aliexpress: {
              border: "#f59e0b",
              background: "rgba(245, 158, 11, 0.2)",
            },
            daraz: {
              border: "#10b981",
              background: "rgba(16, 185, 129, 0.2)",
            },
          }

          // Generate random data with some patterns
          const generateData = (base, variance, count) => {
            return Array.from({ length: count }, () => {
              return Math.floor((base + Math.random() * variance * 2 - variance) * dataMultiplier)
            })
          }

          // Simplified dataset creation for better performance and clarity
          datasets = [
            {
              label: "Amazon",
              data: generateData(2000, 300, labels.length),
              borderColor: platformColors.amazon.border,
              backgroundColor: platformColors.amazon.background,
              borderWidth: 2,
              fill: activeChartType === "line",
              tension: 0.4,
            },
            {
              label: "AliExpress",
              data: generateData(1500, 200, labels.length),
              borderColor: platformColors.aliexpress.border,
              backgroundColor: platformColors.aliexpress.background,
              borderWidth: 2,
              fill: activeChartType === "line",
              tension: 0.4,
            },
            {
              label: "Daraz",
              data: generateData(1000, 150, labels.length),
              borderColor: platformColors.daraz.border,
              backgroundColor: platformColors.daraz.background,
              borderWidth: 2,
              fill: activeChartType === "line",
              tension: 0.4,
            },
          ]

          // Create chart with explicit text color settings
          chartRef.current.chart = new Chart(ctx, {
            type: activeChartType,
            data: {
              labels: labels,
              datasets: datasets,
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: "index",
                intersect: false,
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
              scales: {
                x: {
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
                    maxRotation: 45,
                    minRotation: 45,
                    autoSkip: true,
                    maxTicksLimit: 20,
                  },
                  title: {
                    display: true,
                    text: "Time Period",
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
  }, [theme, activeChartType, timeRange, products, platforms])

  // Update chart type when passed from parent
  useEffect(() => {
    setActiveChartType(chartType)
  }, [chartType])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
