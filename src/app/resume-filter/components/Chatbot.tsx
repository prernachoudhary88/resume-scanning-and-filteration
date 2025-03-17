// app/components/Chatbot.js
"use client";
import { useState, useRef, useEffect } from "react";
import { FiSend, FiCopy } from "react-icons/fi";
import EmployeeNavbar from "./EmployeeNavbar";
import Image from "next/image";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "chatbot", text: "Hey there! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on content
    }
  }, [input]);

  // Copy chatbot reply to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!"); // Optional: Show a success message
      })
      .catch(() => {
        alert("Failed to copy."); // Optional: Show an error message
      });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Fixed Navbar */}
      <div className="sticky top-0 z-10 bg-white">
        <EmployeeNavbar />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto pl-20 pr-25 py-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col space-y-2 ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`text-md px-5 py-3 rounded-4xl max-w-[80%] relative ${
                msg.sender === "user"
                  ? "bg-gray-100 text-gray-700" // Light gray background for user messages
                  : "text-gray-700" // No background for chatbot messages
              }`}
            >
              {msg.text}
              {msg.sender === "chatbot" && (
                <button
                  onClick={() => handleCopy(msg.text)}
                  className="absolute -top-2 -right-2 p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                  title="Copy"
                >
                  <FiCopy size={14} className="text-gray-600" />
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input Field */}
      <div className="sticky bottom-0 bg-white px-20 pb-7">
        <div className="flex items-end gap-2 rounded-3xl p-5 shadow-lg border border-gray-300">
          <textarea
            ref={textareaRef}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent new line on Enter
                handleSend();
              }
            }}
            className="w-full p-2 bg-transparent focus:outline-none placeholder-gray-400 resize-none overflow-y-auto max-h-40"
            rows={1}
            style={{ maxHeight: "160px" }} // 5-6 lines max height
          />
          <button
            onClick={handleSend}
            className="rounded-full transition-transform transform hover:scale-105"
            >
            <Image src="/icons/up-arrow.png" alt="Send⬆" width={50} height={50} />
            </button>
        </div>
      </div>
    </div>
  );
}