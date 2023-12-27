"use client";
import { addIssue } from "@/actions/addIssue";
import { TextFieldRoot, TextFieldInput, TextArea, Button, CalloutRoot, CalloutText } from "@radix-ui/themes";
import React, { useState } from "react";

const NewIssuePage = () => {
    const [error, setError] = useState("");
    const clientAction = async (formData: FormData) => {
        const result = await addIssue(formData);
        if (result?.error) {
            setError(result?.error);
        }
    };

    return (
        <div className="max-w-xl">
            {error && (
                <CalloutRoot color="red" className="mb-5">
                    <CalloutText>{error}</CalloutText>
                </CalloutRoot>
            )}
            <form className="space-y-3" action={clientAction}>
                <TextFieldRoot>
                    <TextFieldInput placeholder="Title" name="title"></TextFieldInput>
                </TextFieldRoot>
                <TextArea placeholder="Description" size="3" name="description"></TextArea>
                <Button type="submit">Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
