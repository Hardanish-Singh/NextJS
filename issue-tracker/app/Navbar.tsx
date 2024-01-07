"use client";

import Spinner from "@/components/Spinner";
import {
    Avatar,
    Box,
    Container,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRoot,
    DropdownMenuTrigger,
    Flex,
    Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const Navbar = () => {
    const { status, data: session } = useSession();
    const currentPath = usePathname();
    const links = [
        {
            label: "Dashboard",
            href: "/",
        },
        {
            label: "Issues",
            href: "/issues",
        },
    ];
    return (
        <nav className="border-b mb-5 px-5 py-3">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/">
                            <FaBug />
                        </Link>
                        <ul className="flex space-x-6">
                            {links.map(({ label, href }) => (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        className={classnames({
                                            "text-zinc-900":
                                                currentPath === href,
                                            "text-zinc-500":
                                                currentPath !== href,
                                            "hover:text-zinc-800 transition-colors":
                                                true,
                                        })}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Flex>
                    <Box>
                        {status === "loading" && <Spinner />}
                        {status === "authenticated" && (
                            <>
                                {session &&
                                session.user &&
                                session.user.image ? (
                                    <DropdownMenuRoot>
                                        <DropdownMenuTrigger>
                                            <Avatar
                                                src={session.user!.image!}
                                                fallback="?"
                                                size="2"
                                                radius="full"
                                                className="cursor-pointer"
                                            />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>
                                                <Text size="2">
                                                    {session.user!.email}
                                                </Text>
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <Link href="/api/auth/signout">
                                                    Log Out
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenuRoot>
                                ) : (
                                    <Link href="/api/auth/signout">
                                        Log Out
                                    </Link>
                                )}
                            </>
                        )}
                        {status === "unauthenticated" && (
                            <Link href="/auth/signIn">Log In</Link>
                        )}
                    </Box>
                </Flex>
            </Container>
        </nav>
    );
};

export default Navbar;
