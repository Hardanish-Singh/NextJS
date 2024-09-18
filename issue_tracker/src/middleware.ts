import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
    const session = await auth();
    // Below will redirect to the login page for the following routes
    // Matches route with url pathname 'issues/new'
    if (!session && req.nextUrl.pathname === "/issues/new") {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    // Matches route with url pathname regex pattern 'issues/edit/:id'
    if (!session && /\/issues\/\d+\/edit/.test(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
}
