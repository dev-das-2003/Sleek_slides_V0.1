'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Send, Paperclip, Smile, Mic, Plus } from 'lucide-react';

interface InputFieldProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function InputField({ onSendMessage, disabled = false }: InputFieldProps) {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled && !isComposing) {
      onSendMessage(message.trim());
      setMessage('');
      resetTextareaHeight();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <div className="relative border-t border-white/10 bg-black/50 backdrop-blur-xl">
      {/* Gradient Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      
      <div className="max-w-4xl mx-auto p-4">
        {/* Input Container */}
        <div className={`relative glass-strong rounded-3xl border-2 transition-all duration-300 ${
          isFocused 
            ? 'border-blue-500/50 shadow-lg shadow-blue-500/20' 
            : 'border-white/10 hover:border-white/20'
        }`}>
          {/* Toolbar */}
          <div className="flex items-center space-x-2 p-3 border-b border-white/10">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-white/10"
              disabled={disabled}
            >
              <Plus className="w-4 h-4" />
            </Button>
            <div className="w-px h-4 bg-white/10" />
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-white/10"
              disabled={disabled}
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-white/10"
              disabled={disabled}
            >
              <Smile className="w-4 h-4" />
            </Button>
            <div className="flex-1" />
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-white/10"
              disabled={disabled}
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>

          {/* Text Area */}
          <div className="p-3">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type your message..."
              disabled={disabled}
              className="w-full px-3 py-2 bg-transparent text-gray-100 placeholder-gray-500 resize-none focus:outline-none text-sm leading-relaxed"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>

          {/* Send Button */}
          <div className="absolute bottom-3 right-3">
            <Button
              onClick={handleSend}
              disabled={!message.trim() || disabled}
              className={`px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                message.trim() && !disabled
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500">
            Press <span className="text-gray-400 font-mono bg-gray-800/50 px-1 rounded">Enter</span> to send, 
            <span className="text-gray-400 font-mono bg-gray-800/50 px-1 rounded">Shift+Enter</span> for new line
          </p>
        </div>
      </div>
    </div>
  );
}