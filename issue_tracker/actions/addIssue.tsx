"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

type addIssue = {
    error: {
        message: string;
    };
};

export const addIssue = async (title: string, description: any): Promise<addIssue> => {
    const session = await auth();
    const response = await fetch(`${process.env.AUTH_TRUST_HOST}/api/issues`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "API-Key": process.env.DATA_API_KEY!,
        },
        body: JSON.stringify({ title, description, session }),
        cache: "no-cache",
    });
    const result = await response.json();
    if (result.status !== 201) {
        return {
            error: {
                message: result?.data?.message || "",
            },
        };
    } else {
        redirect("/issues");
    }
};
