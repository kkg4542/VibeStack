import { Hero } from "@/components/landing/Hero";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { SponsorSection } from "@/components/landing/SponsorSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/20">
      <Hero />
      <SponsorSection />
      <BentoGrid />

      {/* Footer minimal */}
      <footer className="border-t border-border/40 bg-background/50 py-12 text-center text-sm text-muted-foreground backdrop-blur-xl">
        <p>© 2026 AI Productivity Lab. Built with Next.js & Shadcn.</p>
      </footer>
    </main>
  );
}
