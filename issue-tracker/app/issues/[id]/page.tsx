import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

type Props = {
    params: { id: number };
};

const page = async ({ params: { id } }: Props) => {
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
    return (
        <>
            <p>{issue.title}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </>
    );
};

export default page;
