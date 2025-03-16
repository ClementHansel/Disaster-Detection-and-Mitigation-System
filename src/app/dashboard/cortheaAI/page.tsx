"use client";
import React, { useState } from "react";
import ChatHeader from "@/components/cortheaAI/ChatHeader";
import ChatWindow from "@/components/cortheaAI/ChatWindow";
import MessageInput from "@/components/cortheaAI/MessageInput";
import ChatSidebar from "@/components/cortheaAI/ChatSidebar";
import { Message } from "@/types/cortheaAI/chatTypes";

const CortheaAIPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle sending message from the user
  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: message,
      timestamp: new Date().toISOString(), // Add timestamp
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString(),
        sender: "ai",
        content: "AI response here", // AI logic will be added later
        timestamp: new Date().toISOString(), // Add timestamp
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar state
  };

  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar component */}
      <ChatSidebar
        isSidebarOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Page content, adjusting width based on sidebar state */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20" // Adjust left margin based on sidebar state
        }`}
      >
        {/* Header component with sidebar toggle */}
        <ChatHeader onSidebarToggle={handleSidebarToggle} />

        <div className="flex-1 overflow-auto mt-16">
          {/* Chat window component with scrollable messages */}
          <ChatWindow messages={messages} isLoading={isLoading} />
        </div>

        {/* Message input field */}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default CortheaAIPage;
