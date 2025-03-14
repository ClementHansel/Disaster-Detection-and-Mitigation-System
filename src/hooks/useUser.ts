"use client";

import { useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate API call for user data
    const fetchUser = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser({
        id: "user-1",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Administrator",
      });
    };

    fetchUser();
  }, []);

  return user;
}
