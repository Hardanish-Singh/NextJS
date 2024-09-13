"use server";

import { redirect } from "next/navigation";

type addIssue = {
    error: {
        title: any;
        description: any;
    };
};

export const addIssue = async (title: string, description: any): Promise<addIssue> => {
    const response = await fetch("http://localhost:3000/api/issues", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "API-Key": process.env.DATA_API_KEY!,
        },
        body: JSON.stringify({ title, description }),
        cache: "no-cache",
    });
    const result = await response.json();
    if (result.status !== 201) {
        return {
            error: {
                title: result?.data?.title || "",
                description: result?.data?.description || "",
            },
        };
    } else {
        redirect("/issues");
    }
};
