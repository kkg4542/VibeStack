import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
            <div className="max-w-md w-full text-center">
                {/* 404 Animation */}
                <div className="relative mb-8">
                    <div className="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-b from-indigo-500/20 to-indigo-500/5">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl">🔍</div>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-4 text-foreground">
                    Page Not Found
                </h1>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                    It might have been moved or deleted.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild variant="default" className="rounded-full">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>

                    <Button asChild variant="outline" className="rounded-full">
                        <Link href="/tools">
                            <Search className="mr-2 h-4 w-4" />
                            Browse Tools
                        </Link>
                    </Button>
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                        Looking for something specific?
                    </p>
                    <Link
                        href="/build"
                        className="text-sm text-indigo-500 hover:text-indigo-400 transition-colors inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4 rotate-180" />
                        Try our AI Stack Finder
                    </Link>
                </div>
            </div>
        </main>
    );
}
