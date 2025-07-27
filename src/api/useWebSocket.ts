import { useEffect, useState } from "react";
const socket = new WebSocket("wss://ws.postman-echo.com/raw");
const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<{
    command: string;
    message: string;
  } | null>(null);
  useEffect(() => {
    if (isConnected) {
      socket.send(JSON.stringify({ command: "init" }));
    }
  }, [isConnected]);
  socket.onopen = () => {
    console.log("WebSocket connection established");
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
    console.log("Message from server: ", event.data);
  };
  const sendMessage = (message: string) => {
    if (isConnected) {
      socket.send(JSON.stringify({ command: "chat", message: message }));
    }
  };

  return { isConnected, error, sendMessage, message: lastMessage };
};
export default useWebSocket;
