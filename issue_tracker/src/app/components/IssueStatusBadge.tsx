import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
//
type Props = {
    status: Status;
};

type Color = "red" | "violet" | "green";

const statusMap: Record<Status, { label: string; color: Color }> = {
    OPEN: { label: "Open", color: "red" },
    IN_PROGRESS: { label: "In Progress", color: "violet" },
    CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge: React.FC<Props> = ({ status }: Props): React.JSX.Element => (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
);

export default IssueStatusBadge;
