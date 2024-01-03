"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => (
    <SessionProvider>{children}</SessionProvider>
);

export default AuthProvider;
