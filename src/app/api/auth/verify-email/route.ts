import { NextRequest, NextResponse } from "next/server";
import { execQuery } from "database/mysql";

export async function POST(req: NextRequest) {
    const { code, email } = await req.json();
    console.log(code);
    const RETRIEVE_USER_QUERY = "SELECT * FROM Users WHERE email = ?";
    const values = [email];
    const results: any = await execQuery({ query: RETRIEVE_USER_QUERY, values });

    if (results[0].verification_code === code) {
        const UPDATE_USER_QUERY = "UPDATE Users SET verification_status = 'verified' WHERE email = ?";
        const values = [email];
        const results = await execQuery({ query: UPDATE_USER_QUERY, values });
        return NextResponse.json({ status: "success", message: "Email verified" });
    }
    return NextResponse.json({ status: "error", message: "Invalid verification code" });
}