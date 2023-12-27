"use client";
import { addIssue } from "@/actions/addIssue";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { TextFieldRoot, TextFieldInput, TextArea, Button } from "@radix-ui/themes";
import React, { useState, useRef } from "react";

const NewIssuePage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState({
        title: "",
        description: "",
    });
    const ref = useRef<HTMLFormElement>(null);
    const clientAction = async (formData: FormData) => {
        setIsSubmitting(true);
        const result = await addIssue(formData);
        ref.current?.reset();
        if (result?.error) {
            setError((err) => ({
                ...err,
                title: result?.error?.title?._errors?.[0] ?? "",
                description: result?.error?.description?._errors?.[0] ?? "",
            }));
        }
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-xl">
            <form className="space-y-3" ref={ref} action={clientAction}>
                <TextFieldRoot>
                    <TextFieldInput placeholder="Title" name="title"></TextFieldInput>
                </TextFieldRoot>
                <ErrorMessage>{error.title}</ErrorMessage>
                <TextArea placeholder="Description" size="3" name="description"></TextArea>
                <ErrorMessage>{error.description}</ErrorMessage>
                <Button type="submit" disabled={isSubmitting}>
                    Submit New Issue
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
