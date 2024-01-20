import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
} from "@radix-ui/themes";

const AssigneeSelect = () => {
    return (
        <SelectRoot>
            <SelectTrigger placeholder="Assign..." />
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Suggestions</SelectLabel>
                    <SelectItem value="1">Hardanish Singh</SelectItem>
                </SelectGroup>
            </SelectContent>
        </SelectRoot>
    );
};

export default AssigneeSelect;
