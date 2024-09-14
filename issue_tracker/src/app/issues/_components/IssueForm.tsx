"use client";
import Spinner from "@/app/components/Spinner";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { addIssue } from "../../../../actions/addIssue";
import { editIssue } from "../../../../actions/editIssue";
import RichTextEditor from "./RichTextEditor";

type IssueFormInputs = z.infer<typeof createIssueSchema>; // Used Zod for infering the type

type Props = {
    issue?: Issue;
};

const IssueForm = ({ issue }: Props): React.JSX.Element => {
    // Form validation using React Hook Form
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }, // Form state for error handling
    } = useForm<IssueFormInputs>({
        defaultValues: { title: issue?.title || "", description: issue?.description || "" },
        resolver: zodResolver(createIssueSchema),
    });

    // State for custom error handling which zod/react hook form cannot handle
    const [error, setError] = useState({
        title: "",
        description: "",
    });

    // Form onSubmit Handler
    const onSubmit: SubmitHandler<IssueFormInputs> = async ({ title, description }) => {
        const result = !issue ? await addIssue(title, description) : await editIssue(title, description, issue?.id);
        console.log(result);
        if (result?.error) {
            setError((err) => ({
                ...err,
                title: result.error.title,
                description: result.error.description,
            }));
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
            {error.title && (
                <Text color="red" as="p">
                    {error.title}
                </Text>
            )}
            <Controller
                name="description"
                control={control}
                render={({ field }) => <RichTextEditor placeholder="Description" {...field} />}
            />
            {errors.description && (
                <Text color="red" as="p">
                    {errors?.description?.message}
                </Text>
            )}
            {error.description && (
                <Text color="red" as="p">
                    {error.description}
                </Text>
            )}
            <Button disabled={isSubmitting}>
                {issue ? "Edit Issue" : "Submit New Issue"}
                {isSubmitting && <Spinner />}
            </Button>
        </form>
    );
};

export default IssueForm;
