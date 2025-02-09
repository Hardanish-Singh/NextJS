import { Box, Card, Flex, Grid } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

const LoadingIssuesById: React.FC = (): React.JSX.Element => (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="md:col-span-4">
            <Skeleton />
            <Flex className="space-x-3" my="2">
                <Skeleton />
                <Skeleton />
            </Flex>
            <Card>
                <Skeleton height="200px" />
            </Card>
        </Box>
    </Grid>
);

export default LoadingIssuesById;
