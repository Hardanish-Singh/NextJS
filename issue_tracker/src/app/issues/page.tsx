import { Issue, Status } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { Fragment, Suspense } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import prisma from "../../../prisma/client";
import Await from "../components/Await";
import IssueStatusBadge from "../components/IssueStatusBadge";
import NavLink from "../components/NavLink";
import Pagination from "../components/Pagination";
import IssueStatusFilter from "./_components/IssueStatusFilter";
import IssuesLoadingSkeleton from "./_components/IssuesLoadingSkeleton";

const columns: {
    label: string; // Table Column Name Label
    value: keyof Issue; // Column name of Issue table in the database for sorting issues
    className?: string;
}[] = [
    { label: "Issue", value: "title" },
    {
        label: "Status",
        value: "status",
        className: "max-md:hidden",
    },
    {
        label: "Created",
        value: "createdAt",
        className: "max-md:hidden",
    },
];

const tableColumnNames = columns.map((column) => column.value);

type Props = {
    searchParams: {
        status: Status;
        orderBy: keyof Issue;
        sort: string;
        page: string;
        rowsPerPage: string;
    };
};

const IssuesPage = ({ searchParams }: Props): React.JSX.Element => {
    const key = JSON.parse(
        JSON.stringify(
            `${searchParams?.status}, ${searchParams?.orderBy}, ${searchParams?.sort}}, ${searchParams?.page}`
        )
    );

    return (
        <Fragment key={key}>
            <section className="mb-5 flex justify-between">
                <IssueStatusFilter />
                <Button>
                    <Link href={"/issues/new"} prefetch={false}>
                        New Issue
                    </Link>
                </Button>
            </section>
            <Suspense key={key} fallback={<IssuesLoadingSkeleton />}>
                <Issues searchParams={searchParams} />
            </Suspense>
        </Fragment>
    );
};

const Issues = async ({ searchParams }: Props): Promise<JSX.Element> => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

    const sortDirection = searchParams.sort === "asc" ? "asc" : "desc";
    const orderBy = tableColumnNames.includes(searchParams.orderBy)
        ? {
              [searchParams.orderBy]: sortDirection,
          }
        : undefined;

    const page = parseInt(searchParams.page) || 1;
    const pageSize = parseInt(searchParams.rowsPerPage) || 5; // Rows per page or number of items per page

    const promise = prisma.issue.findMany({
        where: {
            status,
        },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const totalIssues = await prisma.issue.count({
        where: {
            status,
        },
    });

    return (
        <Await promise={promise}>
            {(props: Issue[]) => {
                return (
                    <>
                        <Table.Root variant="surface">
                            <Table.Header>
                                <Table.Row>
                                    {columns.map(({ label, value, className }) => (
                                        <Table.ColumnHeaderCell key={value} className={className}>
                                            <Link
                                                href={{
                                                    query: {
                                                        ...searchParams,
                                                        orderBy: value,
                                                        sort: searchParams.sort === "asc" ? "desc" : "asc",
                                                    },
                                                }}
                                            >
                                                {label}
                                            </Link>
                                            {value === searchParams.orderBy && searchParams.sort === "asc" ? (
                                                <FaSortUp className="inline" />
                                            ) : value === searchParams.orderBy && searchParams.sort === "desc" ? (
                                                <FaSortDown className="inline" />
                                            ) : (
                                                <FaSort className="inline" />
                                            )}
                                        </Table.ColumnHeaderCell>
                                    ))}
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {props.map(({ id, title, status, createdAt }: Issue) => (
                                    <Table.Row key={id}>
                                        <Table.Cell>
                                            <NavLink href={`/issues/${id}`}>{title}</NavLink>
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
                        <Pagination pageSize={pageSize} currentPage={page} itemCount={totalIssues} />
                    </>
                );
            }}
        </Await>
    );
};

export default IssuesPage;
