import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../prisma/client";

const registerUserSchema = z.object({
    name: z.string().min(1, "Name is required").max(255),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(1, "Password is required").max(255),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = registerUserSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({
            data: validation.error.format(),
            status: 400,
        });
    }
    try {
        // check if email exists in the database
        const emailExist = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        if (emailExist) {
            return NextResponse.json({
                data: "Email Already Exists",
                status: 400,
            });
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
            },
        });
        return NextResponse.json({
            data: user,
            status: 201,
        });
    } catch (err) {
        console.error("Error during registering an user", err);
        return NextResponse.json({
            data: err,
            status: 500,
        });
    }
}
