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

export const toolIconMap: Record<string, ToolIcon> = {
  chatgpt: ChatGPTIcon,
  claude: ClaudeIcon,
  "gemini-code-assist": GeminiIcon,
  cursor: CursorIcon,
  devin: DevinIcon,
  supermaven: SupermavenIcon,
  ollama: OllamaIcon,
  "github-copilot": CopilotIcon,
  linear: LinearIcon,
  "notion-ai": NotionIcon,
  "replit-ai": ReplitIcon,
  tabnine: TabnineIcon,
  cody: CodyIcon,
  "builder-io": BuilderIoIcon,
  v0: V0Icon,
  perplexity: PerplexityIcon,
  lovable: LovableIcon,
  coderabbit: CodeRabbitIcon,
  cosine: CosineIcon,
  aider: AiderIcon,
  windsurf: WindsurfIcon,
};

export function getToolIcon(slug: string): ToolIcon {
  return toolIconMap[slug] || Github;
}
