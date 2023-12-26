import { TextFieldRoot, TextFieldInput, TextArea, Button } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import React from "react";

const NewIssuePage = () => {
    const addIssue = async (formData: FormData) => {
        "use server";
        const title = formData.get("title");
        const description = formData.get("description");
        await fetch("http://localhost:3000/api/issues", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "API-Key": process.env.DATA_API_KEY!,
            },
            body: JSON.stringify({ title, description }),
        });
        redirect("/issues");
    };

    return (
        <form className="max-w-xl space-y-3" action={addIssue}>
            <TextFieldRoot>
                <TextFieldInput placeholder="Title" name="title"></TextFieldInput>
            </TextFieldRoot>
            <TextArea placeholder="Description" size="3" name="description"></TextArea>
            <Button type="submit">Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;
