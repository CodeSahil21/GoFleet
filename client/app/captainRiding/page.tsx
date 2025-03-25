'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import 'remixicon/fonts/remixicon.css';
import Link from 'next/link';
import FinishRide from '@/components/FinishRide';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const CaptainRidingPage = () => {
   const [finishRidePanel, setFinishRidePanel] = useState<boolean>(false);
   const finishRidePanelRef = useRef<HTMLDivElement>(null);

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

    return (
        <div className="h-screen w-screen relative">
            {/* Map Section */}
            <div className="h-4/5 w-full relative">
                <Image
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="Uber Map Image"
                    width={800}
                    height={800}
                />
                {/* Navigation Direction */}
                <div className="absolute top-5 left-4 right-4 bg-orange-500 text-white py-3 px-5 rounded-lg shadow-lg flex items-center gap-2 w-[90%] mx-auto">
                    <div className='flex items-center'>
                        <i className="ri-road-map-line text-xl"></i>   
                    </div>
                    <div className="leading-tight">
                        <p className="text-xs font-medium">Turn right at</p>
                        <p className="text-sm font-semibold">105 William St, Chicago, US</p>
                    </div>
                </div>
            </div>

            {/* Ride Details Section */}
            <div className="h-1/5 bg-white shadow-lg rounded-t-3xl p-5 flex flex-col gap-4">
                {/* Pickup Information */}
                <div className="flex items-center gap-3 border-b pb-2">
                    <div className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
                         <i className="ri-map-pin-2-fill text-lg"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-normal">4Km away</h3>
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
                    className="fixed  h-scrren w-screen  z-10 bottom-0 bg-white px-3 py-6 pt-12"
                    style={{ transform: 'translateY(100vh)' }}
                >
                    <FinishRide setFinishRidePanel={setFinishRidePanel} />
                </div>
        </div>
    );
};

export default CaptainRidingPage;
