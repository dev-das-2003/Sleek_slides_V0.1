'use client';

import { motion } from 'motion/react';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start space-x-3 px-4 mb-8"
    >
      {/* AI Avatar */}
      <div className="flex-shrink-0 relative">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        {/* Pulsing indicator */}
        <div className="absolute -bottom-1 -right-1">
          <motion.div
            className="w-3 h-3 bg-purple-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Typing Bubble */}
      <div className="relative max-w-md">
        <div className="glass-strong p-4 rounded-3xl border border-purple-500/30">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-purple-500/10 blur-xl" />
          
          <div className="relative z-10 flex items-center space-x-3">
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-purple-300 font-medium">AI is thinking...</span>
          </div>
        </div>
        
        {/* Bubble Tail */}
        <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 glass-strong border-l border-t border-purple-500/30" />
      </div>
    </motion.div>
  );
}