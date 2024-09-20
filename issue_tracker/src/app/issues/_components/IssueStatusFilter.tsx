"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

type Label = "Open" | "In Progress" | "Closed";

const statuses: Array<{
    label: Label;
    value: Status;
}> = [
    { label: "Open", value: Status.OPEN },
    { label: "In Progress", value: Status.IN_PROGRESS },
    { label: "Closed", value: Status.CLOSED },
];

const IssueStatusFilter = (): React.JSX.Element => {
    const router = useRouter();
    const searchParams = useSearchParams();
    return (
        <Select.Root
            value={searchParams.get("status") || ""}
            onValueChange={(status) => {
                const params = new URLSearchParams();

                if (status) params.append("status", status);
                if (searchParams.get("orderBy")) params.append("orderBy", searchParams.get("orderBy")!);
                if (searchParams.get("sort")) params.append("sort", searchParams.get("sort")!);

                const query = params.size ? "?" + params.toString() : "";
                router.push("/issues" + query);
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
