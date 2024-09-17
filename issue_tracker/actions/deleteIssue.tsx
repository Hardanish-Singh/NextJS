"use server";

import { redirect } from "next/navigation";

type deleteIssue = {
    error: string;
};

export const deleteIssue = async (id: number): Promise<deleteIssue> => {
    const response = await fetch(`http://localhost:3000/api/issues/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "API-Key": process.env.DATA_API_KEY!,
        },
        cache: "no-cache",
    });
    const result = await response.json();
    if (result.status === 201) {
        redirect("/issues");
    } else {
        return {
            error: result.data,
        };
    }
};
