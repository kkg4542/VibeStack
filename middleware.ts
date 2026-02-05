import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // Protect /admin routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
        const basicAuth = req.headers.get("authorization");

        if (basicAuth) {
            const authValue = basicAuth.split(" ")[1];
            const [user, pwd] = atob(authValue).split(":");

            // TODO: Move these credentials to secure environment variables in production
            // Make sure to set ADMIN_USER and ADMIN_PASSWORD in your .env file
            const validUser = process.env.ADMIN_USER || "admin";
            const validPwd = process.env.ADMIN_PASSWORD || "admin123";

            if (user === validUser && pwd === validPwd) {
                return NextResponse.next();
            }
        }

        return new NextResponse("Authentication required", {
            status: 401,
            headers: {
                "WWW-Authenticate": 'Basic realm="Secure Admin Area"',
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
