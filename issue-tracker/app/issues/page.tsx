import {
    Button,
    TableRoot,
    TableHeader,
    TableRow,
    TableBody,
    TableColumnHeaderCell,
    TableCell,
} from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import prisma from "@/prisma/client";
import IssueStatusBadge from "@/components/IssueStatusBadge";

const Issues = async () => {
    const issues = await prisma.issue.findMany();
    return (
        <>
            <section className="mb-5">
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
                                {title}
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
