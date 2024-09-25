"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
    status: Status;
    id: number;
};

const IssueSelect: React.FC<Props> = ({ status, id }: Props): React.JSX.Element => {
    const router = useRouter();
    const statuses = Object.keys(Status) as Array<Status>;

    const onValueChange = async (status: Status) => {
        const session = await getSession();
        try {
            fetch(`${process.env.NEXT_PUBLIC_URL}/api/issues/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    "API-Key": process.env.DATA_API_KEY!,
                },
                body: JSON.stringify({
                    status,
                    session,
                }),
                cache: "no-cache",
            });
            toast.success("Successfully Saved");
            router.push(`/issues/${id}`);
            router.refresh();
        } catch (err) {
            toast.error("Changes could not be saved");
        }
    };

    return (
        <Select.Root
            defaultValue={status}
            onValueChange={(status: Status) => {
                onValueChange(status);
            }}
        >
            <Select.Trigger placeholder="Update Issue..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {statuses.map((status) => (
                        <Select.Item value={status} key={status}>
                            {status}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default IssueSelect;
