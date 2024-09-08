import { Button } from "@radix-ui/themes";
import Link from "next/link";

const Issues = (): React.JSX.Element => {
    return (
        <>
            <Button>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </>
    );
};

export default Issues;
