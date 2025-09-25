import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { ConditionalLayout } from "@/components/conditional-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "African Stack - AI Articles & Tech Insights",
  description: "Discover the latest AI articles, tech insights, and innovation stories from Africa's tech community. Join African Stack for quality content and meaningful discussions.",
  keywords: ["AI", "technology", "Africa", "innovation", "articles", "blog"],
  authors: [{ name: "African Stack" }],
  openGraph: {
    title: "African Stack - AI Articles & Tech Insights",
    description: "Discover the latest AI articles, tech insights, and innovation stories from Africa's tech community.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "African Stack - AI Articles & Tech Insights",
    description: "Discover the latest AI articles, tech insights, and innovation stories from Africa's tech community.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
