import React from "react";
import type { UITag } from "@/lib/parseUITags";
import { Button } from "./ui/button";

interface UITagRendererProps {
  tag: UITag;
}

export const UITagRenderer: React.FC<UITagRendererProps> = ({ tag }) => {
  switch (tag.type) {
    case "image":
      return (
        <div className="my-3">
          <img
            src={tag.attributes.src}
            alt={tag.attributes.alt}
            className="max-w-full h-auto rounded-lg shadow-sm max-h-64 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        </div>
      );

    case "video":
      const videoId = tag.attributes.src.includes("youtube.com")
        ? tag.attributes.src.split("v=")[1]?.split("&")[0]
        : null;

      return (
        <div className="my-3">
          {videoId ? (
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={tag.attributes.title}
              frameBorder="0"
              allowFullScreen
              className="rounded-lg shadow-sm"
            />
          ) : (
            <a
              href={tag.attributes.src}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              🎥 {tag.attributes.title}
            </a>
          )}
        </div>
      );

    case "link":
      return (
        <div className="my-2">
          <a
            href={tag.attributes.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-500 underline hover:text-blue-700 text-sm"
          >
            🔗 {tag.attributes.title}
          </a>
        </div>
      );

    case "quiz":
      const options = tag.attributes.options.split("|");

      return (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg my-3 border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold mb-3 text-blue-900 dark:text-blue-100">
            🧠 {tag.attributes.question}
          </h4>
          <div className="space-y-2">
            {options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="block w-full text-left justify-start p-3 h-auto"
                onClick={() => {
                  if (option === tag.attributes.answer) {
                    alert("נכון! ✅");
                  } else {
                    alert(
                      `לא נכון. התשובה הנכונה היא: ${tag.attributes.answer}`
                    );
                  }
                }}
              >
                <span className="font-semibold mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default UITagRenderer;
