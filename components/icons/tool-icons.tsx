import type { LucideIcon } from "lucide-react";
import {
  ChatGPTIcon,
  ClaudeIcon,
  GeminiIcon,
  CursorIcon,
  DevinIcon,
  OllamaIcon,
  LinearIcon,
  NotionIcon,
  ReplitIcon,
  TabnineIcon,
  CodyIcon,
  BuilderIoIcon,
  V0Icon,
  PerplexityIcon,
  LovableIcon,
  CodeRabbitIcon,
  CosineIcon,
  AiderIcon,
  CopilotIcon,
  ElevenLabsIcon,
  DescriptIcon,
  RunwayIcon,
  MidjourneyIcon,
  FramerIcon,
  VercelIcon,
  BoltIcon,
} from "@/components/icons/AiIcons";
import { ComponentType } from "react";
import { brandMarkFor } from "@/components/icons/brand-marks";

export type ToolIcon = LucideIcon | ComponentType<{ className?: string }>;

// Base mapping of primary keys to icons
const baseIconMap: Record<string, ToolIcon> = {
  chatgpt: ChatGPTIcon,
  claude: ClaudeIcon,
  gemini: GeminiIcon,
  cursor: CursorIcon,
  devin: DevinIcon,
  ollama: OllamaIcon,
  github: CopilotIcon,
  linear: LinearIcon,
  notion: NotionIcon,
  replit: ReplitIcon,
  tabnine: TabnineIcon,
  cody: CodyIcon,
  builder: BuilderIoIcon,
  v0: V0Icon,
  perplexity: PerplexityIcon,
  lovable: LovableIcon,
  coderabbit: CodeRabbitIcon,
  cosine: CosineIcon,
  aider: AiderIcon,
  elevenlabs: ElevenLabsIcon,
  descript: DescriptIcon,
  runway: RunwayIcon,
  midjourney: MidjourneyIcon,
  framer: FramerIcon,
  vercel: VercelIcon,
  bolt: BoltIcon,
};

// Aliases for common slug variations
const iconAliases: Record<string, string> = {
  "gemini-code-assist": "gemini",
  "gemini-pro": "gemini",
  "google-gemini": "gemini",
  "openai-chatgpt": "chatgpt",
  "github-copilot": "github",
  "devin-ai": "devin",
  "builder-io": "builder",
  "notion-ai": "notion",
  "replit-ai": "replit",
  "bolt-new": "bolt",
  "v0-by-vercel": "v0",
};

/**
 * Resolves a tool icon based on a slug, handling common aliases and suffixes.
 */
export function getToolIcon(slug: string): ToolIcon {
  const normalizedSlug = slug.toLowerCase();
  
  // 1. Direct match in base map
  if (baseIconMap[normalizedSlug]) return baseIconMap[normalizedSlug];
  
  // 2. Check alias map
  const alias = iconAliases[normalizedSlug];
  if (alias && baseIconMap[alias]) return baseIconMap[alias];
  
  // 3. Prefix match (e.g., "devin-ai" matches "devin")
  for (const key of Object.keys(baseIconMap)) {
      if (normalizedSlug.startsWith(key + "-") || normalizedSlug === key) {
          return baseIconMap[key];
      }
  }

  // The official brand mark when we have one, else the tool's initials,
  // never a borrowed logo (the old fallback was the GitHub octocat, which
  // read as a cat on every unmapped tool).
  const mark = brandMarkFor(normalizedSlug);
  if (mark) return mark;
  return monogramFor(normalizedSlug);
}

const monogramCache = new Map<string, ToolIcon>();

/** "adobe-firefly" -> "AF", "slack-ai" -> "S", "figma" -> "F". */
function monogramText(slug: string): string {
  const words = slug
    .split("-")
    .filter((word) => /^[a-z]/.test(word) && word !== "ai");
  const letters = words.slice(0, 2).map((word) => word[0].toUpperCase());
  return letters.join("") || slug[0]?.toUpperCase() || "?";
}

/**
 * One stable component per slug (so React does not remount it on every
 * render). It is an SVG so it scales with the same h-/w- classes as the real
 * icons, drawn in currentColor with the display face.
 */
function monogramFor(slug: string): ToolIcon {
  const cached = monogramCache.get(slug);
  if (cached) return cached;
  const text = monogramText(slug);
  const Monogram: ComponentType<{ className?: string }> = ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* Same footprint as the brand icons that carry their own tile; the
          tile and letters swap with the theme (ink tile, ground letters). */}
      <rect width="24" height="24" rx="2" fill="var(--foreground)" />
      <text
        x="12"
        y="12.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={text.length > 1 ? 14 : 17}
        fontWeight={800}
        fill="var(--background)"
        style={{ fontFamily: "var(--font-big-shoulders), Impact, sans-serif" }}
      >
        {text}
      </text>
    </svg>
  );
  monogramCache.set(slug, Monogram);
  return Monogram;
}

// Keep the map export for components that might iterate over it (though getToolIcon is preferred)
export const toolIconMap: Record<string, ToolIcon> = new Proxy(baseIconMap, {
    get: (target, prop) => {
        if (typeof prop === 'string') {
            return getToolIcon(prop);
        }
        return (target as any)[prop];
    }
});
