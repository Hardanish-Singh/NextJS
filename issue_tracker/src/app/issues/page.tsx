import { Status } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "../../../prisma/client";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueStatusFilter from "./_components/IssueStatusFilter";

type Props = {
    searchParams: { status: Status };
};

const Issues = async ({ searchParams }: Props): Promise<React.JSX.Element> => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
    const issues = await prisma.issue.findMany({
        where: {
            status,
        },
    });

    return (
        <>
            <section className="mb-5 flex justify-between">
                <IssueStatusFilter />
                <Button>
                    <Link href={"/issues/new"}>New Issue</Link>
                </Button>
            </section>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="max-md:hidden">Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="max-md:hidden">Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(({ id, title, status, createdAt }) => (
                        <Table.Row key={id}>
                            <Table.Cell>
                                {title}
                                <section className="block md:hidden">
                                    <IssueStatusBadge status={status} />
                                </section>
                            </Table.Cell>
                            <Table.Cell className="max-md:hidden">
                                <IssueStatusBadge status={status} />
                            </Table.Cell>
                            <Table.Cell className="max-md:hidden">{createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    );
};

export default Issues;
