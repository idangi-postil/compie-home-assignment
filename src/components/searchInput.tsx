import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
interface SearchInputProps {
  handleSendMessage: (value: string) => void;
  isTyping: boolean;
}
const SearchInput = ({ handleSendMessage, isTyping }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [inputValue]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const sendMessage = () => {
    if (!inputValue.trim()) return;
    handleSendMessage(inputValue);
    setInputValue("");
  };
  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-t border-white/20 p-4">
      <div className="flex gap-2 max-w-4xl mx-auto">
        <Textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="הקלד הודעה..."
          className="flex-1 rounded-2xl border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 px-4 py-3 text-base shadow-sm transition-[color,box-shadow] outline-none resize-none min-h-[2.75rem] max-h-32 overflow-y-auto bg-white dark:bg-gray-800"
          dir="rtl"
          rows={1}
        />
        <Button
          onClick={sendMessage}
          disabled={!inputValue.trim() || isTyping}
          className="rounded-full h-11 w-11 p-0 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 self-end"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
