"use client";
import React, { useEffect } from "react";
import { useCaptain } from "@/context/CaptainContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import CaptainProtectWrapper from "@/component/CaptainProtectWrapper";

const LogoutPage = () => {
    const router = useRouter();
    const { setCaptain } = useCaptain();
    const token = typeof window !== "undefined" ? localStorage.getItem("captain") : null;

    useEffect(() => {
        const logoutCaptain = async () => {
            try {
                if (!token) {
                    router.push("/captain-Login");
                    return;
                }

                await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/captains/logout`, {
                    headers: { authorization: `Bearer ${token}` },
                });

                localStorage.removeItem("captain");
                setCaptain?.(null); // Clear captain state
                router.push("/captain-Login");
            } catch (error) {
                console.error("Logout failed:", error);
            }
        };

        logoutCaptain();
    }, [token, router, setCaptain]);

    return <div className="text-center mt-10 text-lg">Logging out...</div>;
};


const CaptainLogoutPage = () => {
    return (
        <CaptainProtectWrapper>
            <LogoutPage />
        </CaptainProtectWrapper>
    );
};

export default CaptainLogoutPage;

