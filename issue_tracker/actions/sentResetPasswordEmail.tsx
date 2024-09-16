"use server";

const nodemailer = require("nodemailer");
const crypto = require("crypto");
import prisma from "../prisma/client";

const sentResetPasswordEmail = async (email: string) => {
    const token = crypto.randomBytes(20).toString("hex") as string;

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

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: process.env.EMAIL_ADDRESS, // Replace with email variable from above in future, for now this will work
        subject: "Hello from Nodemailer",
        text: "This is a test email sent using Nodemailer.",
        html: `Click here to <a href="http://localhost:3000/reset/${token}">Reset Password</a>`,
    };

    async function sendEmail() {
        try {
            await transporter.sendMail(mailOptions);
            console.log("Email sent");
            // Save the token in the database
            await prisma.user.update({
                where: { email },
                data: {
                    token,
                },
            });
            return {
                success: true,
                message: "Reset password email sent successfully",
            };
        } catch {
            console.error("Error sending email");
            return {
                success: false,
                message: "Failed to send email",
            };
        }
    }

    return sendEmail();
};

export default sentResetPasswordEmail;
