"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "hsl(var(--card))",
          color: "hsl(var(--card-foreground))",
          border: "1px solid hsl(var(--border))",
        },
        success: {
          style: {
            background: "hsl(142 76% 97%)",
            color: "hsl(142 72% 29%)",
            borderColor: "hsl(142 70% 45%)",
          },
          iconTheme: {
            primary: "hsl(142 70% 45%)",
            secondary: "#fff",
          },
        },
        error: {
          style: {
            background: "hsl(0 100% 97%)",
            color: "hsl(0 74% 42%)",
            borderColor: "hsl(0 84% 60%)",
          },
          iconTheme: {
            primary: "hsl(0 84% 60%)",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
