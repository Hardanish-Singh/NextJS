import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";

type Props = {
    href: string,
    children: string,
}

const NavLink = ({href, children}: Props) => (
    <NextLink href={href} passHref legacyBehavior>
        <RadixLink>{children}</RadixLink>
    </NextLink>
);

export default NavLink;