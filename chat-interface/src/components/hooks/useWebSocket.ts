"use client";

import { useEffect, useRef, useState } from "react";
import { WebSocketManager } from "@/lib/websocket";
import { WebSocketMessage } from "@/lib/types";

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(true);
  const wsRef = useRef(WebSocketManager);
  const messageHandlers = useRef<Map<string, Function>>(new Map());

  useEffect(() => {
    // Get WebSocket URL from environment variable or use default
    const wsUrl =
      process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000/api/ws";

    wsRef.current = new WebSocketManager({
      url: wsUrl,
      onOpen: () => setIsConnected(true),
      onClose: () => setIsConnected(false),
    });

    wsRef.current.connect();

    return () => {
      wsRef.current?.disconnect();
    };
  }, []); // Empty dependency array means this runs once on mount

  const sendMessage = (message: any) => {
    wsRef.current?.sendMessage(message);
  };

  const onMessage = (
    type: string,
    handler: (message: WebSocketMessage) => void
  ) => {
    messageHandlers.current.set(type, handler);

    // Forward to WebSocket manager
    wsRef.current?.onMessage(type, handler);
  };

  return {
    isConnected,
    sendMessage,
    onMessage,
  };
}
