import Loading from 'components/dashboard/LoadingMyAccount';
import SideBar from 'components/dashboard/SideBar';
import React from 'react'
import useSWR from 'swr';

type Props = {
    userEmail: string
}
async function fetcher(url: string) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export default function ProtectedPage({ userEmail }: Props) {
    const { isLoading, data, error } = useSWR('/api/user?email=' + userEmail, fetcher);
    if (isLoading) {
        return <Loading />
    }
    if (error) {
        return <div>Error</div>
    }

    return (
        <div className="grid grid-cols-[1fr,5fr] divide-x divide-gray-200">
            <SideBar />

            <form className='w-[80%] mx-auto my-12 pl-8'>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>

                        <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4 lg:col-span-2">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <p className="mt-1 text-sm leading-6 text-gray-600">{data.first_name}</p>
                                    {/* <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="username"
                                    className='shadow shadow-blue-300 w-full px-3 py-2 outline-none border-b-2 border-b-transparent focus:border-b-2 focus:border-b-blue-500'
                                    placeholder=""
                                /> */}
                                </div>
                            </div>
                            <div className="sm:col-span-4 lg:col-span-2">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <p className="mt-1 text-sm leading-6 text-gray-600">{data.last_name}</p>
                                    {/* <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="username"
                                    className='shadow shadow-blue-300 w-full px-3 py-2 outline-none border-b-2 border-b-transparent focus:border-b-2 focus:border-b-blue-500'
                                    placeholder=""
                                /> */}
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <p className="mt-1 text-sm leading-6 text-gray-600">{data.email}</p>

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
                                    Phone
                                </label>
                                <p className="mt-1 text-sm leading-6 text-gray-600">{data.phone_number ?? "Phone number is not available"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 items-center justify-end gap-x-6 hidden">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}