"use client";

import React from "react";
import FAQSection from "@/components/help/FAQSection";
import TutorialSection from "@/components/help/TutorialSection";
import SupportForm from "@/components/help/SupportForm";

const HelpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Help & Support</h1>
      <div className="space-y-6">
        <FAQSection />
        <TutorialSection />
        <SupportForm />
      </div>
    </div>
  );
};

export default HelpPage;
