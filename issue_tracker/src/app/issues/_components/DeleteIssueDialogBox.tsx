"use client";

import Spinner from "@/app/components/Spinner";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { deleteIssue } from "../../../../actions/deleteIssue";

type Props = {
    id: number;
};

const DeleteIssueDialogBox: React.FC<Props> = ({ id }: Props): React.JSX.Element => {
    const [error, setError] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const clientAction = async () => {
        try {
            setIsSubmitting(true);
            const result = await deleteIssue(id);
            if (result.error.message) {
                setError(true);
            }
        } catch (err) {
            setIsSubmitting(false);
            setError(true);
        }
    };

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" disabled={isSubmitting}>
                        Delete Issue
                        {isSubmitting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want to delete the issue? This action cannot be undone
                    </AlertDialog.Description>
                    <Flex mt="4" gap="3">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color="red" onClick={clientAction}>
                                Delete Issue
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>Error during deletion of an issue</AlertDialog.Description>
                    <Button
                        variant="soft"
                        color="gray"
                        mt="2"
                        onClick={() => {
                            setError(false);
                            setIsSubmitting(false);
                        }}
                    >
                        OK
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
};

export default DeleteIssueDialogBox;
