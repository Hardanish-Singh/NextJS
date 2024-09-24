"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

type deleteIssue = {
    error: {
        message: string;
    };
};

export const deleteIssue = async (id: number): Promise<deleteIssue> => {
    const session = await auth();
    const response = await fetch(`${process.env.AUTH_TRUST_HOST}/api/issues/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "API-Key": process.env.DATA_API_KEY!,
        },
        body: JSON.stringify({
            session,
        }),
        cache: "no-cache",
    });
    const result = await response.json();
    if (result.status === 201) {
        redirect("/issues");
    } else {
        return {
            error: {
                message: result?.data?.message,
            },
        };
    }
};
