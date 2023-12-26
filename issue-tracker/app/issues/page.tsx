import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const Issues = () => {
    return (
        <>
            <Button>
                <Link href={"/issues/new"}>New Issue</Link>
            </Button>
        </>
    );
};

export default Issues;
