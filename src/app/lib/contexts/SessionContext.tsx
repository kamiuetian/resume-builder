"use client";
import React from 'react'
import { SessionProvider } from 'next-auth/react'

type Props = {
    session: any;
    children: React.ReactNode;
}

export default function SessionContext({ session, children }: Props) {
    return (
        <div>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </div>
    )
}