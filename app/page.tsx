import { Hero } from "@/components/landing/Hero";
import { BentoGrid } from "@/components/landing/BentoGrid";
import * as motion from "framer-motion/client";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/20">
      <Hero />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <BentoGrid />
      </motion.div>

      {/* Footer minimal */}
      <footer className="border-t border-border/40 bg-background/50 py-12 text-center text-sm text-muted-foreground backdrop-blur-xl">
        <p>© 2026 AI Productivity Lab. Built with Next.js & Shadcn.</p>
      </footer>
    </main>
  );
}
