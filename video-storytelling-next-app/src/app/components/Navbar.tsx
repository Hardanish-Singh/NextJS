"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar: React.FC = (): React.JSX.Element => {
    const { status } = useSession();

    const handleSignOut = async () => {
        await signOut({
            callbackUrl: "/",
            redirect: true,
        });
    };

    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 justify-end items-center">
            {status === "loading" && <>Loading...</>}
            {status === "authenticated" && <button onClick={handleSignOut}>Sign Out</button>}
            {status === "unauthenticated" && <Link href="/login">Log In</Link>}
        </nav>
    );
};

export default Navbar;
