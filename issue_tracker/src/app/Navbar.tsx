"use client";

import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

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
    const currentPath = usePathname(); // usePathname is used for getting the current path
    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
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
        </nav>
    );
};

export default Navbar;
