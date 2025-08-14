interface UITag {
  type: "image" | "video" | "link" | "quiz";
  attributes: Record<string, string>;
  position: number;
}

interface ParsedContent {
  text: string;
  tags: UITag[];
}

/**
 * Parse UI tags from AI response text
 * @param content The raw response content from the AI
 * @returns Parsed content with text and extracted tags
 */
export function parseUITags(content: string): ParsedContent {
  const tags: UITag[] = [];
  let cleanText = content;

  // Regex patterns for each tag type
  const patterns = {
    image: /\[image\s+src="([^"]+)"\s+alt="([^"]*)"\]/g,
    video: /\[video\s+src="([^"]+)"\s+title="([^"]*)"\]/g,
    link: /\[link\s+href="([^"]+)"\s+title="([^"]*)"\]/g,
    quiz: /\[quiz\s+question="([^"]+)"\s+options="([^"]+)"\s+answer="([^"]+)"\]/g,
  };

  // Extract each tag type
  Object.entries(patterns).forEach(([tagType, pattern]) => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const position = match.index;

      let attributes: Record<string, string> = {};

      switch (tagType) {
        case "image":
          attributes = { src: match[1], alt: match[2] };
          break;
        case "video":
          attributes = { src: match[1], title: match[2] };
          break;
        case "link":
          attributes = { href: match[1], title: match[2] };
          break;
        case "quiz":
          attributes = {
            question: match[1],
            options: match[2],
            answer: match[3],
          };
          break;
      }

      tags.push({
        type: tagType as UITag["type"],
        attributes,
        position,
      });

      // Remove the tag from the text
      cleanText = cleanText.replace(match[0], "");
    }
  });

  // Sort tags by position
  tags.sort((a, b) => a.position - b.position);

  return {
    text: cleanText.trim(),
    tags,
  };
}

export type { UITag, ParsedContent };
