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

const IssueForm: React.FC<Props> = ({ issue }: Props): React.JSX.Element => {
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
        message: "",
    });

    // Form onSubmit Handler
    const onSubmit: SubmitHandler<IssueFormInputs> = async ({ title, description }) => {
        const result = !issue ? await addIssue(title, description) : await editIssue(title, description, issue?.id);
        if (result?.error) {
            setError((err) => ({
                ...err,
                message: result?.error?.message,
            }));
        }
    };

    return (
        <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <TextField.Root placeholder="Title" {...register("title")}></TextField.Root>
            {errors?.title?.message && <ErrorMessage errorMessage={errors?.title?.message} />}
            <Controller
                name="description"
                control={control}
                render={({ field }) => <RichTextEditor placeholder="Description" {...field} />}
            />
            {errors?.description?.message && <ErrorMessage errorMessage={errors?.description?.message} />}
            {error?.message && <ErrorMessage errorMessage={error?.message} />}
            <Button disabled={isSubmitting}>
                {issue ? "Edit Issue" : "Submit New Issue"}
                {isSubmitting && <Spinner />}
            </Button>
        </form>
    );
};

const ErrorMessage = ({ errorMessage }: { errorMessage: string }): React.JSX.Element => (
    <Text color="red" as="p">
        {errorMessage}
    </Text>
);

export default IssueForm;
