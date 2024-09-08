import { Button, TextArea, TextFieldInput, TextFieldRoot } from "@radix-ui/themes";

const NewIssuePage = () => {
    return (
        <div className="max-w-xl space-y-3">
            <TextFieldRoot>
                <TextFieldInput placeholder="Title" name="title"></TextFieldInput>
            </TextFieldRoot>
            <TextArea placeholder="Description" name="description"></TextArea>
            <Button>Submit New Issue</Button>
        </div>
    );
};

export default NewIssuePage;
