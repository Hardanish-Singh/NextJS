"use client";

import { Button, TextField /*TextArea*/ } from "@radix-ui/themes";
import { useRef, useState } from "react";
import RichTextEditor from "../_components/RichTextEditor";

const NewIssuePage = () => {
    const [description, setDescription] = useState("");
    const ref = useRef<HTMLFormElement>(null);
    const clientAction = async (formData: FormData) => {
        const title = formData.get("title");
        // const description = formData.get("description");
        console.log("forData", title, description);
    };
    return (
        <div className="max-w-xl space-y-3">
            <form className="space-y-3" ref={ref} action={clientAction}>
                <TextField.Root placeholder="Title" name="title"></TextField.Root>
                {/* <TextArea placeholder="Description" name="description"></TextArea> */}
                <RichTextEditor
                    placeholder="Description"
                    onChange={(value) => setDescription(value)}
                    value={description}
                />
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
