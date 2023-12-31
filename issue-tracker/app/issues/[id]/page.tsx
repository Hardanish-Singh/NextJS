import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";
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
            <Heading>{issue.title}</Heading>
            <Flex className="space-x-3" my="2">
                <IssueStatusBadge status={issue.status}/>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <ScrollArea scrollbars="vertical" style={{ maxHeight: 200, maxWidth: 500, border: "1px solid lightgrey", marginTop: 25 }}>
                <Box p="2" pr="8">
                    <Text as="p">
                        {issue.description}
                    </Text>
                </Box>
            </ScrollArea>
        </>
    );
};

export default page;
