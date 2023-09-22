import { NextRequest, NextResponse } from "next/server";
import { execQuery } from "database/mysql";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email) {
        return NextResponse.json({ status: "error" }, { status: 400 });
    }
    //Check if user exists
    const RETRIEVE_RESUMES_QUERY = `SELECT * FROM Users WHERE email = '${email}'`;
    const results: any = await execQuery({ query: RETRIEVE_RESUMES_QUERY });
    if (results.length === 0) {
        return NextResponse.json({ status: "error" }, { status: 404 });
    }
    const { first_name, last_name, phone_number } = results[0];
    return NextResponse.json({ first_name, last_name, phone_number, email: results[0].email }, { status: 200 });
}