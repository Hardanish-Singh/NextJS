"use client";
import { Button } from "@radix-ui/themes";
import { deleteIssue } from "@/actions/deleteIssue";

const DeleteIssueButton = ({id}: {id: number}) => {
    return (
        <Button color="red" onClick={ async() => await deleteIssue(id)}>
            Delete Issue
        </Button>
    )
};

export default DeleteIssueButton;