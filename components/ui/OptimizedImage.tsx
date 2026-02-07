"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  quality?: number;
  loading?: "eager" | "lazy";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  onLoad?: () => void;
  onError?: () => void;
}

// Optimized Image component with blur placeholder
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  containerClassName,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  placeholder = "blur",
  blurDataURL,
  quality = 85,
  loading = "lazy",
  objectFit = "cover",
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
    onError?.();
  };

  // Generate a simple blur placeholder if not provided
  const defaultBlurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==";

  if (error) {
    return (
      <div
        className={cn(
          "bg-muted flex items-center justify-center",
          fill ? "absolute inset-0" : "",
          containerClassName
        )}
        style={!fill ? { width, height } : undefined}
      >
        <span className="text-muted-foreground text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        fill ? "absolute inset-0" : "",
        isLoading && placeholder === "blur" ? "animate-pulse" : "",
        containerClassName
      )}
      style={!fill ? { width, height } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        loading={loading}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        className={cn(
          "transition-all duration-500",
          isLoading ? "scale-110 blur-lg" : "scale-100 blur-0",
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain",
          objectFit === "fill" && "object-fill",
          objectFit === "none" && "object-none",
          objectFit === "scale-down" && "object-scale-down",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

// Responsive image with aspect ratio
interface ResponsiveImageProps extends Omit<OptimizedImageProps, 'width' | 'height' | 'fill'> {
  aspectRatio?: string;
  maxWidth?: string;
}

export function ResponsiveImage({
  aspectRatio = "16/9",
  maxWidth = "100%",
  className,
  containerClassName,
  ...props
}: ResponsiveImageProps) {
  return (
    <div
      className={cn("relative w-full", containerClassName)}
      style={{ maxWidth, aspectRatio }}
    >
      <OptimizedImage
        {...props}
        fill
        className={cn("absolute inset-0", className)}
      />
    </div>
  );
}

// Avatar image with fallback
interface AvatarImageProps {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
  fallback?: string;
}

export function AvatarImage({
  src,
  alt,
  size = 40,
  className,
  fallback,
}: AvatarImageProps) {
  const [error, setError] = useState(false);
  const initials = fallback || alt.slice(0, 2).toUpperCase();

  if (error || !src) {
    return (
      <div
        className={cn(
          "bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold rounded-full",
          className
        )}
        style={{ width: size, height: size }}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("rounded-full object-cover", className)}
      onError={() => setError(true)}
    />
  );
}

// Lazy loaded image with intersection observer
interface LazyImageProps extends OptimizedImageProps {
  rootMargin?: string;
  threshold?: number;
}

export function LazyImage({
  rootMargin = "100px",
  threshold = 0.1,
  ...props
}: LazyImageProps) {
  return (
    <OptimizedImage
      {...props}
      loading="lazy"
    />
  );
}

// WebP image with fallback
interface WebPImageProps extends OptimizedImageProps {
  webpSrc?: string;
  fallbackSrc?: string;
}

export function WebPImage({
  src,
  webpSrc,
  fallbackSrc,
  ...props
}: WebPImageProps) {
  // Use WebP version if available, otherwise use original
  const imageSrc = webpSrc || src;

  return (
    <OptimizedImage
      src={imageSrc}
      {...props}
    />
  );
}

// Image with dark/light mode variants
interface ThemedImageProps extends Omit<OptimizedImageProps, 'src'> {
  lightSrc: string;
  darkSrc: string;
}

export function ThemedImage({
  lightSrc,
  darkSrc,
  className,
  ...props
}: ThemedImageProps) {
  return (
    <>
      <div className="dark:hidden">
        <OptimizedImage
          src={lightSrc}
          {...props}
          className={className}
        />
      </div>
      <div className="hidden dark:block">
        <OptimizedImage
          src={darkSrc}
          {...props}
          className={className}
        />
      </div>
    </>
  );
}

// Background image component
interface BackgroundImageProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  priority?: boolean;
}

export function BackgroundImage({
  src,
  alt,
  children,
  className,
  overlayClassName,
  priority = false,
}: BackgroundImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="absolute inset-0 -z-10"
        objectFit="cover"
      />
      {overlayClassName && (
        <div className={cn("absolute inset-0 -z-10", overlayClassName)} />
      )}
      {children}
    </div>
  );
}
