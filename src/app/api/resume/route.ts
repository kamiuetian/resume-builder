import { NextRequest, NextResponse } from "next/server";
import { execQuery } from "database/mysql";


// Get all resumes of user by email
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json({ status: "error", message: "email not found" }, { status: 400 });
    }

    const GET_RESUMES_QUERY = `SELECT * FROM Resumes WHERE user_id = (SELECT user_id FROM Users WHERE email = '${email}')`;
    const res: any = await execQuery({ query: GET_RESUMES_QUERY });
    if (res.length === 0) {
        return NextResponse.json({ status: "not-found", message: "No resume created yet." }, { status: 404 });
    }
    return NextResponse.json(res);
}



export async function POST(req: NextRequest) {
    const reqBody = await req.json();
    //Save data in DB

    const GET_USER_ID_QUERY = `SELECT user_id FROM Users WHERE email = '${reqBody.email}'`;
    const res: any = await execQuery({ query: GET_USER_ID_QUERY });
    let userId;

    try {
        userId = res[0].user_id;
    } catch (e) {
        userId = null;
    }

    try {
        const { resume: { profile: { name, email, phone } } } = typeof reqBody.data === "string" ? JSON.parse(reqBody.data) : reqBody.data;
        const CREATE_RESUME_QUERY = `INSERT INTO Resumes (user_id, name, email, phone_number, full_resume) 
        VALUES (${userId}, '${name ?? ""}', '${email ?? ""}', '${phone ?? ""}', '${typeof reqBody.data === "string" ? reqBody.data : JSON.stringify(reqBody.data)}')`;
        const d = await execQuery({ query: CREATE_RESUME_QUERY });
        return NextResponse.json({ status: "success", result: d });

    } catch (e: any) {
        return NextResponse.json({ status: "error", message: e.message ?? "" }, { status: 400 });
    }
}

export async function PUT(req: NextRequest) {
    const reqBody = await req.json();
    if (!reqBody.resume_id) {
        return NextResponse.json({ status: "error", message: "resume_id not found" }, { status: 400 });
    }
    const full_resume = reqBody.data;
    const UPDATE_RESUME_QUERY = `UPDATE Resumes SET full_resume = '${JSON.stringify(full_resume)}' WHERE resume_id = ${reqBody.resume_id}`;
    const res = await execQuery({ query: UPDATE_RESUME_QUERY });
    return NextResponse.json({ status: "success", result: res });
}




// CREATE TABLE Resumes (
//     resume_id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT,
//     name VARCHAR(255),
//     email VARCHAR(255),
//     phone_number VARCHAR(20),
//     full_resume JSON,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES Users(user_id)
//   );