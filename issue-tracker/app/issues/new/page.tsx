import { TextFieldRoot, TextFieldInput, TextArea, Button } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
    return (
        <div className="max-w-xl space-y-3">
            <TextFieldRoot>
                <TextFieldInput placeholder="Title"></TextFieldInput>
            </TextFieldRoot>
            <TextArea placeholder="Description" size="3"></TextArea>
            <Button>Submit New Issue</Button>
        </div>
    );
};

export default NewIssuePage;
