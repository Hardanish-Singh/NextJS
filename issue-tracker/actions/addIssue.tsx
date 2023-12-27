"use server";
import { redirect } from "next/navigation";

export const addIssue = async (formData: FormData) => {
    const title = formData.get("title");
    const description = formData.get("description");
    const response = await fetch("http://127.0.0.1:3000/api/issues", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "API-Key": process.env.DATA_API_KEY!,
        },
        body: JSON.stringify({ title, description }),
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
