"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm({
  toggleForm,
}: {
  toggleForm: () => void;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registering with:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 transition"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Already have an account?{" "}
          <button
            onClick={toggleForm}
            className="text-blue-500 font-semibold hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}
