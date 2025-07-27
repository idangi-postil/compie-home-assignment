# 🤖 Smart Chat Application (צ'אט חכם)

An intelligent, real-time chat application built with modern web technologies. Features include random Hebrew message generation, dynamic content types (text/image), and a beautiful Hebrew-friendly interface with WebSocket connectivity.

## ✨ Features

- **🎲 Random Message Generation** - Automatically sends random Hebrew greetings from a predefined list
- **🖼️ Dynamic Content Types** - Randomly switches between text messages and image URLs
- **� Image Integration** - Sends random images from Picsum Photos (https://picsum.photos/200)
- **⚡ Real-time Communication** - WebSocket-based instant messaging
- **🎨 Modern UI/UX** - Beautiful gradient backgrounds with glass-morphism effects
- **🇮🇱 Hebrew Support** - Full RTL (Right-to-Left) text support with Hebrew interface
- **📱 Responsive Design** - Seamless experience across desktop and mobile devices
- **⏰ Message Timestamps** - Localized Hebrew timestamps for each message
- **🔄 Connection Status** - Real-time WebSocket connection monitoring
- **💫 Smooth Animations** - Elegant loading states and message transitions

## 🛠️ Technology Stack

- **Frontend Framework**: React 19+ with TypeScript
- **Build Tool**: Vite 6+ for fast development and building
- **Styling**: TailwindCSS 4+ with custom animations and Hebrew RTL support
- **UI Components**: Shadcn/ui components built on Radix UI primitives
- **WebSocket**: Native WebSocket API for real-time bidirectional communication
- **Icons**: Lucide React for modern iconography
- **Development Tools**: ESLint for code quality, TypeScript for type safety

## � Project Architecture

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── avatar.tsx         # User/bot avatar component
│   │   ├── button.tsx         # Styled button component
│   │   ├── card.tsx           # Message card container
│   │   └── input.tsx          # Text input component
│   ├── header.tsx             # Application header
│   └── loader.tsx             # Loading spinner component
├── api/
│   └── useWebSocket.ts        # WebSocket hook with random type generation
├── lib/
│   └── utils.ts              # Utility functions and helpers
├── hooks/                    # Custom React hooks directory
├── assets/                   # Static assets (images, icons)
├── App.tsx                   # Main chat application component
├── main.tsx                  # Application entry point
├── index.css                 # Global styles and TailwindCSS
└── vite-env.d.ts            # Vite environment types
```

## 🚀 Quick Start

### Prerequisites

Ensure you have these installed:

- **Node.js** (version 18 or higher recommended)
- **npm** or **yarn** package manager
- Modern web browser with WebSocket support

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd homeAssignment-compie
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🎯 Key Features Explained

### 🖼️ Dynamic Content Types

Messages are randomly assigned as either text or image:

- **Text Messages**: Uses the randomly selected Hebrew phrases
- **Image Messages**: Automatically sends `https://picsum.photos/200` for random images

### ⚡ WebSocket Integration

- **Endpoint**: `wss://ws.postman-echo.com/raw`
- **Auto-connection**: Establishes connection on app load
- **Message Format**: JSON with command, message, and type fields
- **Real-time**: Bidirectional communication with instant responses

## �️ Development Commands

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build optimized production bundle        |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint for code quality checks       |

## � UI/UX Features

### Design Elements

- **Gradient Backgrounds**: Beautiful color transitions from slate to purple to teal
- **Glass Morphism**: Modern frosted glass effects on cards and components
- **Hebrew Typography**: Properly configured RTL text rendering
- **Responsive Layout**: Mobile-first design that scales beautifully

### Interactive Elements

- **Typing Indicators**: Animated dots show when bot is responding
- **Smooth Animations**: CSS transitions for message appearance
- **Auto-scroll**: Messages automatically scroll into view
- **Connection Status**: Visual indicators for WebSocket connection state

## 🔧 Configuration Options

### WebSocket Settings

Modify the WebSocket endpoint in `src/api/useWebSocket.ts`:

```typescript
const socket = new WebSocket("your-custom-websocket-url");
```

### Random Word List

Customize the Hebrew phrases in `src/App.tsx`:

```typescript
const randomWords = [
  // Add your custom Hebrew phrases here
];
```

### Styling Customization

- **TailwindCSS**: Modify `tailwind.config.js` for custom themes
- **CSS Variables**: Update color schemes in `src/index.css`
- **Component Styles**: Individual component styling in respective files

## � Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Android Chrome)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

**Built with ❤️ and ☕ for the modern web**
