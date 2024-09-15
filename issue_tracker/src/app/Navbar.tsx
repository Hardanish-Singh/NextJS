"use client";

import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classnames from "classnames";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import Spinner from "./components/Spinner";

// Navigation Links
const links: Array<{
    label: string;
    href: string;
}> = [
    {
        label: "Dashboard",
        href: "/",
    },
    {
        label: "Issues",
        href: "/issues",
    },
];

const Navbar = (): React.JSX.Element => {
    const { status, data: session } = useSession();
    const currentPath = usePathname(); // usePathname is used for getting the current path

    const handleSignOut = async (): Promise<void> => {
        await signOut({
            callbackUrl: "/",
            redirect: true,
        });
    };

    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Flex justify="between" className="w-full">
                <Flex align="center" gap="3">
                    <Link href="/">
                        <FaBug />
                    </Link>
                    <div className="flex space-x-6">
                        {links.map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                className={
                                    // classnames is a javascript utility for conditionally joining classNames together
                                    classnames({
                                        "text-zinc-900": currentPath === href,
                                        "text-zinc-500": currentPath !== href,
                                        "hover:text-zinc-800 transition-colors": true,
                                    })
                                }
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </Flex>
                <Box>
                    {status === "loading" && <Spinner />}
                    {status === "authenticated" && (
                        <>
                            {session && session.user && session.user.image ? (
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger>
                                        <Avatar
                                            src={session.user!.image!}
                                            fallback="?"
                                            size="2"
                                            radius="full"
                                            className="cursor-pointer"
                                        />
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content>
                                        <DropdownMenu.Label>
                                            <Text size="2">{session.user!.email}</Text>
                                        </DropdownMenu.Label>
                                        <DropdownMenu.Item>
                                            {/* <Link href="/api/auth/signout">Log Out</Link> */}
                                            {/* <Link href="/logout">Log Out</Link> */}
                                            <Text size="2" className="cursor-pointer w-full" onClick={handleSignOut}>
                                                Sign Out
                                            </Text>
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            ) : (
                                // <Link href="/api/auth/signout">Log Out</Link>
                                // <Link href="/logout">Log Out</Link>
                                <Text size="2" className="cursor-pointer w-full" onClick={handleSignOut}>
                                    Sign Out
                                </Text>
                            )}
                        </>
                    )}
                    {status === "unauthenticated" && <Link href="/login">Log In</Link>}
                </Box>
            </Flex>
        </nav>
    );
};

export default Navbar;
