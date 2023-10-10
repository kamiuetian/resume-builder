import React from 'react'
import Link from 'next/link'
import { set, useForm } from "react-hook-form";
import type { UserCredentials } from 'login/email/page';


type Props = {
    handler: {
        userInfo: UserCredentials;
        setUserInfo: React.Dispatch<React.SetStateAction<UserCredentials>>;
    },
    updateStep: (step: number) => void
}

type FormProps = {
    email: string;
}


function StepOne({ updateStep, handler }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormProps>({ defaultValues: { email: handler.userInfo.email } });

    function save(e: FormProps) {
        handler.setUserInfo({ ...handler.userInfo, ...e });
        updateStep(2)
    }

    return <React.Fragment>
        <h1 className="text-main pb-2 text-4xl font-bold lg:text-5xl">
            Log In

        </h1>
        <p className='text-lg font-medium text-gray-400 text-center mt-3'>
            Enter your email </p>
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

            <div className="w-96 mx-auto flex justify-between mt-6">
                <Link
                    href="/sign-up"
                    className="bg-white px-6 py-2 font-semibold border-2 border-bg-main text-blue-500 rounded-md text-lg">Back</Link>
                <button
                    type='submit'
                    className="bg-main px-6 py-2 font-semibold border-2 border-bg-main text-white rounded-md text-lg">Continue</button>
            </div>
        </form>
    <p className='mt-10 text-blue-500 cursor-pointer'>Forgot Password</p>
    </React.Fragment>
}
export default StepOne;