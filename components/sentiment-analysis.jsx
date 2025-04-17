"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function SentimentAnalysis({ timeRange = "30d", products = ["all"], platforms = ["all"] }) {
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
          // Force white text in dark mode
          const textColor = isDarkMode ? "#FFFFFF" : "#000000"

          // Simplified sentiment data
          const positivePercentage = 65
          const neutralPercentage = 25
          const negativePercentage = 10

          // Create a simplified bar chart instead of pie chart
          const ctx = chartRef.current.getContext("2d")
          chartRef.current.chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: ["Positive", "Neutral", "Negative"],
              datasets: [
                {
                  data: [positivePercentage, neutralPercentage, negativePercentage],
                  backgroundColor: [
                    "rgba(16, 185, 129, 0.8)", // Positive - green
                    "rgba(245, 158, 11, 0.8)", // Neutral - amber
                    "rgba(239, 68, 68, 0.8)", // Negative - red
                  ],
                  borderColor: ["rgba(16, 185, 129, 1)", "rgba(245, 158, 11, 1)", "rgba(239, 68, 68, 1)"],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: "y", // Horizontal bar chart for better readability
              plugins: {
                legend: {
                  display: false, // Hide legend for simplicity
                },
                tooltip: {
                  enabled: true,
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
                      const value = context.raw || 0
                      return `${value}%`
                    },
                  },
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    color: textColor,
                    font: {
                      weight: 800,
                      size: 12,
                    },
                    callback: (value) => `${value}%`,
                  },
                  title: {
                    display: true,
                    text: "Percentage",
                    color: textColor,
                    font: {
                      weight: 800,
                      size: 14,
                    },
                  },
                },
                y: {
                  ticks: {
                    color: textColor,
                    font: {
                      weight: 800,
                      size: 12,
                    },
                  },
                  title: {
                    display: true,
                    text: "Sentiment",
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
    let insight = "Your products are generally receiving positive feedback across platforms."

    if (timeRange === "24h") {
      insight =
        "In the last 24 hours, your products have received 65% positive feedback, with Premium Headphones showing the strongest customer satisfaction."
    } else if (timeRange === "7d") {
      insight =
        "Over the past week, customer sentiment has been predominantly positive (65%), with some concerns about shipping times on AliExpress."
    } else if (timeRange === "30d") {
      insight =
        "Monthly sentiment analysis shows consistent positive feedback (65%), with Smart Watches receiving the highest customer satisfaction ratings."
    }

    return insight
  }

  return (
    <div className="space-y-4">
      <div className="h-[300px] w-full">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="mt-4 space-y-3">
        <h4 className="font-medium">Sentiment Analysis Insights</h4>
        <p className="text-sm text-muted-foreground">{getInsights()}</p>
      </div>
    </div>
  )
}
