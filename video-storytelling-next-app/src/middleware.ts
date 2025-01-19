import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
    const session = await auth();
    // Below will redirect to the login page for the following routes if the user is not authenticated
    if (!session && req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
}
