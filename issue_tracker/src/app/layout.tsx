import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import AuthProvider from "./api/auth/Provider";
import ToasterContext from "./api/auth/ToasterContext";
import "./globals.css";
import Navbar from "./Navbar";
import "./theme-config.css";

// Setup Inter Google Font and use it in the Application
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

// Setup Application Metadata
export const metadata: Metadata = {
    title: "Issue Tracker",
    description: "Issue Tracker",
};

const RootLayout = ({ children }: React.PropsWithChildren): React.JSX.Element => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.variable}>
                <AuthProvider>
                    <Theme appearance="light" accentColor="violet">
                        <Navbar />
                        <main className="p-5">
                            <ToasterContext />
                            {children}
                        </main>
                    </Theme>
                </AuthProvider>
            </body>
        </html>
    );
};

export default RootLayout;
