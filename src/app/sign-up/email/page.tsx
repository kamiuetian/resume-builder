"use client";

import React, { useState } from 'react'
import StepOne from 'components/signup/StepOne';
import StepTwo from 'components/signup/StepTwo'
import StepThree from 'components/signup/StepThree';
import SignupLayout from 'components/signup/SignupLayout';
import StepFour from 'components/signup/StepFour';

type Props = {}

export type UserInformation = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string | null;
};
const InitialUserInformation: UserInformation = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: null,
};


//Submit info to backend, generate a number and send it to the user email.
//User will enter the number and verify the email.
//User will be redirected to the login page.
//User will login and be redirected to the dashboard.



function Page() {
    const [currentStep, setCurrentStep] = useState(1);
    const [userInfo, setUserInfo] = useState<UserInformation>(
        InitialUserInformation
    );

    return (
        <SignupLayout>
            {currentStep === 1 && <StepOne updateStep={setCurrentStep} handler={{ userInfo, setUserInfo }} />}
            {currentStep === 2 && <StepTwo updateStep={setCurrentStep} handler={{ userInfo, setUserInfo }} />}
            {currentStep === 3 && <StepThree updateStep={setCurrentStep} handler={{ userInfo, setUserInfo }} />}
            {currentStep === 4 && <StepFour updateStep={setCurrentStep} handler={{ userInfo, setUserInfo }} />}
        </SignupLayout>
    );
}

export default Page