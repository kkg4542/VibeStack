import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { reelShortcode } from "@/components/blog/InstagramReelCard";
import { postsKo } from "@/lib/blog-data-ko";

/**
 * Instagram / Threads bio link (@vibestack.ai). Lists every reel companion post,
 * newest first, so a viewer who saw "정리본은 프로필 링크에서" lands one tap away.
 */
export const metadata: Metadata = {
    title: "vibestack.ai 정리본 모음",
    description: "@vibestack.ai 인스타그램 릴스·카드뉴스에서 약속한 정리본을 한곳에 모았어요.",
    alternates: { canonical: "/links" },
};

export default function LinksPage() {
    return (
        <div lang="ko" className="min-h-svh break-keep bg-background pb-20 pt-28">
            <Container size="xs">
                <h1 className="mb-3 text-[30px] font-extrabold leading-snug">vibestack.ai 정리본</h1>
                <p className="mb-10 text-[17px] leading-relaxed text-muted-foreground">
                    릴스에서 말씀드린 내용을 글로 정리해 두었어요. 보신 릴스를 눌러 주세요.
                </p>
                <ul className="space-y-3">
                    {postsKo.map((post) => {
                        const code = post.reel?.url ? reelShortcode(post.reel.url) : null;
                        return (
                            <li key={post.slug}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="flex min-h-11 items-center gap-4 border border-border bg-card p-3 transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-link"
                                >
                                    <div className="relative h-[96px] w-[54px] shrink-0 overflow-hidden rounded-md bg-secondary">
                                        <Image
                                            src={code ? `/images/reels/${code}.jpg` : post.image}
                                            alt=""
                                            fill
                                            sizes="54px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[17px] font-bold leading-snug text-foreground">{post.title}</p>
                                        <p className="mt-1 text-[14px] text-muted-foreground">{post.date}</p>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <p className="mt-10 text-[15px] text-muted-foreground">
                    <a
                        href="https://www.instagram.com/vibestack.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline underline-offset-4"
                    >
                        인스타그램 @vibestack.ai
                    </a>
                    {" · "}
                    <a
                        href="https://www.threads.com/@vibestack.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline underline-offset-4"
                    >
                        스레드
                    </a>
                </p>
            </Container>
        </div>
    );
}
