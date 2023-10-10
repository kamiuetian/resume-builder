import { execQuery } from "database/mysql";
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import bcrypt from "bcrypt";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function GET(req: NextRequest) {
    const RETRIEVE_USERS_QUERY = "SELECT * FROM Users";
    const results = await execQuery({ query: RETRIEVE_USERS_QUERY });
    return NextResponse.json(results);
}

async function sendMail(verificationCode: string, email: string) {
    const from = "InstantJobCV";
    const subject = "InstantJobCV Verification Code";
    const text = `Your verification code is ${verificationCode}.`;

    const msg = {
        to: email,
        from: from,
        subject: subject,
        text: text,
    };

    try {
        await sgMail.send(msg);
        console.log("Mail sent successfully");
        return true;
    } catch (error) {
        console.error("Error sending mail", error);
        return false;
    }
}

export async function POST(req: NextRequest) {
    const ADD_USER_QUERY =
        "INSERT INTO Users (email,password_hash,first_name,last_name,phone_number,verification_code) VALUES (?,?,?,?,?,?)";

    const data = await req.json();

    // Create password hash.
    const SALT = 10;
    const hashedPassword = bcrypt.hashSync(data.password, SALT);
    const verificationCode = Math.random().toFixed(6).split(".")[1];
    const isMailSent = await sendMail(verificationCode, data.email);

    const values = [data.email, hashedPassword, data.firstName, data.lastName, data.phoneNumber, verificationCode];

    // Checking if user already exists.
    const userExists: any = await execQuery({ query: "SELECT * FROM Users WHERE email = ?", values: [data.email] });
    if (userExists.length > 0) {
        return NextResponse.json({ status: "error", message: "User already exists." });
    }

    // Insert user into the database.
    const results = await execQuery({ query: ADD_USER_QUERY, values });
    return NextResponse.json({ status: "success", codeSent: isMailSent, message: "User created successfully.", results });
}
