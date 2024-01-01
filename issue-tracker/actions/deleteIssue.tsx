"use server";
import { redirect } from "next/navigation";

export const deleteIssue = async (id: number) => {
    const response = await fetch(`http://127.0.0.1:3000/api/issues/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "API-Key": process.env.DATA_API_KEY!,
        },
    });
    const result = await response.json();
    if (result.status === 201) {
        redirect("/issues");
    }
};
