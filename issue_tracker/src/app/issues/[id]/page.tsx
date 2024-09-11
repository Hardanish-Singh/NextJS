import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import prisma from "../../../../prisma/client";
import RichTextReadEditor from "../_components/RichTextReadEditor";

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
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className="md:col-span-4">
                <Heading>{issue.title}</Heading>
                <Flex className="space-x-3" my="2">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card>
                    <RichTextReadEditor value={issue.description} />
                </Card>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;
