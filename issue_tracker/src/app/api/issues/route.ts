import { createIssueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, session } = body;
        // Check if the user is authenticated and has permission to create a new issue
        const user = await prisma.user.findFirst({ where: { id: session.user.id } });
        if (!user) {
            return NextResponse.json({
                data: {
                    message: "You are not authenticated to perform this action!",
                },
                status: 404,
            });
        }
        // Validate the input data using zod schema
        const validation = createIssueSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({
                data: validation.error.format(),
                status: 400,
            });
        }
        // Create a new issue in the database and return the created issue
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
                message: "Error during creation of an issue",
            },
            status: 500,
        });
    }
}
