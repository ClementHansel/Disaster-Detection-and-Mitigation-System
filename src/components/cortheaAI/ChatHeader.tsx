import React from "react";

// Define the prop types
interface ChatHeaderProps {
  onSidebarToggle: () => void; // Accept the sidebar toggle function
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onSidebarToggle }) => {
  return (
    <div className="bg-blue-500 p-4 flex items-center justify-between text-white">
      <h1 className="text-lg font-semibold">Corthea AI</h1>

      {/* Hamburger Button for Sidebar - Visible on all screen sizes */}
      <button
        onClick={onSidebarToggle} // Trigger the toggle function when the button is clicked
        className="p-2 bg-blue-700 rounded-md lg:hidden" // Visible on smaller screens, hidden on large
        aria-label="Open Sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Desktop version: show the button even on large screens */}
      <button
        onClick={onSidebarToggle} // Same function for desktop, you could handle this differently if needed
        className="hidden lg:block p-2 bg-blue-700 rounded-md" // Show it on large screens
        aria-label="Open Sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatHeader;
