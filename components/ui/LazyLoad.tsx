"use client";

import { Suspense, lazy, ComponentType, ReactNode, useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Default loading fallback
const DefaultLoadingFallback = () => (
  <div className="w-full h-48 flex items-center justify-center">
    <Skeleton className="w-full h-full" />
  </div>
);

// Lazy load a component with loading fallback
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ReactNode
) {
  const LazyComponent = lazy(importFunc);

  return function LazyLoadedComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback || <DefaultLoadingFallback />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Preload component for faster navigation
export function preloadComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  const componentPromise = importFunc();
  return componentPromise;
}

// Route-based code splitting wrapper
interface LazyRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function LazyRoute({ children, fallback }: LazyRouteProps) {
  return (
    <Suspense fallback={fallback || <PageLoadingFallback />}>
      {children}
    </Suspense>
  );
}

// Page loading fallback with progress
function PageLoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="text-muted-foreground animate-pulse">Loading...</p>
    </div>
  );
}



// Lazy load heavy page sections
export const LazyHero = lazyLoad(
  () => import("@/components/landing/Hero").then((mod) => ({ default: mod.Hero })),
  <SectionLoadingFallback />
);

export const LazyBentoGrid = lazyLoad(
  () => import("@/components/landing/BentoGrid").then((mod) => ({ default: mod.BentoGrid })),
  <SectionLoadingFallback />
);

function SectionLoadingFallback() {
  return (
    <div className="w-full h-[500px] flex items-center justify-center">
      <Skeleton className="w-full h-full" />
    </div>
  );
}

// Intersection Observer based lazy loading
interface IntersectionLazyLoadProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export function IntersectionLazyLoad({
  children,
  fallback,
  rootMargin = "100px",
  threshold = 0.1,
  triggerOnce = true,
}: IntersectionLazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerOnce && hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasTriggered(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold, triggerOnce, hasTriggered]);

  return (
    <div ref={ref}>
      {isVisible ? children : fallback || <DefaultLoadingFallback />}
    </div>
  );
}

// Progressive loading with priority levels
interface ProgressiveLoadProps {
  children: ReactNode;
  priority?: "high" | "medium" | "low";
  delay?: number;
}

export function ProgressiveLoad({
  children,
  priority = "medium",
  delay,
}: ProgressiveLoadProps) {
  const [shouldRender, setShouldRender] = useState(priority === "high");

  useEffect(() => {
    if (priority === "high") return;

    const timeouts: Record<string, number> = {
      high: 0,
      medium: 100,
      low: 300,
    };

    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay ?? timeouts[priority]);

    return () => clearTimeout(timer);
  }, [priority, delay]);

  if (!shouldRender) {
    return <DefaultLoadingFallback />;
  }

  return <>{children}</>;
}

// Dynamic import with retry logic
export function dynamicImportWithRetry<T>(
  importFunc: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    importFunc()
      .then(resolve)
      .catch((error) => {
        if (retries === 0) {
          reject(error);
          return;
        }
        setTimeout(() => {
          dynamicImportWithRetry(importFunc, retries - 1, delay)
            .then(resolve)
            .catch(reject);
        }, delay);
      });
  });
}

// Preload critical routes
export function preloadRoute(route: string) {
  const routeMap: Record<string, () => Promise<any>> = {
    "/tools": () => import("@/app/tools/page"),
    "/build": () => import("@/app/build/page"),
    "/blog": () => import("@/app/blog/page"),
    "/about": () => import("@/app/about/page"),
  };

  const loader = routeMap[route];
  if (loader) {
    // Use requestIdleCallback for non-critical preloading
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(() => {
        loader();
      });
    } else {
      setTimeout(loader, 1000);
    }
  }
}

// Hook for preloading on hover
export function usePreloadOnHover(route: string) {
  return {
    onMouseEnter: () => preloadRoute(route),
    onFocus: () => preloadRoute(route),
  };
}
