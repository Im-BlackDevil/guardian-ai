import React, { useState } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

const RealTimeBiasBot = () => {
  const [inputText, setInputText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleSendMessage = () => {
    if (!inputText.trim()) return
    setIsAnalyzing(true)
    // fake analysis delay
    setTimeout(() => {
      setIsAnalyzing(false)
      setInputText("")
    }, 1200)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <h3 className="text-2xl font-semibold text-white/80">
              Real-Time Bias Bot
            </h3>
          </CardHeader>

          <CardContent>
            {/* Chat messages would go here */}

            {/* 🔹 Input bar with better separation */}
            <div className="border-t border-border bg-muted/30 p-3 sm:p-4 lg:p-5 flex-shrink-0 rounded-b-lg shadow-inner mt-4">
              <div className="flex space-x-2 mb-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message to test bias detection..."
                  className="flex-1 text-xs sm:text-sm lg:text-base rounded-md shadow-sm"
                  disabled={isAnalyzing}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isAnalyzing}
                  size="sm"
                  className="px-2 sm:px-3 lg:px-4"
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground/80 mt-2 leading-relaxed">
                Try phrases like <em>"Everyone agrees with this"</em> or{" "}
                <em>"This guy is from IIT, he'll be better"</em>, or click{" "}
                <strong>Demo Chat</strong> for a random bias example.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default RealTimeBiasBot
