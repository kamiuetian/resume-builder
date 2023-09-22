import { execQuery } from "database/mysql";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    const RETRIEVE_RESUMES_QUERY = "DELETE FROM Resumes where resume_id=10";
    const results: any = await execQuery({ query: RETRIEVE_RESUMES_QUERY });
    return NextResponse.json(results);
}




// const q = `CREATE TABLE Users (
//     user_id INT AUTO_INCREMENT PRIMARY KEY,
//     email VARCHAR(255) UNIQUE,
//     password_hash VARCHAR(255),
//     first_name VARCHAR(255),
//     last_name VARCHAR(255),
//     phone_number VARCHAR(20),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
// "verification_code": "385256",
//         "verification_status": "unverified
//   );`

