import { useState, useCallback, useRef, useEffect } from "react";

interface ChatResponse {
  content?: string;
  done?: boolean;
  error?: string;
}

interface UseOpenAIChatResult {
  isLoading: boolean;
  error: string | null;
  sendMessage: (
    message: string,
    onChunk: (content: string) => void,
    onComplete: () => void
  ) => Promise<void>;
}

export function useOpenAIChat(
  serverUrl: string = "http://localhost:3001"
): UseOpenAIChatResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamBufferRef = useRef<string>("");
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const displayedContentRef = useRef<string>("");

  const startSmoothStreaming = useCallback(
    (
      buffer: string,
      onChunk: (content: string) => void,
      onComplete: () => void,
      isComplete: boolean = false
    ) => {
      // Clear any existing interval
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }

      const streamContent = () => {
        const currentLength = displayedContentRef.current.length;

        if (currentLength >= buffer.length) {
          if (isComplete && streamIntervalRef.current) {
            clearInterval(streamIntervalRef.current);
            streamIntervalRef.current = null;
            onComplete();
          }
          return;
        }

        // Stream character by character for ultra-smooth effect
        displayedContentRef.current = buffer.slice(0, currentLength + 1);
        onChunk(displayedContentRef.current);

        // If we've displayed all content and it's complete, finish
        if (displayedContentRef.current === buffer && isComplete) {
          if (streamIntervalRef.current) {
            clearInterval(streamIntervalRef.current);
            streamIntervalRef.current = null;
          }
          onComplete();
        }
      };

      // Start the smooth streaming interval - very fast for character-by-character
      streamIntervalRef.current = setInterval(streamContent, 30); // 30ms between characters
    },
    []
  );

  const sendMessage = useCallback(
    async (
      message: string,
      onChunk: (content: string) => void,
      onComplete: () => void
    ) => {
      setIsLoading(true);
      setError(null);

      // Reset refs for new message
      streamBufferRef.current = "";
      displayedContentRef.current = "";
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;
      }

      try {
        const response = await fetch(`${serverUrl}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let isStreamComplete = false;

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            isStreamComplete = true;
            break;
          }

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data: ChatResponse = JSON.parse(line.slice(6));

                if (data.error) {
                  setError(data.error);
                  return;
                }

                if (data.content) {
                  // Add new content to buffer
                  streamBufferRef.current += data.content;

                  // Start smooth streaming with updated buffer
                  startSmoothStreaming(
                    streamBufferRef.current,
                    onChunk,
                    onComplete,
                    false
                  );
                }

                if (data.done) {
                  isStreamComplete = true;
                  // Final smooth streaming call to complete
                  startSmoothStreaming(
                    streamBufferRef.current,
                    onChunk,
                    onComplete,
                    true
                  );
                  return;
                }
              } catch (e) {
                console.error("Error parsing SSE data:", e);
              }
            }
          }
        }

        // If stream ended without explicit done signal
        if (isStreamComplete) {
          startSmoothStreaming(
            streamBufferRef.current,
            onChunk,
            onComplete,
            true
          );
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        setError(errorMessage);
        console.error("Chat error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [serverUrl, startSmoothStreaming]
  );

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  return { sendMessage, isLoading, error };
}
