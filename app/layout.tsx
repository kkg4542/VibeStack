import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usevibestack.com"),
  title: {
    default: "VibeStack - AI Productivity Lab",
    template: "%s | VibeStack",
  },
  description: "Curated AI tools for developers. Discover the best tools to accelerate your workflow, from coding assistants to project management.",
  keywords: ["AI", "Developer Tools", "Productivity", "Coding", "Linear", "Cursor", "Vibe Coding"],
  authors: [{ name: "David Kim" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://usevibestack.com",
    title: "VibeStack - AI Productivity Lab",
    description: "Curated AI tools for developers. Discover the best tools to accelerate your workflow.",
    siteName: "VibeStack",
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeStack - AI Productivity Lab",
    description: "Curated AI tools for developers.",
    creator: "@vibestack",
  },
  verification: {
    other: {
      'impact-site-verification': '5db97e44-cd36-4f35-9f7b-f7495b5eac1e',
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VibeStack",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to main content
        </a>
        <ThemeProvider defaultTheme="dark" enableSystem>
          <SessionProvider>
            <Navbar />
            <main id="main-content">
              {children}
            </main>
            <Footer />
          </SessionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
