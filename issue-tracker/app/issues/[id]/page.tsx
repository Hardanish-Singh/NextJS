import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogRoot, AlertDialogTitle, AlertDialogTrigger, Box, Button, Flex, Grid, Heading, ScrollArea, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";
import DeleteIssueButton from "../_components/DeleteIssueButton";

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
        <Grid columns={{initial: "1", sm: "5"}} gap="5">
            <Box className="md:col-span-4">
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
                <Flex direction="column" gap="4">
                    <Button>
                        <FaPencilAlt />
                        <Link href={`/issues/${id}/edit`}>Edit</Link>
                    </Button>
                    <AlertDialogRoot>
                        <AlertDialogTrigger>
                            <Button color="red">
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                            <AlertDialogDescription>Are you sure you want to delete the issue? This action cannot be undone</AlertDialogDescription>
                            <Flex mt="4" gap="3">
                                <AlertDialogCancel>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </AlertDialogCancel>
                                <AlertDialogAction>
                                    <DeleteIssueButton id={id} />
                                </AlertDialogAction>
                            </Flex>
                        </AlertDialogContent>
                    </AlertDialogRoot>
                </Flex>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;
