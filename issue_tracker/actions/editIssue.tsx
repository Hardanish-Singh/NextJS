"use server";
import { redirect } from "next/navigation";

type editIssue = {
    error: {
        title: any;
        description: any;
    };
};

export const editIssue = async (title: string, description: any, id: number): Promise<editIssue> => {
    const response = await fetch(`http://localhost:3000/api/issues/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "API-Key": process.env.DATA_API_KEY!,
        },
        body: JSON.stringify({ title, description }),
        cache: "no-cache",
    });
    const result = await response.json();
    if (result.status != 201) {
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
