import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./api/auth/Provider";
import ToasterContext from "./api/auth/ToasterContext";
import Navbar from "./components/Navbar";
import "./globals.css";

// Setup Inter Google Font and use it in the Application
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

// Setup Application Metadata
export const metadata: Metadata = {
    title: "Audio/Video Storytelling Web App",
    description: "Audio/Video Storytelling Web App",
};

const RootLayout = ({ children }: React.PropsWithChildren): React.JSX.Element => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.variable}>
                <AuthProvider>
                    <Navbar />
                    <main className="p-5">
                        <ToasterContext />
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
};

export default RootLayout;
