'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Bot, MessageSquare, Sparkles, ArrowRight, 
  Zap, Shield, Users, TrendingUp,
  Github, Twitter
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="animated-bg" />
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full opacity-20"
            style={{
              background: `linear-gradient(135deg, 
                hsl(${i * 60}, 70%, 50%) 0%, 
                hsl(${i * 60 + 30}, 70%, 50%) 100%)`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AI Chat</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <div className="flex items-center space-x-2">
              <Github className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 glass px-6 py-3 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white font-medium">Powered by Next.js 15 & AI</span>
            <Zap className="w-4 h-4 text-blue-400" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="kinetic-text neon-glow">
              AI Chat Interface
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the future of conversation with our cutting-edge AI chat interface.
            <span className="gradient-text-1 font-semibold"> Real-time messaging</span>,
            <span className="gradient-text-2 font-semibold"> intelligent responses</span>, and
            <span className="gradient-text-3 font-semibold"> immersive design</span>.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/chat"
              className="group inline-flex items-center space-x-3 px-8 py-4 glass-strong rounded-2xl text-white font-semibold text-lg hover-lift neon-border border-purple-500"
            >
              <span>Start Chatting</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            <span className="gradient-text-2">Why Choose Our Platform?</span>
          </motion.h2>

          <div className="bento-grid">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bento-item glass p-8 floating-card hover-lift"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-time Chat</h3>
              <p className="text-gray-300 mb-6">
                Experience instant messaging with our WebSocket-powered infrastructure. 
                Latency under 100ms globally.
              </p>
              <div className="flex items-center space-x-2 text-blue-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">99.9% Uptime</span>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bento-item glass p-8 floating-card hover-lift"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Powered</h3>
              <p className="text-gray-300 mb-6">
                Advanced language models provide intelligent, context-aware responses. 
                Supports multiple languages and dialects.
              </p>
              <div className="flex items-center space-x-2 text-purple-400">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Enterprise Grade</span>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bento-item glass p-8 floating-card hover-lift md:col-span-2"
            >
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Collaborative</h3>
                  <p className="text-gray-300">
                    Work together in real-time with your team. Share conversations, 
                    artifacts, and insights seamlessly.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bento-item neo-brutal p-8 text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">10M+</div>
              <div className="text-gray-300">Messages Daily</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bento-item neo-brutal p-8 text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-300">Uptime SLA</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-400 mb-4">
            <Bot className="w-5 h-5" />
            <span>Built with Next.js 15, TypeScript, and Tailwind CSS</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 AI Chat Interface. Redefining conversations.
          </p>
        </div>
      </footer>
    </div>
  );
}