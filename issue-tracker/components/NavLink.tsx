import NextLink from "next/link";
import {Link as RadixLink} from "@radix-ui/themes";

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