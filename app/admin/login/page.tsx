"use client";

import { useActionState } from "react";
import { adminLogin } from "../actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(adminLogin, { error: null });

  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-4">
      
      <Card className="relative z-10 w-full max-w-md bg-card">
        <form action={formAction}>
          <CardHeader className="space-y-3 text-center pt-8">
            <Shield aria-hidden="true" className="mx-auto h-8 w-8 text-vibe-link" />
            <CardTitle className="font-display text-[40px] uppercase leading-[0.9] tracking-[-0.005em]">VibeStack Admin</CardTitle>
            <CardDescription>
              Enter your credentials to access the management panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                name="username" 
                type="text" 
                placeholder="admin" 
                required 
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="bg-background"
              />
            </div>
            
            {state?.error && (
              <div className="bg-destructive/10 p-3 text-[15px] font-medium text-destructive">
                {state.error}
              </div>
            )}
          </CardContent>
          <CardFooter className="pb-8 pt-2">
            <Button 
              type="submit" 
              className="h-11 w-full rounded-none font-semibold" 
              disabled={isPending}
            >
              {isPending ? "Authenticating..." : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
