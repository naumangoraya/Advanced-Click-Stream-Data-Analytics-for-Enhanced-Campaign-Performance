"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SendHorizontal } from "lucide-react"

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your e-commerce analytics assistant. How can I help you today?",
      sender: "ai",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (inputMessage.trim() === "") return

    const userMessage = { id: Date.now(), text: inputMessage, sender: "user" }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response

      if (inputMessage.toLowerCase().includes("best performing product")) {
        response = {
          id: Date.now() + 1,
          text: "Based on your current sales data, the Smart Watch is your best performing product with $18,500 in revenue this month.",
          sender: "ai",
          chart: "product",
        }
      } else if (inputMessage.toLowerCase().includes("sentiment")) {
        response = {
          id: Date.now() + 1,
          text: "The overall sentiment for your products is positive (65%). However, there's a negative sentiment trend for your Premium Headphones on Amazon. Customers are mentioning issues with battery life and comfort during extended use.",
          sender: "ai",
          chart: "sentiment",
        }
      } else if (inputMessage.toLowerCase().includes("forecast") || inputMessage.toLowerCase().includes("predict")) {
        response = {
          id: Date.now() + 1,
          text: "Based on historical data and current trends, I predict your sales will increase by approximately 12% next month. Your Smart Watch and Premium Headphones are likely to see the highest growth.",
          sender: "ai",
          chart: "forecast",
        }
      } else if (
        inputMessage.toLowerCase().includes("platform") ||
        inputMessage.toLowerCase().includes("marketplace")
      ) {
        response = {
          id: Date.now() + 1,
          text: "Amazon is currently your best-performing platform with 55% of total sales. AliExpress shows promising growth rate at 25% month-over-month.",
          sender: "ai",
          chart: "platform",
        }
      } else if (inputMessage.toLowerCase().includes("report") || inputMessage.toLowerCase().includes("send")) {
        response = {
          id: Date.now() + 1,
          text: "I've generated a comprehensive performance report for you and sent it to your registered email address. The report includes sales analytics, sentiment analysis, and platform comparisons for the last 30 days.",
          sender: "ai",
          report: true,
        }
      } else {
        response = {
          id: Date.now() + 1,
          text: "I understand you're asking about your e-commerce performance. Could you be more specific about what information you need? I can help with product performance, platform comparison, sentiment analysis, or sales forecasting.",
          sender: "ai",
        }
      }

      setMessages((prevMessages) => [...prevMessages, response])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">Get insights and analytics through natural conversation</p>
      </div>

      <Card className="h-[calc(100vh-220px)] flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/avatar-ai.png" alt="AI Avatar" />
              <AvatarFallback className="bg-primary">AI</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>ClickAnalyst AI</CardTitle>
              <CardDescription>Your e-commerce analytics assistant</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 text-sm ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.text}
                  {message.chart && (
                    <div className="mt-2 p-2 bg-background rounded border">
                      <p className="text-xs text-muted-foreground mb-1">Chart visualization:</p>
                      <div className="h-32 bg-muted/50 rounded flex items-center justify-center">
                        {message.chart === "product" && <span>Product Performance Chart</span>}
                        {message.chart === "sentiment" && <span>Sentiment Analysis Chart</span>}
                        {message.chart === "forecast" && <span>Sales Forecast Chart</span>}
                        {message.chart === "platform" && <span>Platform Comparison Chart</span>}
                      </div>
                    </div>
                  )}
                  {message.report && (
                    <div className="mt-2 p-2 bg-background rounded border">
                      <p className="text-xs text-muted-foreground">Report sent to your email</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted text-sm">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
