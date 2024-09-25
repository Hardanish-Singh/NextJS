import { z } from "zod";

const regex = new RegExp(/<(.|\n)*?>/g);

export const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    // prettier-ignore
    description: z
                  .string()
                  .trim()
                  .transform((value) => (value.replace(regex, "").trim().length === 0 ? "" : value))
                  .pipe(z.string().min(1, "Description is required")),
});

export const editIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255).optional(),
    // prettier-ignore
    description: z
                  .string()
                  .trim()
                  .transform((value) => (value.replace(regex, "").trim().length === 0 ? "" : value))
                  .pipe(z.string().min(1, "Description is required"))
                  .optional(),
    // prettier-ignore
    assignedToUserId: z
                        .string()
                        .min(1, "AssignedToUserId is Required")
                        .max(255)
                        .optional()
                        .nullable(),
});

export const registerUserSchema = z.object({
    name: z.string().min(1, "Name is required").max(255),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(1, "Password is required").max(255),
});
