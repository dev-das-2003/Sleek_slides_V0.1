"use client";

import { useState, KeyboardEvent, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Send } from "lucide-react";

interface InputFieldProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function InputField({
  onSendMessage,
  disabled = false,
}: InputFieldProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
            style={{ minHeight: "40px", maxHeight: "120px" }}
          />
        </div>
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="px-4 py-2"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
