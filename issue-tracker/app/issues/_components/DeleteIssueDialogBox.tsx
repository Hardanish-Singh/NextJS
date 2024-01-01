"use client";
import { deleteIssue } from "@/actions/deleteIssue";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger, AlertDialogDescription, AlertDialogTitle, AlertDialogRoot, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";

const DeleteIssueDialogBox = ({id}: {id: number}) => {
    const [error, setError] = useState<boolean>(false);
    return (
        <>
            <AlertDialogRoot>
                <AlertDialogTrigger>
                    <Button color="red">
                        Delete
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure you want to delete the issue? This action cannot be undone</AlertDialogDescription>
                    <Flex mt="4" gap="3">
                        <AlertDialogCancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialogCancel>
                        <AlertDialogAction>
                            <Button color="red" onClick={ async() => {
                                try {
                                    await deleteIssue(id);
                                } catch(err) {
                                    setError(true);
                                }
                            }}>
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
    )
};

export default DeleteIssueDialogBox;