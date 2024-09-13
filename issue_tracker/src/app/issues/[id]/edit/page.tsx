import { notFound } from "next/navigation";
import prisma from "../../../../../prisma/client";
import IssueForm from "../../_components/IssueForm";

type Props = {
    params: { id: number };
};

const EditIssuePage = async ({ params: { id } }: Props) => {
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
