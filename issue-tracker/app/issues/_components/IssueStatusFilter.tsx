"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statuses: {
    label: string;
    value: Status;
}[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter: React.FC = (): React.JSX.Element => {
    const router = useRouter();
    return (
        <Select.Root
            onValueChange={(status) => {
                router.push(`issues?status=${status}`);
            }}
        >
            <Select.Trigger placeholder="Filter by Status..." />
            <Select.Content>
                <Select.Item value="ALL">All</Select.Item>
                {statuses.map((status) => (
                    <Select.Item value={status.value} key={status.label}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFilter;
