"use client";

import { Button, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import RichTextEditor from "../_components/RichTextEditor";

type IssueFormInputs = {
    title: string;
    description: string;
};

const NewIssuePage = () => {
    // Router hook
    const router = useRouter();

    // State for form error handling
    const [error, setError] = useState({
        title: "",
        description: "",
    });

    // Form validation using React Hook Form
    const { register, handleSubmit, control } = useForm<IssueFormInputs>({
        defaultValues: { title: "", description: "" },
    });

    // Form onSubmit Handler
    const onSubmit: SubmitHandler<IssueFormInputs> = async ({ title, description }) => {
        const response = await fetch("http://localhost:3000/api/issues", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "API-Key": process.env.DATA_API_KEY!,
            },
            body: JSON.stringify({ title, description }),
            cache: "no-cache",
        });
        const result = await response.json();
        if (result.status === 201) {
            router.push("/issues");
        } else {
            setError((err) => ({
                ...err,
                title: result?.data?.title?._errors?.[0] ?? "",
                description: result?.data?.description?._errors?.[0] ?? "",
            }));
        }
    };

    return (
        <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <TextField.Root placeholder="Title" {...register("title")}></TextField.Root>
            <Text color="red" as="p">
                {error.title}
            </Text>
            <Controller
                name="description"
                control={control}
                render={({ field }) => <RichTextEditor placeholder="Description" {...field} />}
            />
            <Text color="red" as="p">
                {error.description}
            </Text>
            <Button>Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;
