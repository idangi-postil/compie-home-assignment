# Home Assignment - Chat Application

A React chat application with OpenAI integration, featuring UI tags, image selection, and streaming responses.

## Quick Start

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```env
# OpenAI Configuration
VITE_OPEN_AI_KEY=your-openai-api-key-here
VITE_OPEN_AI_PROJECT_ID=your-openai-project-id-here
VITE_OPENAI_MODEL=gpt-4o-mini
VITE_SERVER_URL=http://localhost:3001

# Server Configuration
VITE_SERVER_PORT=3001
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### 3. Running the Application

#### Option A: With Real OpenAI API

1. **Start the OpenAI server:**

   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend** (in a new terminal):
   ```bash
   npm run dev
   ```

#### Option B: With Mock Server (No OpenAI API Key Required)

1. **Start the mock server:**

   ```bash
   cd server
   npm run dev:mock
   ```

2. **Start the frontend** (in a new terminal):
   ```bash
   npm run dev
   ```

### 4. Access the Application

- **Frontend**: http://localhost:5173 (or the port shown in terminal)
- **Server Health Check**: http://localhost:3001/health

## Features

- **Real-time Chat** - Streaming responses with typing indicators
- **Image Selection** - Select and send images from the gallery
- **UI Tags** - Automatic rendering of images, videos, links, and quizzes
- **Responsive Design** - Works on desktop and mobile

## Environment Variables

| Variable                  | Description                      | Required           | Default                 |
| ------------------------- | -------------------------------- | ------------------ | ----------------------- |
| `VITE_OPEN_AI_KEY`        | Your OpenAI API key              | Yes (for real API) | -                       |
| `VITE_OPEN_AI_PROJECT_ID` | Your OpenAI project ID           | Yes (for real API) | -                       |
| `VITE_OPENAI_MODEL`       | OpenAI model to use              | No                 | `gpt-4o-mini`           |
| `VITE_SERVER_PORT`        | Server port                      | No                 | `3001`                  |
| `VITE_SERVER_URL`         | Backend server URL for API calls | No                 | `http://localhost:3001` |

## Getting OpenAI API Keys

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env.local` file

## Mock Server vs Real Server

### Mock Server

- **Use when**: Testing the UI without OpenAI costs
- **Features**: Pre-defined responses with all UI tag types
- **Command**: `npm run dev:mock`
- **No API key required**

### Real Server

- **Use when**: Testing with actual OpenAI responses
- **Features**: Dynamic AI responses with UI tags
- **Command**: `npm run dev`
- **Requires OpenAI API key**

## Project Structure

```
├── src/
│   ├── components/        # React components
│   ├── routes/           # Page components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── contexts/         # React contexts
├── server/
│   ├── src/
│   │   ├── index.ts      # Real OpenAI server
│   │   └── mock-server.ts # Mock server
│   └── package.json
└── README.md
```

## Troubleshooting

### Server won't start

- Check if port 3001 is available
- Verify your `.env.local` file exists and has correct format

## Development Commands

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Server
cd server
npm run dev          # Start OpenAI server with hot reload
npm run dev:mock     # Start mock server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
```
