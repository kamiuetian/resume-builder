import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
    isOpen: boolean;
    setShowSignUpModal: any;
    setShowLoginModal: any;
}


type FormType = {
    email: string;
    password: string;
}

const LoginModal = ({ isOpen, setShowLoginModal, setShowSignUpModal }: Props) => {
    // Add 'overflow-hidden' to body when modal is open,
    const ref = useRef(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormType>();
    const [loginProgress, setLoginProgress] = React.useState(false);
    const [loginFailed, setLoginFailed] = React.useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            if (ref.current) {
                // @ts-ignore
                ref.current.click();
            }
        }
    }, []);
    function showSignUpModal() {
        setShowLoginModal(false);
        setShowSignUpModal(true);
    }
    async function authenticateUser(e: FormType) {
        setLoginProgress(true);
        const data = await signIn("credentials", { email: e.email, password: e.password, redirect: false });
        if (data?.error === null) {
            //User logged in successfully. 
            router.push('/resume-builder');
            // setShowLoginModal(false);
            // setShowSignUpModal(false);
            setLoginProgress(false);
        }
        else {
            setLoginFailed(true);
            setLoginProgress(false);
        }
    }

    async function signInWithGoogle() {
        const production = process.env.NODE_ENV === "production";

        if (production) {
            await signIn("google", { callbackUrl: "https://builder.instantjobcv.com?auth=google" });
            return;
        }
        await signIn("google", { callbackUrl: "https://builder.instantjobcv.com?auth=google" });
    }

    // to prevent background from being scrollable
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        // Modal overlay
        <div className="fixed inset-0 z-50 overflow-auto bg-white bg-opacity-50 flex backdrop-blur-sm">
            {/* Modal */}
            <div className="relative p-6 bg-white w-full max-w-md m-auto flex-col flex">
                {/* Content */}
                <div className="modal-content">
                    <div className=''>
                        <div className='w-fit'>
                            <div
                                onClick={() => setShowLoginModal(false)}
                                className="ml-auto w-8 h-8 p-1 cursor-pointer hover:text-black text-gray-400">
                                <svg
                                    focusable="false"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-label="Close"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </div>
                            <h2 className="text-primary cursor-default text-center pb-2 text-4xl font-bold lg:text-5xl whitespace-nowrap">
                                Log in
                            </h2>
                            <div>
                                <p className="text-lg font-medium cursor-default text-gray-400 text-center mt-3">
                                    We are happy to see you back!
                                </p>
                                <div className="flex flex-col items-center">
                                    <button
                                        onClick={signInWithGoogle}
                                        className="mt-4 text-md inline-flex w-96 cursor-pointer items-center rounded-lg bg-gray-100 px-10 py-4 font-semibold text-gray-800 hover:bg-gray-200 active:bg-gray-300">
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

                                    <p className="text-lg font-medium text-gray-400 text-center mt-3">
                                        <span className="text-black">OR</span><br />
                                        Login with your email
                                    </p>
                                    <form
                                        onSubmit={handleSubmit(authenticateUser)}
                                        className='flex flex-col w-full lg:space-y-6 space-y-3 mt-6'>
                                        <div className='flex flex-col mx-auto lg:w-96 md:w-80 w-72 '>
                                            <label className='text-gray-500'>Email</label>
                                            <input
                                                {...register("email", { required: true })}
                                                type="text" className='bg-gray-100 px-3 py-2 text-lg outline-none border-b-2 border-b-transparent focus:border-b-2 focus:border-b-blue-500' />
                                            {errors.email && <span className='text-sm font-semibold text-red-500'>Firstname is required</span>}

                                        </div>
                                        <div className='flex flex-col mx-auto lg:w-96 md:w-80 w-72 '>
                                            <label className='text-gray-500'>Password</label>
                                            <input
                                                {...register("password", { required: true })}
                                                type="password" className='bg-gray-100 px-3 py-2 text-lg outline-none border-b-2 border-b-transparent focus:border-b-2 focus:border-b-blue-500' />
                                            {errors.password && <span className='text-sm font-semibold text-red-500'>Lastname is required</span>}
                                            {loginFailed && <span className='text-sm font-semibold text-red-500'>Invalid email or password</span>}

                                        </div>
                                        <div className='flex flex-col mx-auto lg:w-96 md:w-80 w-72 '>
                                            <p className='text-gray-500 font-semibold'>Don't have an account? Click<span onClick={showSignUpModal} className='text-blue-500 cursor-pointer hover:text-blue-600'> here</span></p>
                                        </div>

                                        <div className='flex justify-center'>

                                            {
                                                loginProgress ?

                                                    <button disabled type="button" className="opacity-70 bg-main w-fit mx-auto px-12 py-2 font-semibold border-2 border-bg-main text-white rounded-md text-lg">
                                                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                        </svg>
                                                        Signing in...
                                                    </button>
                                                    :
                                                    <button
                                                        type='submit'
                                                        className="bg-main w-fit mx-auto px-12 py-2 font-semibold border-2 border-bg-main text-white rounded-md text-lg">Continue</button>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LoginModal;