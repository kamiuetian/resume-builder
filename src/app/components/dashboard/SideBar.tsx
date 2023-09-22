import React from 'react'
import Link from 'next/link';
type Props = {}

function SideBar({ }: Props) {
    return (
        <div className='flex justify-center mt-12'>
            <div>
                <Link href="/dashboard/my-account">
                    <p className="block text-start text-sm font-medium text-gray-500 hover:text-gray-900 py-2">
                        My Account
                    </p>
                </Link>
                <Link href="/dashboard/subscriptions">
                    <p className="block text-start text-sm font-medium text-gray-500 hover:text-gray-900 py-2">
                        Subscriptions
                    </p>
                </Link>

                <Link href="/dashboard/projects">
                    <p className="block text-start text-sm font-medium text-gray-500 hover:text-gray-900 py-2">
                        Resumes
                    </p>
                </Link></div>

        </div>

    )
}

export default SideBar