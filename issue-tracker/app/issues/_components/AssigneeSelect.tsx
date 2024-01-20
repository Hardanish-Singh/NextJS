import { User } from "@prisma/client";
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
} from "@radix-ui/themes";

const AssigneeSelect = async () => {
    const response = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "API-Key": process.env.DATA_API_KEY!,
        },
        cache: "no-cache",
    });
    const users = await response.json();
    return (
        <SelectRoot>
            <SelectTrigger placeholder="Assign..." />
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Suggestions</SelectLabel>
                    {users.map((user: User) => (
                        <SelectItem value={user.id} key={user.id}>
                            {user.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </SelectRoot>
    );
};

export default AssigneeSelect;
