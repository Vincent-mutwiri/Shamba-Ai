import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GoogleGenerativeAI } from "@google/generative-ai";
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
  // Initialize AI API
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `**Habari! Welcome to Shamba AI Assistant** 🌱

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

    if (!GEMINI_API_KEY) {
      toast({
        title: "API Key Missing",
        description: "Gemini API key is not configured. Please check your environment variables.",
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
      const prompt = createStructuredPrompt(inputValue, 'crop-assistant');
      let text = '';

      // Try Gemini API
      try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1000
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        } else {
          throw new Error(`Gemini API request failed with status: ${response.status}`);
        }
      } catch (apiError) {
        console.warn('Gemini API failed, falling back to static response:', apiError);
        text = generateStaticResponse(inputValue);
      }

      if (!text) {
        // If text is still empty, use the static response as a final fallback
        text = generateStaticResponse(inputValue);
      }

      // Replace the thinking message with the actual response
      setMessages(prev => prev.filter(m => !m.thinking));
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: text,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);

      // Ensure thinking message is removed and add a fallback message on error
      setMessages(prev => prev.filter(m => !m.thinking));
      
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: generateStaticResponse(inputValue),
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateGeminiResponse = async (question: string): Promise<string> => {
    if (!genAI) {
      throw new Error("Gemini API not initialized");
    }

    try {
      // Get the generative model (using stable version)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Create a structured prompt using the utility function
      const prompt = createStructuredPrompt(question, isMobile);
      
      console.log("Sending prompt to Gemini:", prompt); // For debugging
      
      // Generate content using Gemini API
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log("Gemini response:", text); // For debugging
      
      if (!text || text.trim().length === 0) {
        throw new Error("Empty response from Gemini API");
      }
      
      return text;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      
      if (error instanceof Error) {
        if (error.message.includes("API_KEY")) {
          throw new Error("Invalid Gemini API key");
        } else if (error.message.includes("quota")) {
          throw new Error("API quota exceeded");
        } else if (error.message.includes("network")) {
          throw new Error("Network error occurred");
        }
      }
      
      throw new Error("Failed to generate response from Gemini API");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What fertilizers for maize?",
    "How to control fall armyworm?",
    "Tell me about sisal farming",
    "Best time to plant in Kericho?",
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
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  {message.sender === "user" && (
                    <div className="bg-gray-600 p-1 sm:p-1.5 md:p-2 rounded-full flex-shrink-0">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && messages.some(m => m.thinking) && (
                <div className="flex items-start gap-1.5 sm:gap-2">
                  <div className="bg-green-600 p-1 sm:p-1.5 md:p-2 rounded-full flex-shrink-0">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
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
                  onClick={() => {
                    setInputValue(question);
                    inputRef.current?.focus();
                  }}
                  className="text-xs px-2 py-1 sm:px-3 sm:py-2 h-auto whitespace-nowrap flex-shrink-0"
                >
                  {isMobile && question.length > 25 ? question.substring(0, 25) + "..." : question}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isMobile ? "Ask about farming..." : "Ask about crops, weather, fertilizers..."}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="text-sm flex-1 min-w-0"
              />
              <Button  
                onClick={handleSendMessage}  
                disabled={isLoading || !inputValue.trim()}
                className="bg-green-600 hover:bg-green-700 flex-shrink-0 px-2 sm:px-3 md:px-4"
                size="sm"
              >
                {isLoading ? (
                  <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
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