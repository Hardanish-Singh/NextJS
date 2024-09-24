import { editIssueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { title, description, assignedToUserId, session } = body;
        // Check if the user is authenticated and has permission to edit the issue
        if (!session) {
            return NextResponse.json({
                data: {
                    message: "You are not authenticated to perform this action!",
                },
                status: 401,
            });
        }
        // Validate the input data using zod schema
        const validation = editIssueSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({
                data: validation.error.format(),
                status: 400,
            });
        }
        // Check if the user id is valid
        if (assignedToUserId) {
            const user = await prisma.user.findUnique({
                where: { id: assignedToUserId },
            });
            if (!user) {
                return NextResponse.json({
                    data: {
                        message: "Invalid User",
                    },
                    status: 404,
                });
            }
        }
        // Check if the issue exists in the database
        const issue = await prisma.issue.findUnique({
            where: { id: Number(params.id) },
        });
        if (!issue) {
            return NextResponse.json({
                data: {
                    message: "Invalid Issue",
                },
                status: 404,
            });
        }
        // Update the issue in the database
        const updatedIssue = await prisma.issue.update({
            where: { id: Number(params.id) },
            data: {
                title,
                description,
                assignedToUserId,
            },
        });
        return NextResponse.json({
            data: updatedIssue,
            status: 201,
        });
    } catch (err) {
        console.error("Error during editing of an issue", err);
        return NextResponse.json({
            data: {
                message: "Error during editing of an issue",
            },
            status: 500,
        });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { session } = body;
        // Check if the user is authenticated and has permission to delete the issue
        if (!session) {
            return NextResponse.json({
                data: {
                    message: "You are not authenticated to perform this action!",
                },
                status: 401,
            });
        }
        // Check if the issue exists in the database
        const issue = await prisma.issue.findUnique({
            where: { id: Number(params.id) },
        });
        if (!issue) {
            return NextResponse.json({
                data: {
                    message: "Invalid Issue",
                },
                status: 404,
            });
        }
        // Delete the issue from the database
        await prisma.issue.delete({
            where: { id: Number(params.id) },
        });
        return NextResponse.json({
            data: "Issue Deleted Successfully",
            status: 201,
        });
    } catch (err) {
        console.error("Error during deletion of an issue", err);
        return NextResponse.json({
            data: {
                message: "Error during deletion of an issue",
            },
            status: 500,
        });
    }
}
