import { editIssueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json();
    const { title, description, assignedToUserId, session } = body;
    if (!session) {
        return NextResponse.json({
            data: {
                title: "",
                description: "You are not authenticated to perform this action!",
            },
            status: 401,
        });
    }
    // Check if description is empty and return error message if it is
    if (description && description.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
        return NextResponse.json({
            data: {
                title: "",
                description: "Description is required",
            },
            status: 400,
        });
    }
    const validation = editIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({
            data: validation.error.format(),
            status: 400,
        });
    }
    // check if valid user id
    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: assignedToUserId },
        });
        if (!user) {
            return NextResponse.json({
                data: {
                    title: "",
                    description: "Invalid Issue",
                },
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
                data: {
                    title: "",
                    description: "Invalid Issue",
                },
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
            data: {
                title: "",
                description: "Error during editing of an issue",
            },
            status: 500,
        });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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
            data: "Error during deletion of an issue",
            status: 500,
        });
    }
}
