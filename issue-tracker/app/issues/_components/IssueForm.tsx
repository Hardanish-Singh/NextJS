"use client";

import { addIssue } from "@/actions/addIssue";
import { editIssue } from "@/actions/editIssue";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { Issue } from "@prisma/client";
import { Button, TextArea, TextFieldInput, TextFieldRoot } from "@radix-ui/themes";
import { useRef, useState } from "react";

type Props = {
    issue?: Issue;
};

const IssueForm = ({ issue }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState({
        title: "",
        description: "",
    });
    const ref = useRef<HTMLFormElement>(null);
    const clientAction = async (formData: FormData) => {
        setIsSubmitting(true);
        const result = !issue ? await addIssue(formData) : await editIssue(formData, issue?.id);
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
                    <TextFieldInput
                        defaultValue={error.title ? "" : issue?.title}
                        placeholder="Title"
                        name="title"
                    ></TextFieldInput>
                </TextFieldRoot>
                <ErrorMessage>{error.title}</ErrorMessage>
                <TextArea
                    defaultValue={error.description ? "" : issue?.description}
                    placeholder="Description"
                    size="3"
                    name="description"
                ></TextArea>
                <ErrorMessage>{error.description}</ErrorMessage>
                <Button type="submit" disabled={isSubmitting}>
                    {issue ? "Edit Issue" : "Submit New Issue"}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default IssueForm;
