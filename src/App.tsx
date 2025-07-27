import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import Loader from "@/components/loader";
import useChatSocket from "./api/useWebSocket";
import Header from "./components/header";
import SearchInput from "./components/searchInput";
import MessageContent from "./components/messageContent";

interface Message {
  id: string;
  value: string;
  type: "text" | "image";
  sender: "user" | "bot";
  timestamp: Date;
}
const randomWords = [
  "שלום",
  "מה נשמע?",
  "איך אתה מרגיש?",
  "מה חדש?",
  "מה קורה?",
  "מה שלומך?",
  "מה העניינים?",
  "איך הולך?",
  "מה המצב?",
  "מה נשמע איתך?",
];
export default function ChatApp() {
  const { isConnected, sendMessage, error, message } = useChatSocket();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (value: string) => {
    if (!value.trim()) return;

    const userMessage: Message = {
      type: "text",
      id: Date.now().toString(),
      value,
      sender: "user",
      timestamp: new Date(),
    };
    sendMessage(randomWords[Math.floor(Math.random() * randomWords.length)]);
    setIsTyping(true);

    setMessages((prev) => [...prev, userMessage]);
  };
  useEffect(() => {
    if (message) {
      const botMessage: Message = {
        id: Date.now().toString(),
        value: message.message,
        sender: "bot",
        timestamp: new Date(),
        type: message.type,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }
  }, [message]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  if (!isConnected || (!isConnected && !error)) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-teal-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800">
      <Header />

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
              <MessageContent message={message} />
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
      <SearchInput handleSendMessage={handleSendMessage} isTyping={isTyping} />
    </div>
  );
}
