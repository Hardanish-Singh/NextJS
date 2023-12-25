import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }
    try {
        const newIssue = await prisma.issue.create({
            data: {
                title: body.title,
                description: body.description,
            },
        });
        return NextResponse.json(newIssue, { status: 201 });
    } catch (err) {
        console.error("Error during creation of issue", err);
        return NextResponse.json({ data: err, success: false });
    }
}
