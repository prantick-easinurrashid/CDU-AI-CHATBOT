// app/page.js
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Replace with your working backend
const API_URL = "https://homophyly-multichanneled-pia.ngrok-free.dev/generate";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      id: Date.now(), // First message ID
      sender: "bot",
      text: "👋 Hello! I'm your CDU Assistant. Ask me anything about CDU policies, courses, or help resources.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    document.title = "CDU AI";
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now() + Math.random(),
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, max_tokens: 250 }),
      });

      const data = await res.json();
      const botReply = data.response || "⚠️ Sorry, I couldn't understand that.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          sender: "bot",
          text: botReply,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          sender: "bot",
          text: "⚠️ Connection error. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-purple-700 to-indigo-600 text-white p-5 text-center shadow-lg">
        <h1 className="text-2xl font-bold tracking-wide">Help for CDU Students</h1>
        <p className="text-sm text-purple-200">Powered by Falcon RAG AI</p>
      </header>

      {/* Chat Body */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-10 md:px-24 lg:px-40 backdrop-blur-sm">
        <div className="space-y-5">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-md transition-all duration-300 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-none backdrop-blur-md"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-sm text-gray-600 flex gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.2s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.1s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Footer Input */}
      <footer className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-inner p-4 flex items-center gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question about CDU..."
          className="flex-1 resize-none p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm transition-all"
          rows={1}
        />
        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-transform shadow-md hover:shadow-lg"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
