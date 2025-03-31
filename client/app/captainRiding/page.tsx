'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import 'remixicon/fonts/remixicon.css';
import Link from 'next/link';
import FinishRide from '@/components/FinishRide';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRide } from '@/context/RideContext'; // Import RideContext
import {useRouter} from 'next/navigation'; // Import useRouter
import { useEffect } from 'react';
import LiveTracking from '@/components/LiveTracking'; 
const CaptainRidingPage = () => {
    const { rideData } = useRide(); // Access rideData from RideContext
    const [finishRidePanel, setFinishRidePanel] = useState<boolean>(false);
    const finishRidePanelRef = useRef<HTMLDivElement>(null);
    const router = useRouter(); // Initialize router for navigation
    useGSAP(() => {
        if (finishRidePanel) {
            // Slide up into view
            gsap.to(finishRidePanelRef.current, {
                y: 0, // Move to the top of the screen
                duration: 0.5,
                ease: 'power2.out',
            });
        } else {
            // Slide down out of view
            gsap.to(finishRidePanelRef.current, {
                y: '100vh', // Move completely off-screen
                duration: 0.5,
                ease: 'power2.in',
            });
        }
    }, [finishRidePanel]);

   useEffect(() => {
           if (!rideData) {
               router.push('/captain-Home'); // Redirect to /home if rideData is not available
           }
       }, [rideData, router]);

    return (
        <div className="h-screen w-screen relative ">
            {/* Map Section */}
            <div className="h-[75%] w-full relative">
                <LiveTracking /> {/* Ensure this component is not unmounted */}
                {/* Navigation Direction */}
                <div className="absolute top-5 left-4 right-4 bg-orange-500 text-white py-3 px-5 rounded-lg shadow-lg flex items-center gap-2 w-[90%] mx-auto">
                    <div className='flex items-center'>
                        <i className="ri-road-map-line text-xl"></i>   
                    </div>
                    <div className="leading-tight">
                        <p className="text-xs font-medium">Pick Up:</p>
                        <p className="text-sm font-semibold"> {rideData?.pickup || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Ride Details Section */}
            <div className="h-[25%] bg-white shadow-lg rounded-t-3xl p-5 flex flex-col gap-4 ">
                {/* Pickup Information */}
                <div className="flex items-center gap-3 border-b pb-2">
                    <div className="bg-orange-500 text-white w-auto h-8 flex items-center justify-center rounded-full">
                         <i className="ri-map-pin-2-fill text-lg"></i>
                    </div>
                    <div>
                        <h3 className="text-base font-normal">{rideData?.destination || 'N/A'}</h3>
                    </div>
                </div>
                {/* Confirm Button */}
                <button 
                    onClick={() => setFinishRidePanel(true)}
                    className="w-full bg-green-600 text-white font-normal py-2 rounded-lg text-lg shadow-md transition-all duration-300 hover:bg-green-700">
                    Complete Ride
                </button>
            </div>

            {/* Finish Ride Panel */}
            <div ref={finishRidePanelRef}
                    className="fixed  h-screen w-screen  z-10 bottom-0 bg-white px-3 py-6 pt-12"
                    style={{ transform: 'translateY(100vh)' }}
                >
                    <FinishRide setFinishRidePanel={setFinishRidePanel} />
                </div>
        </div>
    );
};

export default CaptainRidingPage;
