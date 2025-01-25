import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

type Props = {
    params: { id: number };
};

const EditIssuePage: React.FC<Props> = async ({ params: { id } }: Props) => {
    id = Number(id);
    if (isNaN(id)) {
        notFound();
    }
    const issue = await prisma.issue.findUnique({
        where: { id },
    });
    if (!issue) {
        notFound();
    }
    return <IssueForm issue={issue} />;
};

export default EditIssuePage;
