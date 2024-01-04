import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required"),
});

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({
            data: "",
            status: 401,
        });
    }
    const body = await request.json();
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
                title: body.title,
                description: body.description,
            },
        });
        return NextResponse.json({
            data: newIssue,
            status: 201,
        });
    } catch (err) {
        console.error("Error during creation of an issue", err);
        return NextResponse.json({
            data: err,
            status: 500,
        });
    }
}
