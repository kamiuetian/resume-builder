import { NextRequest, NextResponse } from "next/server";
import { execQuery } from "database/mysql";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { firstName, lastName, email, image } = data;
    // Check db that user exists or not
    const user: any = await execQuery({ query: "SELECT * FROM Users WHERE email = ?", values: [email] });
    if (user.length === 0) {
        //User don't exists, create new user
        const newUser = await execQuery({ query: "INSERT INTO Users (first_name, last_name, email, password_hash, verification_status, verification_code) VALUES (?, ?, ?, ?, ?, ?)", values: [firstName, lastName, email, "google-auth", "verified", -1] });
        return NextResponse.json({ status: "success", message: "User created successfully", data: newUser });
    }
    return NextResponse.json({ status: "error", message: "User already exists", data: user[0] });
}