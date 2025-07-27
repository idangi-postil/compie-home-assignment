import { useEffect, useState } from "react";
const socket = new WebSocket("wss://ws.postman-echo.com/raw");
const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<{
    command: string;
    message: string;
    type: "text" | "image";
  } | null>(null);
  useEffect(() => {
    if (isConnected) {
      socket.send(
        JSON.stringify({ command: "init", message: "היי ברוך בואך" })
      );
    }
  }, [isConnected]);
  socket.onopen = () => {
    setIsConnected(true);
    setError(null);
  };

  socket.onclose = () => {
    setIsConnected(false);
  };

  socket.onerror = (event) => {
    setError(`WebSocket error: ${event}`);
  };

  socket.onmessage = (event) => {
    setLastMessage(JSON.parse(event.data));
  };
  const sendMessage = (message: string) => {
    if (isConnected) {
      const type = Math.random() < 0.5 ? "image" : "text";
      const finalMessage =
        type === "image" ? "https://picsum.photos/100" : message;
      socket.send(
        JSON.stringify({
          command: "chat",
          message: finalMessage,
          type: type,
        })
      );
    }
  };

  return { isConnected, error, sendMessage, message: lastMessage };
};
export default useWebSocket;
