"use client";

import { createIssueSchema } from "@/app/api/issues/route";
import Spinner from "@/app/components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import RichTextEditor from "../_components/RichTextEditor";

type IssueFormInputs = z.infer<typeof createIssueSchema>; // Used Zod for infering the type

const NewIssuePage = () => {
    // Router hook
    const router = useRouter();

    // Form validation using React Hook Form
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isSubmitted }, // // Form state for error handling
    } = useForm<IssueFormInputs>({
        defaultValues: { title: "", description: "" },
        resolver: zodResolver(createIssueSchema),
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
            console.log("Error creating issue", result);
        }
    };

    return (
        <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <TextField.Root placeholder="Title" {...register("title")}></TextField.Root>
            {errors.title && (
                <Text color="red" as="p">
                    {errors.title.message}
                </Text>
            )}
            <Controller
                name="description"
                control={control}
                render={({ field }) => <RichTextEditor placeholder="Description" {...field} />}
            />
            {errors.description && (
                <Text color="red" as="p">
                    {errors.description.message}
                </Text>
            )}
            <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />} </Button>
        </form>
    );
};

export default NewIssuePage;
