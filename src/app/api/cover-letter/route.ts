import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});



export async function POST(req: NextRequest) {

    const { resume, jobDescription } = await req.json();



    const prompt = `
    You are an expert cover letter writer.
    Your task is to write a cover letter for a professional whose resume stringified JSON object is delimited in triple angle brackets.
    The resume is as follows:
    <<<
    ${JSON.stringify(resume)}
    >>>
    ${jobDescription?.length > 0 ? `The job description is delimited in triple curly brackets:
    {{{
    ${jobDescription}
    }}}`: ""}
    -----------------------------------------------------
    The cover letter should be in JSON Object with one key <coverLetter> and the value should be a string.
    `



    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
    });
    const result = chatCompletion.choices[0].message.content
    //@ts-ignore
    return NextResponse.json(JSON.parse(result ?? ""));

}

