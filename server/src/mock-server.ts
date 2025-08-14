import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Load environment variables from the parent directory's .env.local file
dotenv.config({ path: path.join(__dirname, "../../.env.local") });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Read system prompt from file
const getSystemPrompt = (): string => {
  try {
    const systemPromptPath = path.join(__dirname, "systemprompt.txt");
    return fs.readFileSync(systemPromptPath, "utf-8");
  } catch (error) {
    console.error("Failed to read system prompt file:", error);
    // Fallback to default prompt
    return "You are a helpful assistant that includes UI tags in responses.";
  }
};

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Mock server is running" });
});

// Mock OpenAI Chat endpoint with SSE
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Set headers for Server-Sent Events
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Cache-Control");

    const responses = [
      "Hello! ",
      'I understand you wrote: "' + message + '". ',
      "That's a very interesting topic. ",
      '[image src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3" alt="Creative thinking and innovation"] ',
      "Let me also share a relevant video with you: ",
      '[video src="https://www.youtube.com/watch?v=dXf204AjPqk" title="Landscape Photography Tips (Adorama)"] ',
      "I think the answer is... ",
      "In this case, I would recommend ",
      "trying an innovative approach. ",
      '[link href="https://developer.mozilla.org/en-US/docs/Web/API" title="Web APIs - MDN"] ',
      "What do you think about this? ",
      '[quiz question="What helps develop creative thinking?" options="Daily practice|Ignoring problems|Avoiding learning" answer="Daily practice"]',
    ];

    for (let i = 0; i < responses.length; i++) {
      const chunk = responses[i];

      // Send the chunk as SSE data
      res.write(`data: ${JSON.stringify({ content: chunk, done: false })}\n\n`);

      await new Promise((resolve) =>
        setTimeout(resolve, 300 + Math.random() * 200)
      );
    }

    res.write(`data: ${JSON.stringify({ content: "", done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Mock API Error:", error);

    res.write(
      `data: ${JSON.stringify({
        error: "Failed to generate response",
        done: true,
      })}\n\n`
    );
    res.end();
  }
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

app.listen(PORT, () => {
  console.log(`Mock Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Mock AI responses enabled (Hebrew/English detection)`);
  console.log(
    `📝 System prompt loaded: ${getSystemPrompt().length} characters`
  );
});

export default app;
