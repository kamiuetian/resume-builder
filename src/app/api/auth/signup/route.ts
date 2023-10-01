import { execQuery } from "database/mysql";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";


const transporter = nodemailer.createTransport({
    host: "instantjobcv.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAILER_EMAIL as string,
        pass: process.env.MAILER_PASSWORD as string
    }
});


export async function GET(req: NextRequest) {
    const RETRIEVE_USERS_QUERY = "SELECT * FROM Users";
    const results = await execQuery({ query: RETRIEVE_USERS_QUERY });
    return NextResponse.json(results);
}

async function sendMail(verificationCode: string, email: string) {
    const from = "MyResume <info@example.com>";
    const subject = "MyResume Verification Code";
    const text = `Your verification code is ${verificationCode}.`;

    const mailOptions = {
        from,
        to: email,
        subject: subject,
        text: text
    };
    let isSent = false

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending mail", error)

                reject(error);

            } else {
                isSent = true;
                console.log("Mail sent successfully", info)
                resolve(info);
            }
        });

    })
    return isSent;
}



export async function POST(req: NextRequest) {
    const ADD_USER_QUERY = "INSERT INTO Users (email,password_hash,first_name,last_name,phone_number,verification_code) VALUES (?,?,?,?,?,?)";

    const data = await req.json();

    // Create password hash.

    const SALT = 10;

    const hashedPassword = bcrypt.hashSync(data.password, SALT);
    const verificationCode = Math.random().toFixed(6).split('.')[1];
    const isMailSent = await sendMail(verificationCode, data.email);

    const values = [data.email, hashedPassword, data.firstName, data.lastName, data.phoneNumber, verificationCode];

    // Checking if user already exists.
    const userExists: any = await execQuery({ query: "SELECT * FROM Users WHERE email = ?", values: [data.email] });
    if (userExists.length > 0) {
        return NextResponse.json({ status: "error", message: "User already exists." });
    }

    // Insert user into database.
    const results = await execQuery({ query: ADD_USER_QUERY, values });
    return NextResponse.json({ status: "success", codeSent: isMailSent, message: "User created successfully.", results });
}

