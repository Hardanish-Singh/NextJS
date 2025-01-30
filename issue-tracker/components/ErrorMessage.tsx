import { Text } from "@radix-ui/themes";

const ErrorMessage = ({ errorMessage }: { errorMessage: string }): React.JSX.Element => (
    <Text color="red" as="p">
        {errorMessage}
    </Text>
);
export default ErrorMessage;
