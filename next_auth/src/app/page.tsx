"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
    const { status, data: session } = useSession();

    return (
        <>
            {status === "loading" && <>Loading</>}
            {status === "authenticated" && (
                <>
                    <p>Hello {session?.user?.name}</p>
                    <Link href="/api/auth/signout">Log Out</Link>
                </>
            )}
            {status === "unauthenticated" && <Link href="/login">Log In</Link>}
        </>
    );
}
