import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "jsmith@example.com",
                },
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // check to see if email & password exists
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Please enter an email and password");
                }
                // check to see if user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                });
                if (!user || !user.password) {
                    throw new Error("User does not exists");
                }
                // check to see if passwords match
                const passwordMatch = await bcrypt.compare(credentials?.password, user?.password);
                if (!passwordMatch) {
                    throw new Error("Incorrect Password");
                } else {
                    return user;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signIn",
    },
};

export default authOptions;
