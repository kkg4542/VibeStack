import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vibestack.com"),
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
    url: "https://vibestack.com",
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
  icons: {
    icon: "/favicon.ico",
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-200`}
      >
        <ThemeProvider defaultTheme="dark" enableSystem>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
