// src/components/cortheaAI/ChatWindow.tsx

import React, { useEffect, useRef } from "react";
import { Message } from "@/types/cortheaAI/chatTypes";
import MessageBubble from "./MessageBubble";

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col space-y-4 h-full overflow-auto px-4 py-2">
      {/* Displaying all messages */}
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* Displaying loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-2">
          <span className="text-gray-500">AI is thinking...</span>
        </div>
      )}

      {/* Scroll to the latest message */}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatWindow;
