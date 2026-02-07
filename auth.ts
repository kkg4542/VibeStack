
import NextAuth, { DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Discord from "next-auth/providers/discord"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

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
