# Smart Chat Application (צ'אט חכם)

A modern, real-time chat application built with React, TypeScript, and WebSocket connectivity. The application features a sleek Hebrew-friendly interface with real-time messaging capabilities.

## 🚀 Features

- **Real-time messaging** - WebSocket-based communication for instant messaging
- **Modern UI** - Beautiful gradient backgrounds with glass-morphism effects
- **Hebrew support** - RTL (Right-to-Left) text support with Hebrew interface
- **Responsive design** - Works seamlessly on desktop and mobile devices
- **Typing indicators** - Visual feedback when the bot is responding
- **Message timestamps** - Formatted timestamps for each message
- **Connection status** - Real-time connection status indicators
- **Loading states** - Elegant loading animations and states

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: TailwindCSS 4.1.11 with custom animations
- **UI Components**: Radix UI components for accessibility
- **WebSocket**: Native WebSocket API for real-time communication
- **Icons**: Lucide React icons
- **Development**: ESLint for code quality and Hot Module Replacement (HMR)

## 📦 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components (Avatar, Button, Card, Input)
│   └── loader.tsx          # Loading component
├── api/
│   ├── useWebSocket.ts     # WebSocket hook
│   └── websocket.ts        # WebSocket types and interfaces
├── lib/
│   └── utils.ts           # Utility functions
├── hooks/                 # Custom React hooks
├── assets/               # Static assets
├── App.tsx              # Main chat application component
├── main.tsx            # Application entry point
└── index.css          # Global styles and TailwindCSS configuration
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd homeAssignment-compie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Running the Application

#### Development Mode

To start the application in development mode with hot reload:

```bash
npm run dev
```

or

```bash
yarn dev
```

The application will start on `http://localhost:5173` (or another available port).

#### Build for Production

To build the application for production:

```bash
npm run build
```

or

```bash
yarn build
```

#### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

or

```bash
yarn preview
```

#### Linting

To run ESLint for code quality checks:

```bash
npm run lint
```

or

```bash
yarn lint
```

## 🔧 Configuration

### WebSocket Configuration

The application connects to a WebSocket server at `wss://ws.postman-echo.com/raw`. To modify the WebSocket endpoint, edit the connection URL in `src/api/useWebSocket.ts`:

```typescript
const socket = new WebSocket("your-websocket-endpoint");
```

### Styling and Theming

The application uses TailwindCSS with custom color variables. You can modify the theme in:

- `src/index.css` - Global styles and color variables
- `components.json` - Shadcn/ui configuration
- TailwindCSS configuration is handled through Vite plugin

## 📱 Usage

1. **Starting the Chat**: The application automatically connects to the WebSocket server on load
2. **Sending Messages**: Type your message in the input field and press Enter or click the send button
3. **Real-time Responses**: The bot will respond in real-time through the WebSocket connection
4. **Message History**: All messages are displayed with timestamps and sender identification

## 🌟 Key Features Explained

### WebSocket Integration

- Automatic connection establishment on app load
- Real-time bidirectional communication
- Connection status monitoring
- Error handling and reconnection logic

### User Interface

- **Hebrew Interface**: All UI text is in Hebrew with RTL support
- **Message Bubbles**: Distinct styling for user and bot messages
- **Typing Indicators**: Animated dots when bot is typing
- **Smooth Animations**: CSS animations for message appearance
- **Responsive Layout**: Adapts to different screen sizes

### Message System

- **Message Types**: Support for text messages with extensible types
- **Timestamps**: Localized time formatting
- **Auto-scroll**: Automatic scrolling to latest messages
- **Message History**: Persistent message display during session

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

The project includes:

- **TypeScript** for type safety
- **ESLint** for code quality
- **React Hooks Rules** for React best practices
- **Strict mode** for development

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Ensure your hosting service supports SPA (Single Page Application) routing

Popular deployment options:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **WebSocket Connection Failed**: Check if the WebSocket server is running and accessible
2. **Build Errors**: Ensure all dependencies are installed with `npm install`
3. **Port Already in Use**: Vite will automatically use the next available port
4. **TypeScript Errors**: Check your TypeScript version and configuration

### Support

For additional support or questions, please open an issue in the repository.
