"use client"

import { useState, useRef, useEffect } from "react"
import { X, Maximize2, SendHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ChatbotPopup({ onClose, onEnlarge }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your e-commerce assistant. How can I help you analyze your business today?",
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
        response =
          "Based on your current sales data, the Smart Watch is your best performing product with $18,500 in revenue this month. Would you like to see a detailed analysis?"
      } else if (inputMessage.toLowerCase().includes("sentiment")) {
        response =
          "The overall sentiment for your products is positive (65%). However, there's a negative sentiment trend for your Premium Headphones on Amazon. Customers are mentioning issues with battery life and comfort during extended use."
      } else if (inputMessage.toLowerCase().includes("forecast") || inputMessage.toLowerCase().includes("predict")) {
        response =
          "Based on historical data and current trends, I predict your sales will increase by approximately 12% next month. Your Smart Watch and Premium Headphones are likely to see the highest growth."
      } else if (
        inputMessage.toLowerCase().includes("platform") ||
        inputMessage.toLowerCase().includes("marketplace")
      ) {
        response =
          "Amazon is currently your best-performing platform with 55% of total sales. AliExpress shows promising growth rate at 25% month-over-month."
      } else {
        response =
          "I understand you're asking about your e-commerce performance. Could you be more specific about what information you need? I can help with product performance, platform comparison, sentiment analysis, or sales forecasting."
      }

      const aiMessage = { id: Date.now() + 1, text: response, sender: "ai" }
      setMessages((prevMessages) => [...prevMessages, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card className="fixed bottom-16 right-4 w-80 md:w-96 h-[450px] z-50 shadow-lg flex flex-col">
      <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0">
        <h3 className="font-medium text-sm">AI Assistant</h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={onEnlarge} className="h-7 w-7">
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.text}
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
        <form onSubmit={handleSendMessage} className="p-3 border-t">
          <div className="flex gap-2">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 h-9"
              disabled={isLoading}
            />
            <Button type="submit" size="sm" disabled={isLoading || !inputMessage.trim()}>
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
