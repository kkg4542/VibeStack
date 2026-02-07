declare global {
  interface Window {
    gtag: (
      command: "event" | "config" | "consent" | "js" | "set",
      eventName: string,
      params?: Record<string, any>
    ) => void;
    dataLayer: Record<string, unknown>[];
  }
}

export type AnalyticsEvent =
  | "tool_visit"
  | "affiliate_click"
  | "newsletter_subscribe"
  | "get_featured_click"
  | "tool_comparison"
  | "social_share"
  | "theme_change"
  | "search_query"
  | "filter_use"
  | "stack_finder_step"
  | "stack_recommended";

interface EventParams {
  tool_visit: { tool_slug: string; tool_name: string };
  affiliate_click: { tool_slug: string; tool_name: string; url: string };
  newsletter_subscribe: { email_domain: string };
  get_featured_click: { location: "navbar" | "footer" | "sidebar" };
  tool_comparison: { tools: string[] };
  social_share: { platform: string; tool_slug: string };
  theme_change: { theme: "light" | "dark" | "system" };
  search_query: { query: string; results_count: number };
  filter_use: { filter_type: string; filter_value: string };
  stack_finder_step: { step_id: string; option_id: string };
  stack_recommended: { stack_name: string; total_price: string };
}

export function trackEvent<T extends AnalyticsEvent>(
  event: T,
  params: EventParams[T]
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }
}

export function trackToolVisit(toolSlug: string, toolName: string): void {
  trackEvent("tool_visit", { tool_slug: toolSlug, tool_name: toolName });
}

export function trackAffiliateClick(
  toolSlug: string,
  toolName: string,
  url: string
): void {
  trackEvent("affiliate_click", {
    tool_slug: toolSlug,
    tool_name: toolName,
    url: url,
  });
}

export function trackNewsletterSubscribe(email: string): void {
  const domain = email.split("@")[1] || "unknown";
  trackEvent("newsletter_subscribe", { email_domain: domain });
}

export function trackGetFeaturedClick(
  location: "navbar" | "footer" | "sidebar"
): void {
  trackEvent("get_featured_click", { location });
}

export function trackToolComparison(toolSlugs: string[]): void {
  trackEvent("tool_comparison", { tools: toolSlugs });
}

export function trackSocialShare(platform: string, toolSlug: string): void {
  trackEvent("social_share", { platform, tool_slug: toolSlug });
}

export function trackThemeChange(theme: "light" | "dark" | "system"): void {
  trackEvent("theme_change", { theme });
}

export function trackSearchQuery(query: string, resultsCount: number): void {
  trackEvent("search_query", { query, results_count: resultsCount });
}

export function trackFilterUse(
  filterType: string,
  filterValue: string
): void {
  trackEvent("filter_use", { filter_type: filterType, filter_value: filterValue });
}

export function trackStackFinderStep(stepId: string, optionId: string): void {
  trackEvent("stack_finder_step", { step_id: stepId, option_id: optionId });
}

export function trackStackRecommended(stackName: string, totalPrice: string): void {
  trackEvent("stack_recommended", { stack_name: stackName, total_price: totalPrice });
}
