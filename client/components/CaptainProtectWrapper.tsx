"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCaptain } from "@/context/CaptainContext";

interface CaptainProtectWrapperProps {
    children: React.ReactNode;
}

const CaptainProtectWrapper: React.FC<CaptainProtectWrapperProps> = ({ children }) => {
    const router = useRouter();
    const { captain, setCaptain } = useCaptain();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window === "undefined") return; // Ensure client-side execution

        const token = localStorage.getItem("captain");

        if (!token) {
            setIsLoading(false);
            router.replace("/captain-Login");
            return;
        }

        const fetchCaptainProfile = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/captains/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    const { id, firstname, lastname, email, vehicle } = response.data.captain;
                    setCaptain?.({ id, firstname, lastname, email, vehicle });
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                localStorage.removeItem("captain");
                setCaptain?.(null);
                router.replace("/captain-Login");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCaptainProfile();
    }, [router, setCaptain]);

    if (isLoading) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectWrapper;
