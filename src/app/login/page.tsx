"use client";
import React from "react";
import SignupLayout from "components/signup/SignupLayout";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

type Props = {};


async function LogInWithGoogle() {
    const production = process.env.NODE_ENV === "production";

    if (production) {
        await signIn("google", { callbackUrl: "http://builder.instantjobcv.com?auth=google" });
        return;
    }
    await signIn("google", { callbackUrl: "http://builder.instantjobcv.com?auth=google" });
}


function Page({ }: Props) {
    return (
        <SignupLayout>
            <h1 className="text-primary pb-2 text-4xl font-bold lg:text-5xl">
                Log In

            </h1>
            <p className="text-lg font-medium text-gray-400 text-center mt-3">
                We are happy to see you back!
            </p>
            <button onClick={() => LogInWithGoogle()} className="mt-4 text-md inline-flex w-96 cursor-pointer items-center rounded-lg bg-gray-100 px-10 py-4 font-semibold text-gray-800 hover:bg-gray-200 active:bg-gray-300">
                <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="absolute h-5 w-5 text-blue-600 sm:h-6 sm:w-6"
                    viewBox="0 0 48 48"
                >
                    <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                </svg>
                <span className="pl-10 sm:text-lg">Google</span>
                <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-auto h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                    ></path>
                </svg>
            </button>

            <Link href="/login/email" className="mt-4 text-md inline-flex w-96 cursor-pointer items-center rounded-lg bg-gray-100 px-10 py-4 font-semibold text-gray-800 hover:bg-gray-200 active:bg-gray-300">
                <Image
                    className="h-8 w-fit"
                    src="/assets/email-icon.png"
                    width={200}
                    height={300}
                    alt="icon"
                />
                <span className="pl-4 sm:text-lg">Email</span>
                <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-auto h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                    ></path>
                </svg>
            </Link>
        </SignupLayout>
    );
}

export default Page;
