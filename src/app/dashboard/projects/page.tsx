"use client";
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import ProtectedPage from './ProtectedPage';





export default function Page() {
    const { data: session } = useSession();
    const router = useRouter();
    if (!session) {
        router.push('/login');
        return;
    }

    let userEmail = "";
    if (session.user) {
        userEmail = session.user.email as string;
    }

    return <ProtectedPage userEmail={userEmail} />
}