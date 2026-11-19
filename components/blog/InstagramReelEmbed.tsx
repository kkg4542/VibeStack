"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
    interface Window {
        instgrm?: { Embeds: { process: () => void } };
    }
}

/**
 * Official Instagram embed (blockquote + embed.js) for reel companion posts.
 * embed.js swaps the blockquote for an iframe from www.instagram.com, which is
 * allowed in next.config.ts (script-src / frame-src). Until the script loads,
 * the blockquote shows a plain link to the reel, so it degrades to a link.
 */
/**
 * embed.js only resolves the canonical form. Profile-scoped links
 * (instagram.com/<user>/reel/<id>/, what the share sheet often gives) render a
 * "page isn't available" frame, so normalize to instagram.com/reel/<id>/.
 */
export function toEmbedPermalink(url: string): string {
    const m = url.match(/instagram\.com\/(?:[^/]+\/)?(reel|p)\/([A-Za-z0-9_-]+)/);
    return m ? `https://www.instagram.com/${m[1]}/${m[2]}/` : url;
}

export function InstagramReelEmbed({ url: rawUrl }: { url: string }) {
    const url = toEmbedPermalink(rawUrl);
    // Re-run on client-side navigation: the script is already loaded, so
    // onLoad won't fire again for the new blockquote.
    useEffect(() => {
        window.instgrm?.Embeds.process();
    }, [url]);

    return (
        <div className="mb-12 flex justify-center">
            <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{ width: "100%", maxWidth: 540, minWidth: 280, margin: 0 }}
            >
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
                >
                    인스타그램에서 릴스 보기
                </a>
            </blockquote>
            <Script
                src="https://www.instagram.com/embed.js"
                strategy="lazyOnload"
                onLoad={() => window.instgrm?.Embeds.process()}
            />
        </div>
    );
}
