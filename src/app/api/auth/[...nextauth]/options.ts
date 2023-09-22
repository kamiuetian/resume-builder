import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { execQuery } from "database/mysql";
import bcrypt from "bcrypt";


async function validateuser(email: string, password: string) {
    const RETRIEVE_USERS_QUERY = "SELECT * FROM Users WHERE email = ?";

    const results: any = await execQuery({ query: RETRIEVE_USERS_QUERY, values: [email] });

    if (results.length === 0) {
        return null;
    }

    const user = results[0];

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (passwordMatch) {
        return user;
    } else {
        return null;
    }
}



export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            type: "credentials",
            credentials: {
                email: { type: "text", },
                password: { type: "password" }
            },
            //@ts-ignore
            async authorize(credentials: any) {
                //Check if user exists
                const user = await validateuser(credentials?.email, credentials?.password);
                if (user) {
                    return user;
                }
                else {
                    return null;
                }

            }
        }),
        GoogleProvider({
            id: "google",
            name: "Google",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

    ],

    pages: {
        signIn: "/login",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    }
};