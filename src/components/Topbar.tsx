"use client";

import Image from "next/image";
import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";

const Topbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 text-white flex items-center px-4 shadow-md z-20">
      <div className="flex items-center justify-between w-full">
        {/* Left Side: Company Logo */}
        <div className="flex items-center space-x-4">
          <Image
            src="/company-logo.png"
            alt="Company Logo"
            width={40}
            height={40}
          />
        </div>
        {/* Right Side: Dark Mode Toggle and User Profile */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-gray-700 rounded"
            title="Toggle Dark Mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <div className="flex items-center space-x-2">
            <FaUserCircle className="text-xl" />
            <span className="text-sm">Username</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
