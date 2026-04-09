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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      
      <Card className="w-full max-w-md relative z-10 border-border/50 shadow-2xl shadow-vibe-electric/10 bg-card/80 backdrop-blur-xl">
        <form action={formAction}>
          <CardHeader className="space-y-3 text-center pt-8">
            <div className="mx-auto w-12 h-12 rounded-xl bg-vibe-electric/10 flex items-center justify-center border border-vibe-electric/20">
              <Shield className="w-6 h-6 text-vibe-electric" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">VibeStack Admin</CardTitle>
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
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="bg-background/50"
              />
            </div>
            
            {state?.error && (
              <div className="p-3 text-sm rounded-md bg-destructive/10 text-destructive border border-destructive/20 font-medium">
                {state.error}
              </div>
            )}
          </CardContent>
          <CardFooter className="pb-8 pt-2">
            <Button 
              type="submit" 
              className="w-full font-medium" 
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
