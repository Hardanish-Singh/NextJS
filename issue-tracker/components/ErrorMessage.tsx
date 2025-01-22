import { Text } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const ErrorMessage: React.FC = ({ children }: PropsWithChildren) => {
    return !children ? null : (
        <Text color="red" as="p">
            {children}
        </Text>
    );
};

export default ErrorMessage;
