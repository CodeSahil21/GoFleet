"use client";
import CaptainProtectWrapper from '@/components/CaptainProtectWrapper';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'remixicon/fonts/remixicon.css';
import CaptainDashBoard from '@/components/CaptainDashBoard';
import RidePopUp from '@/components/RidePopUp';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ConfirmRidePopup from '@/components/ConfirmRidePopup';
import { useEffect } from 'react';
const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState<boolean>(true); 
    const [ConfirmedRidePopupPanel,setConfirmedRidePopupPanel] = useState<boolean>(false);

    const confirmedRidePanelRef = useRef<HTMLDivElement>(null);
    const ridePopupPanelRef = useRef<HTMLDivElement>(null);

    // GSAP Animation Logic
    useGSAP(() => {
        if (ridePopupPanel) {
            // Slide up into view
            gsap.to(ridePopupPanelRef.current, {
                y: 0, // Move to the top of the screen
                duration: 0.5,
                ease: 'power2.out',
            });
        } else {
            // Slide down out of view
            gsap.to(ridePopupPanelRef.current, {
                y: '100vh', // Move completely off-screen
                duration: 0.5,
                ease: 'power2.in',
            });
        }
    }, [ridePopupPanel]);

    useGSAP(() => {
        if (ConfirmedRidePopupPanel) {
            // Slide up into view
            gsap.to(confirmedRidePanelRef.current, {
                y: 0, // Move to the top of the screen
                duration: 0.5,
                ease: 'power2.out',
            });
        } else {
            // Slide down out of view
            gsap.to(confirmedRidePanelRef.current, {
                y: '100vh', // Move completely off-screen
                duration: 0.5,
                ease: 'power2.in',
            });
        }
    }, [ConfirmedRidePopupPanel]);

    return (
        <CaptainProtectWrapper>
            <div className="h-screen w-screen">
                {/* Header */}
                <div className="fixed p-3 top-0 flex items-center justify-between w-full">
                    <Image
                        className="w-16 rounded-lg"
                        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                        alt="Uber Logo"
                        width={800}
                        height={800}
                    />
                    <Link href='/captain-Home' className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
                        <i className="ri-logout-box-r-line"></i>
                    </Link>
                </div>

                {/* Map */}
                <div className="h-3/5">
                    <Image
                        className="h-full w-full object-cover"
                        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                        alt="Uber Map Image"
                        width={800}
                        height={800}
                    />
                </div>

                {/* Dashboard */}
                <div className="h-2/5 w-full rounded-lg bg-white">
                    <CaptainDashBoard />
                </div>
                <div
                    ref={ridePopupPanelRef}
                    className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
                >
                    <RidePopUp setConfirmedRidePopupPanel={setConfirmedRidePopupPanel} setRidePopupPanel={setRidePopupPanel}  />
                </div>
                <div ref={confirmedRidePanelRef}
                    className="fixed  h-scrren w-screen  z-10 bottom-0 bg-white px-3 py-6 pt-12"
                    style={{ transform: 'translateY(100vh)' }}
                >
                   <ConfirmRidePopup setConfirmedRidePopupPanel={setConfirmedRidePopupPanel}  />
                </div>
            </div>
        </CaptainProtectWrapper>
    );
};

export default CaptainHome;
/*
<div ref={confirmedRidePanelRef}
                    className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
                >
                   <ConfirmRidePopup setConfirmedRidePopupPanel={setConfirmedRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
                </div>
*/