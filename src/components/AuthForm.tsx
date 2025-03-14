"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegistrationForm";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-lg rounded-lg p-6 w-96"
      >
        {isLogin ? (
          <LoginForm toggleForm={toggleForm} />
        ) : (
          <RegisterForm toggleForm={toggleForm} />
        )}
      </motion.div>
    </div>
  );
}
