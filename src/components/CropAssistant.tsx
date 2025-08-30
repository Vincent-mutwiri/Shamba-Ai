import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Image, Mic, Paperclip, Loader2, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { FormattedMessage } from "./FormattedMessage";
import { createStructuredPrompt } from "@/lib/chatFormat";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  thinking?: boolean;
}

export const CropAssistant = () => {
  // Initialize Inflection AI
  const INFLECTION_API_KEY = import.meta.env.VITE_INFLECTION_API_KEY;
  const INFLECTION_API_URL = 'https://api.inflection.ai/external/api/inference';
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `**Habari! Welcome to AgriSenti Assistant** 🌱

I'm here to help you with farming across Kenya. I can assist with:

• **Crop Management** - Planting schedules and care tips for all 47 counties
• **Fertilizer Recommendations** - Best products for your soil type and region
• **Pest & Disease Control** - Identification and treatment across Kenya
• **Weather Insights** - Current conditions and forecasts for your county
• **Market Information** - Prices and selling opportunities nationwide

**Ask me anything about farming!** What county are you farming in?`,
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    if (!INFLECTION_API_KEY) {
      toast({
        title: "API Configuration Error",
        description: "Inflection API key is not configured. Please check your environment variables.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Add immediate "thinking" indicator message
    const thinkingMessage: Message = {
      id: `thinking-${Date.now().toString()}`,
      text: "Thinking...",
      sender: "bot",
      timestamp: new Date(),
      thinking: true
    };
    
    setMessages(prev => [...prev, thinkingMessage]);

    try {
      // Get static response
      const response = generateStaticResponse(inputValue);
      
      // Remove the thinking message and add the actual response
      setMessages(prev => prev.filter(m => !m.thinking));
      
      const botMessage: Message = {
        id: (Date.now() + 100).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      // Remove thinking message and show error
      setMessages(prev => prev.filter(m => !m.thinking));
      
      let errorMessage = "Sorry, I'm having trouble generating a response. Please try again later.";
      
      if (error instanceof Error) {
        if (error.message.includes("API_KEY")) {
          errorMessage = "Invalid API key. Please check your Inflection API configuration.";
        } else if (error.message.includes("quota")) {
          errorMessage = "API quota exceeded. Please try again later.";
        } else if (error.message.includes("network")) {
          errorMessage = "Network error. Please check your internet connection.";
        }
      }
      
      const errorMsg: Message = {
        id: (Date.now() + 100).toString(),
        text: errorMessage,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMsg]);
      
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateStaticResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    if (q.includes('fertilizer') || q.includes('manure')) {
      return `**Fertilizer Recommendations for Kenya:**\n\n**For Maize:**\n• NPK 17:17:17 during planting\n• CAN (Calcium Ammonium Nitrate) for top dressing\n• DAP (Diammonium Phosphate) for phosphorus\n\n**For Vegetables:**\n• NPK 20:20:20 for balanced nutrition\n• Organic compost for soil health\n• Foliar feeds for quick nutrient uptake\n\n**Application Tips:**\n• Apply fertilizer 2-3 weeks after planting\n• Water immediately after application\n• Follow soil test recommendations\n\n**Organic Options:**\n• Well-decomposed farmyard manure\n• Compost from kitchen waste\n• Green manure from legumes`;
    }
    
    if (q.includes('pest') || q.includes('disease') || q.includes('armyworm')) {
      return `**Pest & Disease Management:**\n\n**Common Pests:**\n• Fall Armyworm - Use Bt sprays or neem oil\n• Aphids - Spray with soapy water\n• Cutworms - Use collar barriers around plants\n\n**Disease Control:**\n• Fungal diseases - Apply copper-based fungicides\n• Bacterial wilt - Use resistant varieties\n• Viral diseases - Control vector insects\n\n**Prevention:**\n• Crop rotation every season\n• Remove infected plant debris\n• Use certified disease-free seeds\n• Maintain proper plant spacing`;
    }
    
    if (q.includes('weather') || q.includes('rain') || q.includes('season')) {
      return `**Weather & Seasonal Advice:**\n\n**Planting Seasons:**\n• Long rains: March-May\n• Short rains: October-December\n• Irrigation farming: Year-round\n\n**Weather Monitoring:**\n• Check 7-day forecasts before planting\n• Prepare drainage for heavy rains\n• Have irrigation backup for dry spells\n\n**Climate Adaptation:**\n• Use drought-resistant varieties\n• Practice water conservation\n• Adjust planting dates based on rainfall`;
    }
    
    if (q.includes('market') || q.includes('price') || q.includes('sell')) {
      return `**Market Information:**\n\n**Best Markets:**\n• Nairobi: Wakulima, Marikiti\n• Mombasa: Kongowea Market\n• Kisumu: Jubilee Market\n• County markets for local sales\n\n**Price Factors:**\n• Quality and grading standards\n• Seasonal supply and demand\n• Transportation costs\n• Storage and post-harvest handling\n\n**Marketing Tips:**\n• Form farmer groups for bulk sales\n• Direct sales to schools/institutions\n• Value addition through processing`;
    }
    
    return `**General Farming Advice:**\n\n**Crop Selection:**\n• Choose varieties suited to your climate zone\n• Consider market demand in your area\n• Use certified seeds from reputable dealers\n\n**Soil Management:**\n• Test soil pH and nutrients annually\n• Add organic matter regularly\n• Practice conservation agriculture\n\n**Water Management:**\n• Install drip irrigation for efficiency\n• Harvest rainwater during wet seasons\n• Mulch to reduce water loss\n\n**Record Keeping:**\n• Track planting dates and varieties\n• Monitor input costs and yields\n• Keep market price records\n\nWhat specific aspect of farming would you like to know more about?`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What fertilizers work best for maize in Kenya?",
    "How do I control fall armyworm in my crops?", 
    "When is the best time to plant tea in Kericho?",
    "Current weather forecast for farming"
  ];
  
  return (
    <div className="h-full flex flex-col min-h-[calc(100vh-8rem)]">
      <Card className="flex-1 flex flex-col overflow-hidden border shadow-md">
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 overflow-y-auto p-2 sm:p-4">
            <div className="flex flex-col space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex items-start gap-1.5 sm:gap-2 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="bg-green-600 p-1 sm:p-1.5 md:p-2 rounded-full flex-shrink-0">
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[90%] sm:max-w-[85%] md:max-w-[80%] p-2 sm:p-3 rounded-lg break-words ${
                      message.sender === "user"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    ) : (
                      <FormattedMessage 
                        content={message.text} 
                        className="text-xs sm:text-sm leading-relaxed text-gray-900"
                      />
                    )}
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  
                  {message.sender === "user" && (
                    <div className="bg-gray-600 p-1 sm:p-1.5 md:p-2 rounded-full flex-shrink-0">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <div className="bg-green-600 p-1 sm:p-1.5 md:p-2 rounded-full flex-shrink-0">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce animate-delay-100"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce animate-delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-2 sm:p-3 md:p-4 border-t bg-gray-50 flex-shrink-0">
            <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue(question)}
                  className="text-xs px-2 py-1 sm:px-3 sm:py-2 h-auto whitespace-nowrap flex-shrink-0"
                >
                  {isMobile && question.length > 15 ? question.substring(0, 15) + "..." : question}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isMobile ? "Ask about farming..." : "Ask about crops, weather, fertilizers..."}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="text-sm flex-1 min-w-0"
                ref={inputRef}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !inputValue.trim()}
                className="bg-green-600 hover:bg-green-700 flex-shrink-0 px-2 sm:px-3 md:px-4"
                size="sm"
              >
                {isLoading ? (
                  <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                ) : false ? (
                  <span className="text-xs">API Error</span>
                ) : (
                  <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
