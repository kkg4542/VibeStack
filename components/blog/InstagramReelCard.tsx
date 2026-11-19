import Image from "next/image";

/**
 * Reel companion posts: a 9:16 cover of the reel with a play button that opens
 * the reel on Instagram (new tab). No third-party script or iframe — the cover
 * is the reel's own thumbnail, stored at /images/reels/<shortcode>.jpg.
 */

/** Canonical https://www.instagram.com/reel/<id>/ (drops the profile segment and query). */
export function toReelPermalink(url: string): string {
    const m = url.match(/instagram\.com\/(?:[^/]+\/)?(reel|p)\/([A-Za-z0-9_-]+)/);
    return m ? `https://www.instagram.com/${m[1]}/${m[2]}/` : url;
}

export function reelShortcode(url: string): string | null {
    const m = url.match(/instagram\.com\/(?:[^/]+\/)?(?:reel|p)\/([A-Za-z0-9_-]+)/);
    return m ? m[1] : null;
}

export function InstagramReelCard({ url, title }: { url: string; title: string }) {
    const href = toReelPermalink(url);
    const code = reelShortcode(url);

    return (
        <div className="mb-12 flex justify-center">
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`인스타그램에서 릴스 보기: ${title}`}
                className="group relative block w-full max-w-[340px] overflow-hidden rounded-2xl bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vibe-link"
            >
                <div className="relative aspect-[9/16] w-full">
                    {code && (
                        <Image
                            src={`/images/reels/${code}.jpg`}
                            alt=""
                            fill
                            priority
                            sizes="340px"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/25" />
                    <div className="absolute left-3 top-3 flex items-center gap-2 text-[14px] font-semibold text-white">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm" aria-hidden="true">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                            </svg>
                        </span>
                        @vibestack.ai
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover:scale-110">
                            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 text-black" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 text-[15px] font-semibold text-white">
                        인스타그램에서 릴스 보기 →
                    </div>
                </div>
            </a>
        </div>
    );
}
