import type { Metadata } from "next";
import { Big_Shoulders, Public_Sans, JetBrains_Mono } from "next/font/google"; // taste-skill-ignore: code font for font-mono on real code
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { CsrfProvider } from "@/components/providers/CsrfProvider";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { LazyMotionProvider } from "@/components/providers/LazyMotionProvider";
import { CustomCursor } from "@/components/effects/CustomCursor";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  weight: ["800"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({ // taste-skill-ignore: code font
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f2" },
    { media: "(prefers-color-scheme: dark)", color: "#18191b" },
  ],
};

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
    images: [{
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "VibeStack - AI Productivity Lab",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeStack - AI Productivity Lab",
    description: "Curated AI tools for developers.",
    creator: "@vibestack",
    images: ["/opengraph-image"],
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
    <html
      lang="en"
      className={`${publicSans.variable} ${bigShoulders.variable} ${jetbrainsMono.variable}`} /* taste-skill-ignore: code font variable */
      suppressHydrationWarning
    >
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={`antialiased bg-background text-foreground selection:bg-vibe-electric/30 selection:text-foreground`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to main content
        </a>
        <ThemeProvider defaultTheme="dark" enableSystem>
          <CsrfProvider>
            <SessionProvider>
              <QueryProvider>
                <LazyMotionProvider>
                  <ScrollProgress />
                  <CustomCursor />
                </LazyMotionProvider>
                <Navbar />
                <main id="main-content">
                  <LazyMotionProvider>
                    {children}
                  </LazyMotionProvider>
                </main>
                <Footer />
              </QueryProvider>
            </SessionProvider>
          </CsrfProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
