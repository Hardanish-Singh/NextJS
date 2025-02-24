import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { auth } from "@/auth";
import { Box, Button, Card, Flex, Grid, Heading, Link, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";
import prisma from "../../../../prisma/client";
import AssigneeSelect from "../_components/AssigneeSelect";
import DeleteIssueDialogBox from "../_components/DeleteIssueDialogBox";
import IssueSelect from "../_components/IssueSelect";
import RichTextReadEditor from "../_components/RichTextReadEditor";

type Props = {
    params: { id: number };
};

const IssueDetailPage: React.FC<Props> = async ({ params: { id } }: Props): Promise<React.JSX.Element> => {
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

    const session = await auth();

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
            {session && (
                <Box>
                    <Flex direction="column" gap="4">
                        <IssueSelect status={issue.status} id={issue.id} />
                        <AssigneeSelect issue={issue} />
                        <Button>
                            <FaPencilAlt />
                            <Link href={`/issues/${id}/edit`} className="text-white no-underline">
                                Edit
                            </Link>
                        </Button>
                        <DeleteIssueDialogBox id={id} />
                    </Flex>
                </Box>
            )}
        </Grid>
    );
};

export default IssueDetailPage;
