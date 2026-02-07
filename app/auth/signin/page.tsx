"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { signIn, useSession } from "next-auth/react";
import { 
    Sparkles, 
    Heart, 
    Star, 
    Bookmark, 
    MessageSquare, 
    ArrowRight,
    Shield,
    Zap,
    CheckCircle2,
    Lock
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import * as motion from "framer-motion/client";

const benefits = [
    {
        icon: Bookmark,
        title: "Save Favorites",
        description: "Bookmark your favorite AI tools and stacks for quick access."
    },
    {
        icon: Star,
        title: "Write Reviews",
        description: "Share your experience and help others find the best tools."
    },
    {
        icon: MessageSquare,
        title: "Join Community",
        description: "Connect with other developers and share recommendations."
    },
    {
        icon: Zap,
        title: "Personalized",
        description: "Get AI-powered tool recommendations based on your interests."
    }
];

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    const handleSocialLogin = async (provider: string) => {
        setIsLoading(provider);
        try {
            await signIn(provider, { callbackUrl: "/" });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(null);
        }
    };

    const handleGuestMode = () => {
        // Store guest mode preference
        localStorage.setItem('vibestack-guest-mode', 'true');
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 h-[60vh] w-full max-w-[1400px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[140px]" />
            <div className="absolute top-[20%] left-[10%] z-0 h-[30vh] w-[30vh] bg-purple-500/10 blur-[100px] rounded-full" />
            <div className="absolute top-[40%] right-[10%] z-0 h-[30vh] w-[30vh] bg-pink-500/10 blur-[100px] rounded-full" />
            
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative z-10 w-full max-w-5xl">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="hidden lg:block"
                    >
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
                                <Sparkles className="w-4 h-4" />
                                <span>Join the Community</span>
                            </div>
                            <h1 className="text-4xl font-bold mb-4">
                                Unlock the Full{" "}
                                <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                                    VibeStack
                                </span>{" "}
                                Experience
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Join thousands of developers discovering the best AI tools for their workflow.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {benefits.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <motion.div
                                        key={benefit.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                    >
                                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-indigo-500/30 transition-colors group">
                                            <CardContent className="p-4 flex items-start gap-4">
                                                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            className="mt-8 flex items-center gap-6"
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {['DK', 'JS', 'MR'].map((initials, i) => (
                                        <div 
                                            key={i} 
                                            className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white border-2 border-background"
                                        >
                                            {initials}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">+2,500 developers</span>
                            </div>
                            <div className="h-4 w-px bg-border" />
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                ))}
                                <span className="text-sm text-muted-foreground ml-1">4.9/5</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Sign In Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl">
                            <CardContent className="p-8">
                                {/* Logo & Title */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex p-3 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-500 mb-4 shadow-lg shadow-indigo-500/20">
                                        <Sparkles className="h-8 w-8 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                                    <p className="text-muted-foreground">
                                        Sign in to access your favorites and personalized recommendations
                                    </p>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                                    >
                                        {error === "OAuthAccountNotLinked"
                                            ? "This email is already associated with another account. Please sign in with the original provider."
                                            : "An error occurred during sign in. Please try again."}
                                    </motion.div>
                                )}

                                {/* Social Login Buttons */}
                                <div className="space-y-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleSocialLogin("google")}
                                        disabled={isLoading !== null}
                                        className="w-full h-12 rounded-xl relative overflow-hidden transition-all hover:bg-white/5 hover:border-white/20 group"
                                    >
                                        {isLoading === "google" ? (
                                            <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                                        ) : (
                                            <>
                                                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                    />
                                                    <path
                                                        fill="currentColor"
                                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                    />
                                                    <path
                                                        fill="currentColor"
                                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                    />
                                                    <path
                                                        fill="currentColor"
                                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                    />
                                                </svg>
                                                Continue with Google
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={() => handleSocialLogin("github")}
                                        disabled={isLoading !== null}
                                        className="w-full h-12 rounded-xl relative overflow-hidden transition-all hover:bg-white/5 hover:border-white/20"
                                    >
                                        {isLoading === "github" ? (
                                            <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                                        ) : (
                                            <>
                                                <svg className="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                </svg>
                                                Continue with GitHub
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={() => handleSocialLogin("discord")}
                                        disabled={isLoading !== null}
                                        className="w-full h-12 rounded-xl relative overflow-hidden transition-all hover:bg-white/5 hover:border-white/20"
                                    >
                                        {isLoading === "discord" ? (
                                            <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                                        ) : (
                                            <>
                                                <svg className="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                                                </svg>
                                                Continue with Discord
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-border" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-card px-2 text-muted-foreground">Or</span>
                                    </div>
                                </div>

                                {/* Guest Mode */}
                                <Button
                                    variant="ghost"
                                    onClick={handleGuestMode}
                                    className="w-full h-12 rounded-xl"
                                >
                                    Continue as Guest
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>

                                {/* Terms */}
                                <p className="mt-6 text-center text-xs text-muted-foreground">
                                    By clicking continue, you agree to our{" "}
                                    <Link href="/terms" className="underline hover:text-foreground">Terms of Service</Link>
                                    {" "}and{" "}
                                    <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
                                </p>

                                {/* Security Badge */}
                                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                    <Shield className="h-4 w-4" />
                                    <span>Secured with industry-standard encryption</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Mobile Benefits (visible only on mobile) */}
                        <div className="lg:hidden mt-8">
                            <div className="grid grid-cols-2 gap-3">
                                {benefits.slice(0, 4).map((benefit) => {
                                    const Icon = benefit.icon;
                                    return (
                                        <div key={benefit.title} className="flex items-center gap-2 text-sm">
                                            <Icon className="h-4 w-4 text-indigo-400" />
                                            <span className="text-muted-foreground">{benefit.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
