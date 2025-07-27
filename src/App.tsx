import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "שלום! אני כאן לעזור לך. איך אוכל לסייע?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = () => {
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "זה נשמע מעניין! ספר לי עוד על זה.",
        "אני מבין. איך אוכל לעזור לך עם זה?",
        "תודה על השיתוף! יש לי כמה רעיונות.",
        "זה שאלה מעולה. בואו נחשוב על זה יחד.",
        "אני כאן לעזור! מה עוד תרצה לדעת?",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const botMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    simulateBotResponse();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b p-4">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-blue-500 text-white">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-lg">צ'אט חכם</h1>
            <p className="text-sm text-muted-foreground">מקוון עכשיו</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } animate-in slide-in-from-bottom-2 duration-300`}
          >
            {message.sender === "bot" && (
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-gray-500 text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={`max-w-[80%] sm:max-w-[70%] ${
                message.sender === "user" ? "order-1" : ""
              }`}
            >
              <Card
                className={`p-3 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </Card>
              <p
                className={`text-xs text-muted-foreground mt-1 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>

            {message.sender === "user" && (
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-blue-500 text-white">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 justify-start animate-in slide-in-from-bottom-2 duration-300">
            <Avatar className="h-8 w-8 mt-1">
              <AvatarFallback className="bg-gray-500 text-white">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <Card className="p-3 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 border-t p-4">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="הקלד הודעה..."
            className="flex-1 rounded-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            dir="rtl"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="rounded-full h-10 w-10 p-0 bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
