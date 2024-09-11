import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

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
            data: err,
            status: 500,
        });
    }
}
