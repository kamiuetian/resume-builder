import React from 'react'
import { useForm } from "react-hook-form";
import type { UserCredentials } from 'login/email/page';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {
    handler: {
        userInfo: UserCredentials;
        setUserInfo: React.Dispatch<React.SetStateAction<UserCredentials>>;
    },
    updateStep: (step: number) => void
}

type FormProps = {
    password: string;
}

function StepTwo({ updateStep, handler }: Props) {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<FormProps>({ defaultValues: { password: handler.userInfo.password } });
    const [loginFailed, setLoginFailed] = React.useState(false);
    const [loggingProgress, setLoggingProgress] = React.useState(false);


    async function handleLogin(e: FormProps) {
        setLoggingProgress(true);
        setLoginFailed(false);
        const loginInfo = { email: handler.userInfo.email, password: e.password };
        const data = await signIn('credentials', { ...loginInfo, redirect: false });
        if (data?.error === null) {
            //User logged in successfully. 
            router.push('/resume-builder');
        }
        else {
            setLoginFailed(true);
        }
        setLoggingProgress(false);
    }

    return <React.Fragment>
        <h1 className="text-main pb-2 text-4xl font-bold lg:text-5xl">
            Log In
        </h1>
        <p className='text-lg font-medium text-gray-400 text-center mt-3'>
            Enter your password </p>
        <form
            onSubmit={handleSubmit(handleLogin)}
            className='flex flex-col w-full lg:space-y-6 space-y-3 mt-6'>
            <div className='flex flex-col mx-auto lg:w-96 md:w-80 w-72 '>
                <label className='text-gray-500'>Password</label>
                <input
                    {...register("password", { required: true })}
                    type="password" className='bg-gray-100 px-3 py-2 text-lg outline-none border-b-2 border-b-transparent focus:border-b-2 focus:border-b-blue-500' />
                {errors.password && <span className='text-sm font-semibold text-red-500'>Password is required</span>}
                {loginFailed && <span className='text-sm font-semibold text-red-500'>Invalid email or password</span>}
            </div>

            <div className="w-96 mx-auto flex justify-between mt-6">
                <button
                    onClick={() => { updateStep(1) }}
                    className="bg-white px-6 py-2 font-semibold border-2 border-bg-main text-blue-500 rounded-md text-lg">Back</button>

                {
                    loggingProgress ? (<button disabled
                        type="button"
                        className="bg-main px-6 py-2 font-semibold border-2 border-bg-main text-white rounded-md text-lg text-center ">

                        Signing in...
                    </button>) : (<button
                        type='submit'
                        className="bg-main px-6 py-2 font-semibold border-2 border-bg-main text-white rounded-md text-lg">Continue</button>
                    )
                }

            </div>
        </form>

    </React.Fragment>
}




export default StepTwo;