import { createIssueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(request: NextRequest) {
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
