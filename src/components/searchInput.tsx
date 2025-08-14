import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Send, X } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useImageContext } from "../contexts/ImageContext";
interface SearchInputProps {
  handleSendMessage: (value: string) => void;
  isTyping: boolean;
}
const SearchInput = ({ handleSendMessage, isTyping }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { selectedImages, clearSelectedImages, removeImage } =
    useImageContext();

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
    if (!inputValue.trim() && selectedImages.length === 0) return;

    // Create message content with text and images
    let messageContent = inputValue.trim();
    if (selectedImages.length > 0) {
      const imageUrls = selectedImages.map(
        (img) => `https://picsum.photos/400/400?random=${img.id}`
      );
      messageContent +=
        (messageContent ? "\n\n" : "") +
        "Selected images:\n" +
        imageUrls.join("\n");
    }

    handleSendMessage(messageContent);
    setInputValue("");
    clearSelectedImages();
  };
  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-t border-white/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Display selected images */}
        {selectedImages.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Selected Images ({selectedImages.length})
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={clearSelectedImages}
                className="text-xs h-6 px-2"
              >
                Clear All
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap max-h-24 overflow-y-auto">
              {selectedImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={`https://picsum.photos/60/60?random=${image.id}`}
                    alt={`Photo by ${image.author}`}
                    className="w-12 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                  />
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <X className="w-2 h-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask anything"
            className="flex-1 rounded-2xl border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 px-4 py-3 text-base shadow-sm transition-[color,box-shadow] outline-none resize-none min-h-[2.75rem] max-h-32 overflow-y-auto bg-white dark:bg-gray-800"
            dir="rtl"
            rows={1}
          />
          <Button
            onClick={sendMessage}
            disabled={
              (!inputValue.trim() && selectedImages.length === 0) || isTyping
            }
            className="rounded-full h-11 w-11 p-0 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
