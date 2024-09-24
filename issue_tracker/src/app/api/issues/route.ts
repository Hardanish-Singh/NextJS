import { createIssueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { title, description, session } = body;
    // Check if the user is authenticated
    if (!session) {
        return NextResponse.json({
            data: "You are not authenticated to perform this action!",
            status: 401,
        });
    }
    // Check if description is empty and return error message if it is
    if (description.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
        return NextResponse.json({
            data: {
                title: "",
                description: "Description is required",
            },
            status: 400,
        });
    }
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({
            data: validation.error.format(),
            status: 400,
        });
    }
    try {
        const newIssue = await prisma.issue.create({
            data: {
                title,
                description,
            },
        });
        return NextResponse.json({
            data: newIssue,
            status: 201,
        });
    } catch (err) {
        console.error("Error during creation of an issue", err);
        return NextResponse.json({
            data: {
                title: "",
                description: "Error during creation of an issue",
            },
            status: 500,
        });
    }
}
