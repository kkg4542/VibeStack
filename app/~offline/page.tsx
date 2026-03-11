import { WifiOff, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Offline | VibeStack",
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <WifiOff className="h-10 w-10 text-muted-foreground" />
      </div>
      
      <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        You are offline
      </h1>
      <p className="mt-4 max-w-md text-base text-muted-foreground">
        It looks like you&apos;ve lost your internet connection. We&apos;ll automatically reconnect when your network comes back online.
      </p>
      
      <div className="mt-8 flex gap-4">
        <Button asChild variant="default">
          <a href=".">Try again</a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Go home
          </Link>
        </Button>
      </div>
    </div>
  );
}
