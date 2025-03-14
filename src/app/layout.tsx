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

  console.log("Rendering RootLayout with pathname:", pathname); // Debugging the pathname

  return (
    <html lang="en">
      <head>
        <title>Disaster Detection Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="">
        {" "}
        {/* Added background color for debugging */}
        {isLandingPage ? (
          <LayoutWrapper>{children}</LayoutWrapper>
        ) : (
          <div>{children}</div> // Ensure children are rendered even on non-landing pages
        )}
      </body>
    </html>
  );
}
