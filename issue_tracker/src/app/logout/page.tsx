"use client";

import { Button } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

const SignOut = () => {
    return (
        <>
            <p>Custom Sign Out Page</p>
            <Button
                onClick={async () => {
                    await signOut({
                        callbackUrl: "/",
                        redirect: true,
                    });
                }}
            >
                Sign Out
            </Button>
        </>
    );
};

export default SignOut;
