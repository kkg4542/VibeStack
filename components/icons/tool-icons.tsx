import { LucideIcon, Github } from "lucide-react";
import {
  ChatGPTIcon,
  ClaudeIcon,
  GeminiIcon,
  CursorIcon,
  DevinIcon,
  SupermavenIcon,
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
  WindsurfIcon,
  CopilotIcon,
} from "@/components/icons/AiIcons";
import { ComponentType } from "react";

export type ToolIcon = LucideIcon | ComponentType<{ className?: string }>;

// Base mapping of primary keys to icons
const baseIconMap: Record<string, ToolIcon> = {
  chatgpt: ChatGPTIcon,
  claude: ClaudeIcon,
  gemini: GeminiIcon,
  cursor: CursorIcon,
  devin: DevinIcon,
  supermaven: SupermavenIcon,
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
  windsurf: WindsurfIcon,
};

// Aliases for common slug variations
const iconAliases: Record<string, string> = {
  "gemini-code-assist": "gemini",
  "gemini-pro": "gemini",
  "google-gemini": "gemini",
  "openai-chatgpt": "chatgpt",
  "github-copilot": "github",
  "windsurf-ide": "windsurf",
  "devin-ai": "devin",
  "builder-io": "builder",
  "notion-ai": "notion",
  "replit-ai": "replit",
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

  return Github;
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
