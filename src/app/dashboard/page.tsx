"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {}

async function Page({ }: Props) {
    const router = useRouter();
    router.push('/dashboard/my-account');
    return (
        <div>

        </div>
    )
}

export default Page
