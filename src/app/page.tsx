"use client";

import AuthForm from "@/components/AuthForm";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <AuthForm />
    </main>
  );
}
