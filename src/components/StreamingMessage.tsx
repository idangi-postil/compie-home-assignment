import React from "react";
import { parseUITags } from "@/lib/parseUITags";
import UITagRenderer from "./UITagRenderer";

interface StreamingMessageProps {
  content: string;
}

const StreamingMessage: React.FC<StreamingMessageProps> = ({ content }) => {
  const { text, tags } = parseUITags(content);

  const hasCompleteTags = tags.length > 0;

  const partialTagRegex = /\[(?:image|video|link|quiz)(?:\s+[^[\]]*)?$/;
  const hasPartialTag = partialTagRegex.test(content);

  if (hasCompleteTags) {
    let remainingText = text;

    const showTypingIndicator =
      hasPartialTag || (content.trim() && !content.trim().endsWith("]"));

    return (
      <div className="space-y-2">
        {remainingText.trim() && (
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {remainingText}
            {showTypingIndicator && (
              <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-pulse" />
            )}
          </div>
        )}

        {tags.map((tag, index) => (
          <UITagRenderer key={index} tag={tag} />
        ))}
      </div>
    );
  }

  const showTypingIndicator = !hasPartialTag;

  return (
    <div className="text-sm leading-relaxed whitespace-pre-wrap">
      {content}
      {showTypingIndicator && (
        <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-pulse" />
      )}
    </div>
  );
};

export default StreamingMessage;
