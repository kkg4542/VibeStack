"use client";

import { useEffect, useRef } from "react";
import { useCsrfFetch } from "@/hooks/useCsrfFetch";

interface StackViewTrackerProps {
  stackId: string;
}

/**
 * Fires a single "view" beacon for a stack detail page on mount.
 *
 * The page itself stays statically generated (generateStaticParams), so
 * view counting can't happen server-side at render time — it's recorded
 * client-side against a small API route instead. Renders nothing.
 */
export function StackViewTracker({ stackId }: StackViewTrackerProps) {
  const { csrfFetch } = useCsrfFetch();
  const hasFired = useRef(false);

  useEffect(() => {
    // Guards against React 18/19 StrictMode's dev-only double-invoke of
    // effects, which would otherwise double-count the view.
    if (hasFired.current) return;
    hasFired.current = true;

    csrfFetch(`/api/stacks/${encodeURIComponent(stackId)}/view`, {
      method: "POST",
    }).catch(() => {
      // Silently ignore — a missed view count should never affect the page.
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stackId]);

  return null;
}
