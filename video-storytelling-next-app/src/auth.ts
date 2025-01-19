import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
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
            // The callback to run when the form is submitted, `credentials` will contain the values the user entered.
            async authorize(credentials: any) {
                // check to see if email & password exists
                if (!credentials?.email || !credentials?.password) {
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
                    throw new Error("Password do not match");
                } else {
                    return user;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt", // JWT strategy (Authenication Mechanism)
        maxAge: 4 * 60 * 60, // maxAge of JWT Token (4 hours)
    },
    pages: {
        signIn: "/login",
        // signOut: "/logout", // Custom Logout page if needed
        // error: "/error", // Custom Error page if needed
    },
    callbacks: {
        async jwt({ token }) {
            return token;
        },
        async session({ session, token }) {
            // Add user id to the session
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            // Return the session to the next.js context
            return session;
        },
    },
});
