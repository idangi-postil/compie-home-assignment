import { Card } from "@/components/ui/card";

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
              // Fallback if image fails to load
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

  return (
    <Card className={cardClasses}>
      <p className="text-sm leading-relaxed">{message.value}</p>
    </Card>
  );
};
export default MessageContent;
