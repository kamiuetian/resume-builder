"use client";
import React, { useState } from 'react'
import LoginLayout from "components/login/LoginLayout";
import StepOne from "components/login/StepOne";
import StepTwo from "components/login/StepTwo";


type Props = {}

export type UserCredentials = {
    email: string;
    password: string;
};

const InitialCredentials: UserCredentials = {
    email: "",
    password: ""
};


export default function Page({ }: Props) {

    const [currentStep, setCurrentStep] = useState(1);
    const [userInfo, setUserInfo] = useState<UserCredentials>(
        InitialCredentials
    );

    return (
        <LoginLayout>
            {currentStep === 1 && <StepOne updateStep={setCurrentStep} handler={{ userInfo, setUserInfo }} />}
            {currentStep === 2 && <StepTwo updateStep={setCurrentStep} handler={{ userInfo, setUserInfo }} />}
        </LoginLayout>
    )
}