import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Flex, Heading, ScrollArea, Text, Grid, Button } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";

type Props = {
    params: { id: number };
};

const IssueDetailPage = async ({ params: { id } }: Props) => {
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
        <Grid columns={{initial: "1", md: "2"}} gap="5">
            <Box>
                <Heading>{issue.title}</Heading>
                <Flex className="space-x-3" my="2">
                    <IssueStatusBadge status={issue.status}/>
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <ScrollArea scrollbars="vertical" style={{ height: 100, maxHeight: 200, maxWidth: 500, border: "1px solid lightgrey", marginTop: 25 }}>
                    <Box p="2" pr="8">
                        <Text as="p">
                            {issue.description}
                        </Text>
                    </Box>
                </ScrollArea>
            </Box>
            <Box>
                <Button>
                    <FaPencilAlt />
                    <Link href={`/issues/${id}/edit`}>Edit</Link>
                </Button>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;
