"use client";
import React, { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import UserProtectWrapper from "@/components/UserProtectWrapper";

const LogoutPage = () => {
    const router = useRouter();
    const { setUser } = useUser();
    const token = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    useEffect(() => {
        const logoutUser = async () => {
            try {
                if (!token) {
                    router.push("/login");
                    return;
                }

                await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/logout`, {
                    headers: { authorization: `Bearer ${token}` },
                });
                
                localStorage.removeItem('user');
                setUser?.(null); // Clear user context
                router.push('/login');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        };

        logoutUser();
    }, [token, router, setUser]);

    return <div className="text-center mt-10 text-lg">Logging out...</div>;
};

const UserLogoutPage =()=>{
    return(
        <UserProtectWrapper>
            <LogoutPage/>
        </UserProtectWrapper>
    )
}
export default UserLogoutPage;
