"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

type editIssue = {
    error: {
        message: string;
    };
};

export const editIssue = async (title: string, description: any, id: number): Promise<editIssue> => {
    const session = await auth();
    const response = await fetch(`${process.env.AUTH_TRUST_HOST}/api/issues/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "API-Key": process.env.DATA_API_KEY!,
        },
        body: JSON.stringify({ title, description, session }),
        cache: "no-cache",
    });
    const result = await response.json();
    if (result.status != 201) {
        return {
            error: {
                message: result?.data?.message || "",
            },
        };
    } else {
        redirect("/issues");
    }
};
