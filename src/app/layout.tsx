"use client";

import "@/styles/global.css";

import { usePathname } from "next/navigation";
import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <html lang="en">
      <head>
        <title>Disaster Detection Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {isLandingPage ? <LayoutWrapper>{children}</LayoutWrapper> : children}
      </body>
    </html>
  );
}
