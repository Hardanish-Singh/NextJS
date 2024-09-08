import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";

export const metadata: Metadata = {
    title: "Issue Tracker",
    description: "Issue Tracker",
};

type Props = {
    children: React.ReactNode;
};

const RootLayout = ({ children }: Props): React.JSX.Element => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
