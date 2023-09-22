import React, { useState } from "react";
import type { UserInformation } from "sign-up/email/page";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'


type Props = {
    handler: {
        userInfo: UserInformation;
        setUserInfo: React.Dispatch<React.SetStateAction<UserInformation>>;
    };
    updateStep: (step: number) => void;
};


function StepThree({ updateStep, handler }: Props) {
    const router = useRouter();
    const [phoneInput, setPhoneInput] = useState("");
    const [signingupProgress, setSigningupProgress] = useState(false);
    const [errorSigningup, setErrorSigningUp] = useState("");


    // Function to skip phone number
    function skipPhone() {
        signup({ ...handler.userInfo });
    }
    //Function when continue button is clicked
    function save() {
        if (phoneInput !== null && phoneInput.length > 0) {
            signup({ ...handler.userInfo, phoneNumber: phoneInput });
        }
        else {
            signup({ ...handler.userInfo });
        }
    }

    async function signup(data: UserInformation) {
        // Send data to the serverless function
        setSigningupProgress(true);
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const json = await res.json();

        if (json.status === "success" && json.codeSent) {
            updateStep(4);
        }
        else if (json.status === "error") {
            setErrorSigningUp(json.message);
        }
        setSigningupProgress(false);
    }




    return (
        <React.Fragment>
            <h1 className="text-primary pb-2 text-4xl font-bold lg:text-5xl">
                Contact Information
            </h1>
            <p className="text-lg font-medium text-gray-400 text-center mt-3">
                We'll only use this information for resume-related communication.
            </p>

            <div
                className="flex flex-col w-full lg:space-y-6 space-y-3 mt-6"
            >
                <div className="flex flex-col mx-auto lg:w-96 md:w-80 w-72 ">
                    <label className="text-gray-500">Phone (Optional)</label>
                    <input
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        type="text"
                        name="phone"
                        className="bg-gray-100 px-3 py-2 text-lg outline-none border-b-2 border-b-transparent focus:border-b-2 focus:border-b-blue-500"
                    />
                    {errorSigningup && (
                        <span className="text-sm font-semibold text-red-500">
                            {errorSigningup}
                        </span>
                    )}
                </div>
            </div>
            <div className="w-96 flex justify-between mt-6">
                <button
                    onClick={() => updateStep(2)}
                    className="bg-white px-6 py-2 font-semibold border-2 border-blue-500 text-blue-500 rounded-md text-lg"
                >
                    Back
                </button>

                {
                    signingupProgress ? (<button disabled type="button" className="bg-blue-600 px-6 py-2 font-semibold border-2 border-blue-500 text-white rounded-md text-lg text-center ">
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        Signing up...
                    </button>) : (phoneInput.length === 0 ? (
                        <button
                            onClick={skipPhone}
                            className="bg-blue-600 px-6 py-2 font-semibold border-2 border-blue-500 text-white rounded-md text-lg"
                        >
                            Skip
                        </button>
                    ) : (
                        <button
                            onClick={save}
                            className="bg-blue-600 px-6 py-2 font-semibold border-2 border-blue-500 text-white rounded-md text-lg"
                        >
                            Continue
                        </button>
                    ))
                }


            </div>
        </React.Fragment>
    );
}

export default StepThree;
