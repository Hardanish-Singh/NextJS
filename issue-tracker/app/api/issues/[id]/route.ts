import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const editIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required"),
});

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({
            data: "",
            status: 401,
        });
    }
    const body = await request.json();
    const validation = editIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({
            data: validation.error.format(),
            status: 400,
        });
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
                title: body.title,
                description: body.description,
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
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({
                data: "",
                status: 401,
            });
        }
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
