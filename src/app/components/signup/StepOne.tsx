import React from 'react'
import Link from 'next/link'
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
    firstName: string;
    lastName: string;
}


function StepOne({ updateStep, handler }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormProps>({
        defaultValues: { firstName: handler.userInfo.firstName, lastName: handler.userInfo.lastName }
    });
    function save(e: FormProps) {
        handler.setUserInfo({ ...handler.userInfo, ...e });
        updateStep(2)
    }

    return <React.Fragment>
        <h1 className="text-primary pb-2 text-4xl font-bold lg:text-5xl">
            Add your name
        </h1>
        <p className='text-lg font-medium text-gray-400 text-center mt-3'>We'll need some basic information to set up your account.<br />Let's get started on creating your resume! </p>
        <form
            onSubmit={handleSubmit(save)}
            className='flex flex-col w-full lg:space-y-6 space-y-3 mt-6'>
            <div className='flex flex-col mx-auto lg:w-96 md:w-80 w-72 '>
                <label className='text-gray-500'>First name</label>
                <input
                    {...register("firstName", { required: true })}
                    type="text" className='bg-gray-100 px-3 py-2 text-lg outline-none border-b-2 border-b-transparent focus:border-b-2 focus:border-b-blue-500' />
                {errors.firstName && <span className='text-sm font-semibold text-red-500'>Firstname is required</span>}

            </div>
            <div className='flex flex-col mx-auto lg:w-96 md:w-80 w-72 '>
                <label className='text-gray-500'>Last name</label>
                <input
                    {...register("lastName", { required: true })}
                    type="text" className='bg-gray-100 px-3 py-2 text-lg outline-none border-b-2 border-b-transparent focus:border-b-2 focus:border-b-blue-500' />
                {errors.lastName && <span className='text-sm font-semibold text-red-500'>Lastname is required</span>}
            </div>
            <div className="w-96 mx-auto flex justify-between mt-6">
                <Link
                    href="/sign-up"
                    className="bg-white px-6 py-2 font-semibold border-2 border-bg-main text-blue-500 rounded-md text-lg">Back</Link>
                <button
                    type='submit'
                    className="bg-main px-6 py-2 font-semibold border-2 border-bg-main text-white rounded-md text-lg">Continue</button>
            </div>
        </form>

    </React.Fragment>
}
export default StepOne;