import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import fs from "fs";

dotenv.config({ path: path.join(__dirname, "../../.env.local") });

const app = express();
const PORT = process.env.VITE_SERVER_PORT || 3001;

const openai = new OpenAI({
  apiKey: process.env.VITE_OPEN_AI_KEY,
  project: process.env.VITE_OPEN_AI_PROJECT_ID,
});

app.use(cors());
app.use(express.json());

// Read system prompt from file
const getSystemPrompt = (): string => {
  try {
    const systemPromptPath = path.join(__dirname, "systemprompt.txt");
    return fs.readFileSync(systemPromptPath, "utf-8");
  } catch (error) {
    console.error("Failed to read system prompt file:", error);
    return "You are a helpful assistant. Respond in Hebrew if the user writes in Hebrew, otherwise respond in English.";
  }
};

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Cache-Control");

    const model = process.env.VITE_OPENAI_MODEL || "gpt-4o-mini";

    const stream = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: getSystemPrompt(),
        },
        {
          role: "user",
          content: message,
        },
      ],
      stream: true,
      max_tokens: 500,
      temperature: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Stream the response
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";

      if (content) {
        res.write(`data: ${JSON.stringify({ content, done: false })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ content: "", done: true })}\n\n`);
    res.end();
  } catch (error: any) {
    console.error("OpenAI API Error:", error);

    let errorMessage = "Failed to generate response";

    if (error?.status === 429) {
      errorMessage = "Rate limit exceeded. Please wait a moment and try again.";
    } else if (error?.status === 401) {
      errorMessage = "Invalid API key. Please check your OpenAI configuration.";
    } else if (error?.status === 403) {
      errorMessage =
        "Access forbidden. Please check your OpenAI account permissions.";
    } else if (error?.status === 404) {
      errorMessage =
        "Model not found. The requested model may not be available.";
    } else if (error?.status === 500) {
      errorMessage = "OpenAI server error. Please try again later.";
    } else if (error?.code === "insufficient_quota") {
      errorMessage =
        "Quota exceeded. Please check your OpenAI account billing.";
    } else if (error?.message) {
      errorMessage = error.message;
    }

    res.write(
      `data: ${JSON.stringify({
        error: errorMessage,
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

// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(`OpenAI Model: ${process.env.VITE_OPENAI_MODEL || "gpt-4"}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(
    `📝 System prompt loaded: ${getSystemPrompt().length} characters`
  );
});

export default app;
