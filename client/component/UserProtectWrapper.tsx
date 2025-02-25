'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface UserProtectWrapperProps {
    children: React.ReactNode;
}

const UserProtectWrapper: React.FC<UserProtectWrapperProps> = ({ children }) => {
    const router = useRouter();
    const { user, setUser } = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window === "undefined") return; // Ensure code runs on client-side

        const token = localStorage.getItem('user');

        // If no token, prevent API call and redirect immediately
        if (!token) {
            setIsLoading(false);
            router.replace('/login');
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    const { firstname, lastname, email } = response.data.user;
                    setUser?.({ firstname, lastname, email });
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                localStorage.removeItem('user');
                setUser?.(null); // Clear user state
                router.replace('/login'); 
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [router, setUser]); 

    if (isLoading) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }

    return <>{children}</>;
};

export default UserProtectWrapper;
