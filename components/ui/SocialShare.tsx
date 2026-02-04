"use client";

import { Button } from "@/components/ui/button";
import { Share2, Twitter, Linkedin, Facebook, Link2, Check } from "lucide-react";
import { useState } from "react";
import { trackSocialShare } from "@/lib/analytics";

interface SocialShareProps {
  toolSlug: string;
  toolName: string;
  url: string;
}

export function SocialShare({ toolSlug, toolName, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `Check out ${toolName} - an amazing AI tool for developers!`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
    trackSocialShare(platform, toolSlug);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackSocialShare("copy_link", toolSlug);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Share2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Share this tool</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]"
          onClick={() => handleShare("twitter")}
        >
          <Twitter className="h-4 w-4" />
          Tweet
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-[#0A66C2]/30 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"
          onClick={() => handleShare("linkedin")}
        >
          <Linkedin className="h-4 w-4" />
          Share
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-[#1877F2]/30 hover:bg-[#1877F2]/10 hover:text-[#1877F2]"
          onClick={() => handleShare("facebook")}
        >
          <Facebook className="h-4 w-4" />
          Share
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handleCopyLink}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              Copy Link
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
