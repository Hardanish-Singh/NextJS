import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const editIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255).optional(),
    description: z
        .string()
        .min(1, "Description is required")
        .max(65535)
        .optional(),
    assignedToUserId: z
        .string()
        .min(1, "AssignedToUserId is Required")
        .max(255)
        .optional()
        .nullable(),
});

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const body = await request.json();
    const validation = editIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({
            data: validation.error.format(),
            status: 400,
        });
    }
    const { title, description, assignedToUserId } = body;
    // check if valid user id
    if (assignedToUserId) {
        let user = await prisma.user.findUnique({
            where: { id: assignedToUserId },
        });
        if (!user) {
            return NextResponse.json({
                data: "Invalid User",
                status: 404,
            });
        }
    }
    try {
        const issue = await prisma.issue.findUnique({
            where: { id: Number(params.id) },
        });
        if (!issue) {
            return NextResponse.json({
                data: "Invalid Issue",
                status: 404,
            });
        }
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
            data: err,
            status: 500,
        });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const issue = await prisma.issue.findUnique({
            where: { id: Number(params.id) },
        });
        if (!issue) {
            return NextResponse.json({
                data: "Invalid Issue",
                status: 404,
            });
        }
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
            data: err,
            status: 500,
        });
    }
}
