"use client";

import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const Navbar = () => {
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
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/">
                <FaBug />
            </Link>
            <ul className="flex space-x-6">
                {links.map(({ label, href }) => (
                    <li key={label}>
                        <Link
                            href={href}
                            className={classnames({
                                "text-zinc-900": currentPath === href,
                                "text-zinc-500": currentPath !== href,
                                "hover:text-zinc-800 transition-colors": true,
                            })}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
