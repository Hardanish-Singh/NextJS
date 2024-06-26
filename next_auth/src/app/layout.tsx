import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./api/auth/Provider";
import ToasterContext from "./api/auth/ToasterContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <main className="p-5">
                        <ToasterContext />
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
}
