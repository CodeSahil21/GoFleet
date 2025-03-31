'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import 'remixicon/fonts/remixicon.css';
import Link from 'next/link';
import { useRide } from '@/context/RideContext';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/context/SocketContext';
import LiveTracking from '@/components/LiveTracking'; 
const RidingPage = () => {
    const { rideData } = useRide(); // Access the ride data from the context
    const router = useRouter();
    const { socket } = useSocket(); // Access the socket instance from the context

    // Redirect to /home if rideData is not available
    useEffect(() => {
        if (!rideData) {
            router.push('/home'); // Redirect to /home if rideData is not available
        }
    }, [rideData, router]);

    // Listen for the "ride-ended" event
    useEffect(() => {
        if (socket) {
            socket.on("ride-ended", () => {
                router.push('/home'); // Navigate to /home when the ride ends
            });

            // Cleanup the listener on unmount
            return () => {
                socket.off("ride-ended");
            };
        }
    }, [socket, router]);

    if (!rideData) {
        return <p>Loading ride details...</p>; // Fallback if rideData is null
    }

    return (
        <div className="h-screen w-screen">
            <Link href='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-4-line"></i>
            </Link>
            <div className='h-1/2'>
                <LiveTracking /> {/* Live tracking component */}
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex justify-between items-center'>
                    <Image
                        className="h-12 rounded-lg"
                        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
                        alt="Uber Car Logo"
                        width={100}
                        height={800}
                    />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>{rideData.captain?.firstname} {rideData.captain?.lastname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>({rideData.captain?.vehicle?.plate})</h4>
                        <p className='text-sm text-gray-600'>Uber: {rideData.captain?.vehicle?.vehicleType}</p>
                    </div>
                </div>
                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-3 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-5-fill"></i>
                            <div>
                                <h3 className='tex-lg font-medium'>Drop-off</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{rideData.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 p-3'>
                            <i className="text-lg ri-money-rupee-circle-fill"></i>
                            <div>
                                <h3 className='tex-lg font-medium'>₹{rideData.fare}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Link href='/home' className='w-full mt-3 mb-2 flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg'>
                    Make a Payment
                </Link>
            </div>
        </div>
    );
};

export default RidingPage;