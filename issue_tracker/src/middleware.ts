import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
    const session = await auth();
    if (!session && req.nextUrl.pathname === "/issues/new") {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    if (!session && /\/issues\/\d+\/edit/.test(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
}