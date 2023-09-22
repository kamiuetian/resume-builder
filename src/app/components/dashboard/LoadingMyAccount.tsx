
import SideBar from 'components/dashboard/SideBar';
import React from 'react'

type Props = {}

function Loading({ }: Props) {
    return (
        <div className="grid grid-cols-[1fr,5fr] divide-x divide-gray-200">
            <SideBar />

            <form className='w-[80%] mx-auto my-12 pl-8'>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 rounded-md  w-16 h-4 animate-pulse bg-gray-300"></h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600 rounded-md w-56 h-6 animate-pulse bg-gray-300">

                        </p>

                        <div className="mt-10 grid grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4 lg:col-span-2">
                                <label htmlFor="username" className="block rounded-md text-sm font-medium leading-6 w-16 h-4 animate-pulse bg-gray-300">
                                </label>
                                <div className="mt-2 w-40 rounded-md h-4 animate-pulse bg-gray-300">
                                </div>
                            </div>
                            <div className="sm:col-span-4 lg:col-span-2">
                                <label htmlFor="username" className="block rounded-md text-sm font-medium leading-6 w-16 h-4 animate-pulse bg-gray-300">
                                </label>
                                <div className="mt-2 w-40 rounded-md h-4 animate-pulse bg-gray-300">
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block rounded-md text-sm font-medium leading-6 w-44 h-4 animate-pulse bg-gray-300">
                                </label>
                                <div className="mt-2 w-72 rounded-md h-4 animate-pulse bg-gray-300">
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="username" className="block rounded-md text-sm font-medium leading-6 w-16 h-4 animate-pulse bg-gray-300">
                                </label>
                                <div className="mt-2 w-40 rounded-md h-4 animate-pulse bg-gray-300">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Loading;