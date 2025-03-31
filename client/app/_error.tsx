'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const GlobalErrorHandler = ({ error }: { error: Error }) => {
    const router = useRouter();

    useEffect(() => {
        console.error('Global error:', error);

        // Check user role from localStorage or context
        const userToken = localStorage.getItem('user');
        const captainToken = localStorage.getItem('captain');

        if (captainToken) {
            router.push('/captain-Home');
        } else if (userToken) {
            router.push('/home');
        } else {
            router.push('/login');
        }
    }, [error, router]);

    return (
        <div className="h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold">Something went wrong!</h1>
        </div>
    );
};

export default GlobalErrorHandler;
