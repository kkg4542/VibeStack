
import NextAuth, { DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Discord from "next-auth/providers/discord"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
        } & DefaultSession["user"]
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        GitHub({
            clientId: process.env.GH_CLIENT_ID ?? "",
            clientSecret: process.env.GH_CLIENT_SECRET ?? "",
        }),
        Discord({
            clientId: process.env.DISCORD_CLIENT_ID ?? "",
            clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
        }),
    ],
    session: {
        // Session expires after 30 days of inactivity
        maxAge: 30 * 24 * 60 * 60, // 30 days
        // Update session every 24 hours to keep it active
        updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        async session({ session, user }) {
            if (session.user && user) {
                session.user.id = user.id;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin', // Optional: Custom sign-in page if needed later
    }
})
