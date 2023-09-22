import React from 'react'
import { useForm } from "react-hook-form";

import type { UserInformation } from 'sign-up/email/page';


type Props = {
    handler: {
        userInfo: UserInformation;
        setUserInfo: React.Dispatch<React.SetStateAction<UserInformation>>;
    },
    updateStep: (step: number) => void
}

type FormProps = {
    email: string;
    password: string;
    confirmPassword: string;
}


function StepTwo({ updateStep, handler }: Props) {
    const [passwordNotMatch, setPasswordNotMatch] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormProps>({
        defaultValues: {
            email: handler.userInfo.email,
            password: handler.userInfo.password,
            confirmPassword: handler.userInfo.confirmPassword
        }
    });

    function save(e: FormProps) {
        if (e.password !== e.confirmPassword) {
            setPasswordNotMatch(true);
            return;
        }
        handler.setUserInfo({ ...handler.userInfo, ...e });
        updateStep(3);
    }

    return <React.Fragment>
        <h1 className="text-primary pb-2 text-4xl font-bold lg:text-5xl">
            Account Credentials
        </h1>
        <p className='text-lg font-medium text-gray-400 text-center mt-3'>
            Great! We're making progress. <br />
            Now, let's set up your account credentials to keep your information safe. </p>
        <form
            onSubmit={handleSubmit(save)}
            className='flex flex-col w-full lg:space-y-6 space-y-3 mt-6'>
            <div className='flex flex-col mx-auto lg:w-96 md:w-80 w-72 '>
                <label className='text-gray-500'>Email</label>
                <input
                    {...register("email", { required: true })}
                    type="text" className='bg-gray-100 px-3 py-2 text-lg outline-none border-b-2 border-b-transparent focus:border-b-2 focus:border-b-blue-500' />
                {errors.email && <span className='text-sm font-semibold text-red-500'>Email is required</span>}

            </div>
            <div className='flex flex-col mx-auto lg:w-96 md:w-80 w-72 '>
                <label className='text-gray-500'>Password</label>
                <input
                    onKeyDown={() => setPasswordNotMatch(false)}
                    type="password"
                    {...register("password", { required: true })}
                    className='bg-gray-100 px-3 py-2 text-lg outline-none border-b-2 border-b-transparent focus:border-b-2 focus:border-b-blue-500' />
                {errors.password && <span className='text-sm font-semibold text-red-500'>Password is required</span>}
            </div>
            <div className='flex flex-col mx-auto lg:w-96 md:w-80 w-72 '>
                <label className='text-gray-500'>Confirm Password</label>
                <input
                    onKeyDown={() => setPasswordNotMatch(false)}
                    {...register("confirmPassword", { required: true })}
                    type="password" className='bg-gray-100 px-3 py-2 text-lg outline-none border-b-2 border-b-transparent focus:border-b-2 focus:border-b-blue-500' />
                {passwordNotMatch && <span className='text-sm font-semibold text-red-500'>Passwords does not match</span>}
            </div>
            <div className=" mx-auto w-96 flex justify-between mt-6">
                <button
                    onClick={() => updateStep(1)}
                    className="bg-white px-6 py-2 font-semibold border-2 border-blue-500 text-blue-500 rounded-md text-lg">Back</button>
                <button
                    type='submit'
                    className="bg-blue-600 px-6 py-2 font-semibold border-2 border-blue-500 text-white rounded-md text-lg">Continue</button>
            </div>
        </form>

    </React.Fragment>
}

export default StepTwo