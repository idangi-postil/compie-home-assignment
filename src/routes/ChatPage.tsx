import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import SearchInput from "../components/searchInput";
import MessageContent from "../components/messageContent";
import { useOpenAIChat } from "../hooks/useOpenAIChat";
import formatTime from "../lib/formatTime";

interface Message {
  id: string;
  value: string;
  type: "text" | "image";
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatPage() {
  const { sendMessage, isLoading, error } = useOpenAIChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentBotMessage, setCurrentBotMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentBotMessage]);

  const handleSendMessage = async (value: string) => {
    if (!value.trim() || isLoading) return;

    const userMessage: Message = {
      type: "text",
      id: Date.now().toString(),
      value,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setCurrentBotMessage("");

    await sendMessage(
      value,
      (content: string) => {
        setCurrentBotMessage(content);
      },
      () => {
        setCurrentBotMessage((prev) => {
          if (prev.trim()) {
            const botMessage: Message = {
              id: (Date.now() + 1).toString(),
              value: prev.trim(),
              sender: "bot",
              timestamp: new Date(),
              type: "text",
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
          }
          return "";
        });
        setIsTyping(false);
      }
    );

    // If there was an error, stop typing
    if (error) {
      setIsTyping(false);
      setCurrentBotMessage("");
    }
  };

  return (
    <>
      {/* Error display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 mt-2 rounded">
          <p>
            <strong>שגיאה:</strong> {error}
          </p>
        </div>
      )}

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

        {/* Show typing indicator with streaming content */}
        {(isTyping || currentBotMessage) && (
          <div className="flex gap-3 justify-start animate-in slide-in-from-bottom-2 duration-300">
            <Avatar className="h-8 w-8 mt-1">
              <AvatarFallback className="bg-gray-500 text-white">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <Card className="p-3 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 max-w-[80%] sm:max-w-[70%]">
              {currentBotMessage ? (
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {currentBotMessage}
                  <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-pulse" />
                </div>
              ) : (
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
              )}
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <SearchInput
        handleSendMessage={handleSendMessage}
        isTyping={isLoading || isTyping}
      />
    </>
  );
}
