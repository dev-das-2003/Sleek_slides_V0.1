"use client";

import { useEffect } from "react";
import { useWebSocket } from "@/components/hooks/useWebSocket";
import { useChatState } from "@/components/hooks/useChatState";
import { MessageList } from "./MessageList";
import { InputField } from "./InputField";

export function ChatContainer() {
  const { state, addMessage, setConnectionStatus, setTypingStatus } =
    useChatState();
  const { isConnected, sendMessage, onMessage } = useWebSocket();

  // Update connection status
  useEffect(() => {
    setConnectionStatus(isConnected);
  }, [isConnected, setConnectionStatus]);

  // Setup message handlers
  useEffect(() => {
    onMessage("message", (data) => {
      addMessage({
        role: "assistant",
        content: data.content,
      });
      setTypingStatus(false);
    });

    onMessage("typing", () => {
      setTypingStatus(true);
    });

    onMessage("status", (data) => {
      console.log("Status update:", data);
    });
  }, [onMessage, addMessage, setTypingStatus]);

  const handleSendMessage = (content: string) => {
    // Add user message to UI
    addMessage({
      role: "user",
      content,
    });

    // Send via WebSocket
    sendMessage({
      type: "message",
      content,
      timestamp: Date.now(),
    });

    // Show typing indicator
    setTypingStatus(true);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Connection status */}
      <div className="bg-white border-b px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">AI Chat Interface</h1>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm text-gray-600">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <MessageList messages={state.messages} isTyping={state.isTyping} />

      {/* Input */}
      <InputField onSendMessage={handleSendMessage} disabled={!isConnected} />
    </div>
  );
}
