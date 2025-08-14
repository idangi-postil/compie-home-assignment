import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/header";
import ChatPage from "./routes/ChatPage";
import ImageGallery from "./routes/ImageGallery";
import { ImageProvider } from "./contexts/ImageContext";

export default function App() {
  return (
    <ImageProvider>
      <BrowserRouter>
        <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-teal-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800">
          <Header />
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/gallery" element={<ImageGallery />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ImageProvider>
  );
}
