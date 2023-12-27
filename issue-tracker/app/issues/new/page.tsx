"use client";
import { addIssue } from "@/actions/addIssue";
import { TextFieldRoot, TextFieldInput, TextArea, Button } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
    const clientAction = async (formData: FormData) => {
        const result = await addIssue(formData);
        if (result?.error) {
            alert(result?.error);
        }
    };

    return (
        <form className="max-w-xl space-y-3" action={clientAction}>
            <TextFieldRoot>
                <TextFieldInput placeholder="Title" name="title"></TextFieldInput>
            </TextFieldRoot>
            <TextArea placeholder="Description" size="3" name="description"></TextArea>
            <Button type="submit">Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;
