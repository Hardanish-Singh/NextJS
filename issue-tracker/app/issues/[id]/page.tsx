import authOptions from "@/app/auth/authOptions";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Flex, Grid, Heading, ScrollArea, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";
import AssigneeSelect from "../_components/AssigneeSelect";
import DeleteIssueDialogBox from "../_components/DeleteIssueDialogBox";

type Props = {
    params: { id: number };
};

const IssueDetailPage: React.FC<Props> = async ({ params: { id } }: Props): Promise<JSX.Element> => {
    id = Number(id);
    if (isNaN(id)) {
        notFound();
    }
    const session = await getServerSession(authOptions);
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
                <ScrollArea
                    scrollbars="vertical"
                    style={{
                        height: 100,
                        maxHeight: 200,
                        maxWidth: 500,
                        border: "1px solid lightgrey",
                        marginTop: 25,
                    }}
                >
                    <Box p="2" pr="8">
                        <Text as="p">{issue.description}</Text>
                    </Box>
                </ScrollArea>
            </Box>
            {session && (
                <Box>
                    <Flex direction="column" gap="4">
                        <AssigneeSelect issue={issue} />
                        <Button>
                            <FaPencilAlt />
                            <Link href={`/issues/${id}/edit`}>Edit</Link>
                        </Button>
                        <DeleteIssueDialogBox id={id} />
                    </Flex>
                </Box>
            )}
        </Grid>
    );
};

export default IssueDetailPage;
