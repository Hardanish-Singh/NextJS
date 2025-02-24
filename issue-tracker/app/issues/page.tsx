import IssueStatusBadge from "@/components/IssueStatusBadge";
import NavLink from "@/components/NavLink";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import {
    Button,
    TableBody,
    TableCell,
    TableColumnHeaderCell,
    TableHeader,
    TableRoot,
    TableRow,
} from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./_components/IssueStatusFilter";

type Props = {
    searchParams: { status: Status };
};

const Issues: React.FC<Props> = async ({ searchParams }: Props) => {
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
            <TableRoot variant="surface">
                <TableHeader>
                    <TableRow>
                        <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
                        <TableColumnHeaderCell className="hidden md:table-cell">Status</TableColumnHeaderCell>
                        <TableColumnHeaderCell className="hidden md:table-cell">Created</TableColumnHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {issues.map(({ id, title, status, createdAt }) => (
                        <TableRow key={id}>
                            <TableCell>
                                <NavLink href={`/issues/${id}`}>{title}</NavLink>
                                <div className="block md:hidden">
                                    <IssueStatusBadge status={status} />
                                </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <IssueStatusBadge status={status} />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{createdAt.toDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableRoot>
        </>
    );
};

export default Issues;
