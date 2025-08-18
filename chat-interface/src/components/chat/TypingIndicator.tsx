"use client";

import { motion } from "motion/react";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center space-x-1 text-gray-500"
    >
      <span className="text-sm">AI is typing</span>
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
