import { Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

const IssuesLoadingSkeleton: React.FC = () => (
    <Table.Root variant="surface">
        <Table.Header>
            <Table.Row>
                <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="max-md:hidden">Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="max-md:hidden">Created</Table.ColumnHeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((index) => (
                <Table.Row key={index}>
                    <Table.Cell>
                        <Skeleton />
                        <section className="block md:hidden">
                            <Skeleton />
                        </section>
                    </Table.Cell>
                    <Table.Cell className="max-md:hidden">
                        <Skeleton />
                    </Table.Cell>
                    <Table.Cell className="max-md:hidden">
                        <Skeleton />
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table.Root>
);

export default IssuesLoadingSkeleton;
