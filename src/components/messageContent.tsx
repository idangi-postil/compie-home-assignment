import { Card } from "@/components/ui/card";
import { parseUITags } from "@/lib/parseUITags";
import UITagRenderer from "./UITagRenderer";

interface MessageContentProps {
  message: {
    id: string;
    value: string;
    type: "text" | "image";
    sender: "user" | "bot";
    timestamp: Date;
  };
}

const MessageContent = ({ message }: MessageContentProps) => {
  const isUser = message.sender === "user";

  const cardClasses = `p-3 ${
    isUser
      ? "bg-blue-500 text-white border-blue-500"
      : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
  }`;

  // Handle legacy image type messages
  if (message.type === "image") {
    return (
      <Card className={cardClasses}>
        <div className="space-y-2">
          <img
            src={message.value || "/placeholder.svg"}
            alt="Shared image"
            className="max-w-full h-auto rounded-lg shadow-sm"
            style={{ maxHeight: "300px", objectFit: "contain" }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const fallback = document.createElement("div");
              fallback.className =
                "text-sm text-gray-500 p-2 border border-dashed border-gray-300 rounded";
              fallback.textContent = "Image failed to load";
              target.parentNode?.appendChild(fallback);
            }}
          />
        </div>
      </Card>
    );
  }

  // Parse UI tags for bot messages
  if (message.sender === "bot") {
    const { text, tags } = parseUITags(message.value);

    return (
      <Card className={cardClasses}>
        <div className="space-y-2">
          {/* Render text content */}
          {text && (
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {text}
            </div>
          )}

          {/* Render UI tags */}
          {tags.map((tag, index) => (
            <UITagRenderer key={index} tag={tag} />
          ))}
        </div>
      </Card>
    );
  }

  // Regular text message for users
  return (
    <Card className={cardClasses}>
      <p className="text-sm leading-relaxed whitespace-pre-wrap">
        {message.value}
      </p>
    </Card>
  );
};

export default MessageContent;
