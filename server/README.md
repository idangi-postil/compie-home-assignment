# OpenAI Chat Server with Server-Sent Events (SSE)

This Express server provides an OpenAI-powered chat endpoint that streams responses using Server-Sent Events (SSE).

## Features

- ✅ **OpenAI Integration** - Uses the official OpenAI SDK
- ✅ **Custom System Prompt** - Loads UI-Tag Chatbot system prompt from `systemprompt.txt`
- ✅ **UI Tags Support** - Responds with special square-bracket tags for images, videos, links, and quizzes
- ✅ **Server-Sent Events (SSE)** - Real-time streaming responses
- ✅ **TypeScript** - Fully typed with TypeScript
- ✅ **CORS Support** - Ready for frontend integration
- ✅ **Environment Variables** - Secure API key management
- ✅ **Error Handling** - Robust error handling and logging
- ✅ **Hot Reload** - Development server with automatic restarts
- ✅ **Mock Server** - Testing server with UI tags for development

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Variables

The server automatically reads from the parent directory's `.env.local` file:

```env
VITE_OPEN_AI_KEY=your-openai-api-key
VITE_OPEN_AI_PROJECT_ID=your-openai-project-id
VITE_OPENAI_MODEL=gpt-4
```

### 3. Run the Server

**Development mode (with hot reload):**

```bash
npm run dev
```

**Production build:**

```bash
npm run build
npm start
```

## UI Tags System

The server uses a custom system prompt that makes the AI respond with special UI tags that can be parsed by your React frontend:

### Supported Tags

- **`[image src="..." alt="..."]`** - Display images from public URLs
- **`[video src="..." title="..."]`** - Embed YouTube videos
- **`[link href="..." title="..."]`** - Create hyperlinks
- **`[quiz question="..." options="A|B|C" answer="B"]`** - Interactive quizzes

### Example Response

```
Here's how to create a React component:

[image src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" alt="React development"]

Start by defining your component function. You can learn more about React here:

[link href="https://react.dev/learn" title="React Official Documentation"]

[quiz question="What hook manages component state?" options="useState|useEffect|useContext" answer="useState"]
```

### Tag Behavior

- **Always included** - Every response contains at least one UI tag
- **Context-aware** - Tags match the content (images for visual topics, links for references, etc.)
- **Real URLs only** - All media URLs are from trusted public sources
- **Inline placement** - Tags can appear anywhere in the response text

## API Endpoints

### Health Check

```
GET /health
```

**Response:**

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Chat with OpenAI (SSE)

```
POST /api/chat
```

**Request Body:**

```json
{
  "message": "Hello, how are you?"
}
```

**Response:** Server-Sent Events stream

**SSE Data Format:**

```json
{
  "content": "Hello! I'm doing well...",
  "done": false
}
```

**Completion Signal:**

```json
{
  "content": "",
  "done": true
}
```

**Error Format:**

```json
{
  "error": "Error message",
  "done": true
}
```

## Usage Examples

### JavaScript/TypeScript Client

```javascript
async function chatWithAI(message) {
  try {
    const response = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));

            if (data.error) {
              console.error("Error:", data.error);
              return;
            }

            if (data.content) {
              // Handle streaming content
              console.log("Received:", data.content);
            }

            if (data.done) {
              console.log("Stream complete!");
              return;
            }
          } catch (e) {
            console.error("Error parsing SSE data:", e);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Usage
chatWithAI("Hello, how are you?");
```

### React Hook Example

```typescript
import { useState, useCallback } from "react";

export function useOpenAIChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (
      message: string,
      onChunk: (content: string) => void,
      onComplete: () => void
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:3001/api/chat", {
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

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));

                if (data.error) {
                  setError(data.error);
                  return;
                }

                if (data.content) {
                  onChunk(data.content);
                }

                if (data.done) {
                  onComplete();
                  return;
                }
              } catch (e) {
                console.error("Error parsing SSE data:", e);
              }
            }
          }
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { sendMessage, isLoading, error };
}
```

## Test Client

Open `test-client.html` in your browser to test the SSE endpoint with a simple web interface.

## Project Structure

```
server/
├── src/
│   └── index.ts          # Main server file
├── dist/                 # Compiled JavaScript (after build)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── nodemon.json          # Nodemon configuration
├── test-client.html      # Simple test client
└── README.md            # This file
```

## Environment Variables

| Variable                  | Description                   | Required |
| ------------------------- | ----------------------------- | -------- |
| `VITE_OPEN_AI_KEY`        | OpenAI API Key                | Yes      |
| `VITE_OPEN_AI_PROJECT_ID` | OpenAI Project ID             | Yes      |
| `VITE_OPENAI_MODEL`       | OpenAI Model (default: gpt-4) | No       |
| `PORT`                    | Server port (default: 3001)   | No       |

## Error Handling

The server includes comprehensive error handling:

- **Validation errors** - Returns 400 for missing/invalid input
- **OpenAI API errors** - Streams error messages via SSE
- **Network errors** - Proper HTTP status codes
- **Parsing errors** - Graceful handling of malformed data

## Features

### Automatic Language Detection

The server includes a system prompt that responds in Hebrew if the user writes in Hebrew, otherwise responds in English.

### Streaming Response

Responses are streamed in real-time using Server-Sent Events, providing a smooth user experience similar to ChatGPT.

### CORS Support

The server is configured to allow cross-origin requests from your frontend application.

## Development

- **Hot Reload**: The development server automatically restarts when you make changes
- **TypeScript**: Full type safety and IntelliSense support
- **Logging**: Comprehensive logging for debugging

## Production Deployment

1. Build the project: `npm run build`
2. Set environment variables on your server
3. Start the server: `npm start`
4. Configure reverse proxy (nginx/apache) if needed
