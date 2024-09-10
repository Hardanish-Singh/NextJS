import { Issue, Status } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { Fragment, Suspense } from "react";
import prisma from "../../../prisma/client";
import Await from "../components/Await";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueStatusFilter from "./_components/IssueStatusFilter";
import IssuesLoadingSkeleton from "./_components/IssuesLoadingSkeleton";

type Props = {
    searchParams: { status: Status };
};

const IssuesPage = ({ searchParams }: Props): React.JSX.Element => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
    const key = JSON.parse(JSON.stringify(searchParams?.status || ""));

    return (
        <Fragment key={key}>
            <section className="mb-5 flex justify-between">
                <IssueStatusFilter />
                <Button>
                    <Link href={"/issues/new"}>New Issue</Link>
                </Button>
            </section>
            <Suspense key={key} fallback={<IssuesLoadingSkeleton />}>
                <Issues status={status} />
            </Suspense>
        </Fragment>
    );
};

const Issues = async ({ status }: any) => {
    const issues: Issue[] = await prisma.issue.findMany({
        where: {
            status,
        },
    });

    return (
        <Await promise={issues}>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="max-md:hidden">Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="max-md:hidden">Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(({ id, title, status, createdAt }: Issue) => (
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
        </Await>
    );
};

export default IssuesPage;
