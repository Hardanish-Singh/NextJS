"use server";
import { redirect } from "next/navigation";

export const addIssue = async (formData: FormData) => {
    const title = formData.get("title");
    const description = formData.get("description");
    try {
        await fetch("http://localhost:3000/api/issues", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "API-Key": process.env.DATA_API_KEY!,
            },
            body: JSON.stringify({ title, description }),
        });
        redirect("/issues");
    } catch (error) {
        console.log(error);
        return {
            error: "Something went Wrong",
        };
    }
};
