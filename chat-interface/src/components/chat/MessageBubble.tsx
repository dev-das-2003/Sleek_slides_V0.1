'use client';

import { motion } from 'motion/react'; // Updated import
import { ChatMessage } from '@/lib/types';
import { Bot, User, Check, CheckCheck, Clock } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isLatest = true; // In a real app, you'd track if this is the latest message

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 px-4`}
    >
      <div className={`flex items-end space-x-2 max-w-3xl ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'order-2' : ''}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-blue-500' : 'bg-purple-500'
          }`}>
            {isUser ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <Bot className="w-4 h-4 text-white" />
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className={`relative group ${isUser ? 'order-1' : ''}`}>
          <div
            className={`relative px-4 py-3 rounded-2xl ${
              isUser
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
            }`}
          >
            {/* Message Tail */}
            <div className={`absolute bottom-0 ${
              isUser 
                ? 'right-0 translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-blue-500' 
                : 'left-0 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white border-b border-l border-gray-200'
            }`} />
            
            {/* Message Text */}
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>

            {/* Status Indicator */}
            <div className={`flex items-center space-x-1 mt-2 text-xs ${
              isUser ? 'text-blue-100' : 'text-gray-500'
            }`}>
              <Clock className="w-3 h-3" />
              <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              {isUser && (
                <div className="ml-2">
                  {isLatest ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <CheckCheck className="w-3 h-3" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Hover Actions */}
          <div className={`absolute ${isUser ? 'left-full -ml-2' : 'right-full -mr-2'} top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto`}>
            <div className={`px-2 py-1 rounded-md text-xs font-medium shadow-lg ${
              isUser ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
            }`}>
              Copy
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}