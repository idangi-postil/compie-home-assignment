import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
interface SearchInputProps {
  handleSendMessage: (value: string) => void;
  isTyping: boolean;
}
const SearchInput = ({ handleSendMessage, isTyping }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const sendMessage = () => {
    handleSendMessage(inputValue);
    setInputValue("");
  };
  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-t border-white/20 p-4">
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
          onClick={() => handleSendMessage(inputValue)}
          disabled={!inputValue.trim() || isTyping}
          className="rounded-full h-10 w-10 p-0 bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
