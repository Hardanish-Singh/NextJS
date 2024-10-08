"use server";

import bcrypt from "bcryptjs";
import prisma from "../prisma/client";

type resetPasswordReturnType = {
    success: boolean;
    message: string;
};

const resetPassword = async (password: string, token: string): Promise<resetPasswordReturnType> => {
    try {
        // Compare the token against the database
        const user = await prisma.user.findUnique({
            where: {
                token,
            },
        });

        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the password in the database
        await prisma.user.update({
            where: {
                token,
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
