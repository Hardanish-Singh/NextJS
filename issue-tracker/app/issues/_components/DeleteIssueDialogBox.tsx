"use client";

import { deleteIssue } from "@/actions/deleteIssue";
import Spinner from "@/components/Spinner";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogRoot,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
    Flex,
} from "@radix-ui/themes";
import { useState } from "react";

type Props = {
    id: number;
};

const DeleteIssueDialogBox: React.FC<Props> = ({ id }: Props) => {
    const [error, setError] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const clientAction = async () => {
        try {
            setIsSubmitting(true);
            await deleteIssue(id);
        } catch (err) {
            setIsSubmitting(false);
            setError(true);
        }
    };
    return (
        <>
            <AlertDialogRoot>
                <AlertDialogTrigger>
                    <Button color="red" disabled={isSubmitting}>
                        Delete Issue
                        {isSubmitting && <Spinner />}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the issue? This action cannot be undone
                    </AlertDialogDescription>
                    <Flex mt="4" gap="3">
                        <AlertDialogCancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction>
                            <Button color="red" onClick={clientAction}>
                                Delete Issue
                            </Button>
                        </AlertDialogAction>
                    </Flex>
                </AlertDialogContent>
            </AlertDialogRoot>
            <AlertDialogRoot open={error}>
                <AlertDialogContent>
                    <AlertDialogTitle>Error</AlertDialogTitle>
                    <AlertDialogDescription>Error during deletion of an issue</AlertDialogDescription>
                    <Button variant="soft" color="gray" mt="2" onClick={() => setError(false)}>
                        OK
                    </Button>
                </AlertDialogContent>
            </AlertDialogRoot>
        </>
    );
};

export default DeleteIssueDialogBox;
