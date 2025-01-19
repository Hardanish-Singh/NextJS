"use server";

import bcrypt from "bcryptjs";
import prisma from "../prisma/client";

type resetPasswordReturnType = {
    success: boolean;
    message: string;
};

const resetPassword = async (email: string, password: string): Promise<resetPasswordReturnType> => {
    try {
        // check if email exists in the database
        const emailExist = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!emailExist) {
            return {
                success: false,
                message: "Email not found",
            };
        }
        // hash the password for security reasons
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the password in the database
        await prisma.user.update({
            where: {
                email,
            },
            data: {
                password: hashedPassword,
            },
        });

        return {
            success: true,
            message: "Password reset successfully",
        };
    } catch (err) {
        console.error("Error resetting password", err);
        return {
            success: false,
            message: "Error resetting password",
        };
    }
};

export default resetPassword;
