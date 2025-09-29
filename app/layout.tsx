import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { ConditionalLayout } from "@/components/conditional-layout";
import { AuthProvider } from "@/contexts/auth-context";
import { getSessionUser } from "@/lib/sesion";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionUser = await getSessionUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${roboto.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider initialUser={sessionUser}>
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
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
