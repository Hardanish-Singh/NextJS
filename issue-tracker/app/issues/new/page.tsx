"use client";
import { addIssue } from "@/actions/addIssue";
import { TextFieldRoot, TextFieldInput, TextArea, Button, Text } from "@radix-ui/themes";
import React, { useState } from "react";

const NewIssuePage = () => {
    const [error, setError] = useState({
        title: "",
        description: "",
    });
    const clientAction = async (formData: FormData) => {
        const result = await addIssue(formData);
        if (result?.error) {
            setError((err) => ({
                ...err,
                title: result?.error?.title?._errors?.[0] ?? "",
                description: result?.error?.description?._errors?.[0] ?? "",
            }));
        }
    };

    return (
        <div className="max-w-xl">
            <form className="space-y-3" action={clientAction}>
                <TextFieldRoot>
                    <TextFieldInput placeholder="Title" name="title"></TextFieldInput>
                </TextFieldRoot>
                {error.title && (
                    <Text color="red" as="p">
                        {error.title}
                    </Text>
                )}
                <TextArea placeholder="Description" size="3" name="description"></TextArea>
                {error.description && (
                    <Text color="red" as="p">
                        {error.description}
                    </Text>
                )}
                <Button type="submit">Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
