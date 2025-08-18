"use client";

import { useState, useCallback } from "react";
import { ChatMessage, ChatState } from "@/lib/types";

export function useChatState() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isConnected: false,
    isTyping: false,
  });

  const addMessage = useCallback(
    (message: Omit<ChatMessage, "id" | "timestamp">) => {
      const newMessage: ChatMessage = {
        ...message,
        id: `msg_${Date.now()}_${Math.random()}`,
        timestamp: Date.now(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));
    },
    []
  );

  const setConnectionStatus = useCallback((isConnected: boolean) => {
    setState((prev) => ({ ...prev, isConnected }));
  }, []);

  const setTypingStatus = useCallback((isTyping: boolean) => {
    setState((prev) => ({ ...prev, isTyping }));
  }, []);

  const clearMessages = useCallback(() => {
    setState((prev) => ({ ...prev, messages: [] }));
  }, []);

  return {
    state,
    addMessage,
    setConnectionStatus,
    setTypingStatus,
    clearMessages,
  };
}
