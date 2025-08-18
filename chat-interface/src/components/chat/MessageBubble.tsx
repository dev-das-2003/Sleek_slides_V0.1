"use client";

import { motion } from "motion/react";
import { ChatMessage } from "@/lib/types";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-2xl px-4 py-3 rounded-lg ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="text-sm font-medium mb-1">
          {isUser ? "You" : "AI Assistant"}
        </div>
        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
        <div className="text-xs mt-2 opacity-70">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  );
}
