"use client";
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import useSWR from 'swr'
import Link from 'next/link';
import SideBar from 'components/dashboard/SideBar';


async function fetcher(url: string) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}


export default function Page() {
    const { data: session } = useSession();
    const router = useRouter();
    if (!session) {
        router.push('/login');
        return;
    }


    return (
        <div className="grid grid-cols-[1fr,5fr] divide-x divide-gray-200">
            <SideBar />

            <form className='w-[80%] mx-auto my-12 pl-8'>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Billing overview</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            You'll be billed after 30 days from subscription day.
                        </p>

                        <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-6">


                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Current plan
                                </label>
                                <div className="mt-2">
                                    {/* <p className="mt-1 text-sm leading-6 text-gray-600">{data.email}</p> */}

                                    {/* <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className='shadow shadow-blue-300 w-full px-3 py-2 outline-none border-b-2 border-b-transparent focus:border-b-2 focus:border-b-blue-500'
                                /> */}
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Next Renewal
                                </label>
                                {/* <p className="mt-1 text-sm leading-6 text-gray-600">{data.phone_number ?? "Phone number is not available"}</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}