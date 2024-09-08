import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import "./theme-config.css";

// Setup Inter Google Font and use it in the Application
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

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
            <body className={inter.variable}>
                <Theme appearance="light" accentColor="violet">
                    <Navbar />
                    <main className="p-5">{children}</main>
                </Theme>
            </body>
        </html>
    );
};

export default RootLayout;
