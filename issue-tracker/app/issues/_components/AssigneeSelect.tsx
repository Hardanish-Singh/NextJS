"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { toast } from "react-hot-toast";

type Props = {
    issue: Issue;
};

const AssigneeSelect: React.FC<Props> = async ({ issue }: Props): Promise<JSX.Element | null> => {
    let users: User[] = [];
    try {
        const response = await fetch("http://localhost:3000/api/users", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "API-Key": process.env.DATA_API_KEY!,
            },
            cache: "no-cache",
        });
        users = await response.json();
    } catch (err) {
        console.log(err);
        return null;
    }
    const onValueChange = (userId: any) => {
        try {
            fetch(`http://localhost:3000/api/issues/${issue.id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    "API-Key": process.env.DATA_API_KEY!,
                },
                body: JSON.stringify({
                    assignedToUserId: userId === "unassigned" ? null : userId,
                }),
                cache: "no-cache",
            });
            toast.success("Successfully Saved");
        } catch (err) {
            toast.error("Changes could not be saved");
        }
    };
    return (
        <Select.Root
            defaultValue={!issue.assignedToUserId ? "unassigned" : issue.assignedToUserId}
            onValueChange={(userId) => onValueChange(userId)}
        >
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value="unassigned">Unassigned</Select.Item>
                    {users.map((user) => (
                        <Select.Item value={user.id} key={user.id}>
                            {user.name}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;
