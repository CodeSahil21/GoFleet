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
                    className="w-16 rounded-lg"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAjVBMVEX/zQkAAAD/0wn/0Qn/1An/zwmFawQvJQFzXQOJbwW4lQb9ywldSgOfgAUjHABoUwNHOAKRdAXUqgduWAPywwjarwdhTgPZrgfFnwa9mAbjtgghGgHrvQiBZwQZEwBOPwKnhgUqIQG1kQYdFwDOpQc5LgEMCAB6YQRVRAOXeQUzKQEJBgA4LQEuJAGVdwVJ7X0BAAAEFUlEQVR4nO3a61biShCG4djdBULYIILIUQWGQefg/V/ebAhJV4dEWTOzlGbe55dUQkx9pnPomCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPyzxJXIZ+/Rh5P7US8wmv5zIdjxVcm9/ex9+mjHGdyRARlcQgZi3pb3Z/OC+1LOYOryZf7kaNUmpObXSbjipyUpt4vGWxZP2a7ZSf/gdVDOYPuaL0vydu146zehrhsy979uu6vbVV5YtD8rBLsqd1TSc/v1TPed9fZu8zZk+OCrN745M/Llx13Z+EQb5uPb37Ptd9oa7DOQ6SkRXLWKNqweMU952UxUdb47PMx1xZc/2IkZmKeTMtj4o940VH2Y1SX96murfcsRZeAeT8rgyg99Sb/5ci9rz219qZOV4slAhqdF4I/60mgY78a+vVWVeZZWPBm8u1buWfVhWr7eTSURWfrC6rBiPBm4o+thnaG6DurR0HKJe/UfR8VZ8hwyOOXaGJzLusfWfqm+yAfH/r3Rl5YiqnPIQObtycHY787NOC+2d5d83cyLM0fU2eLaqY3r0XBj1Gm1XbR7DhkkYnPuv2J3Oq6o2lIvFQ/KYp6LxQ+pujMORoOKYOC7PYsMPKMzCJZY30pTKiZM9N3DF51RMBoKX9VJI4oMRMSqkVx5Q6vvIlvm/28UPTp1BBUm+uIRQQaSpmniF4R/5oLdFCts0h0pvt48imCge40hA/v8MOt+Lxas08q5Q9P3Lc5ms/WmSMrelyN4GOpNRJHBTdDAdfV+ljvt+tVcP1wUjIQoM5hUP+NLEj5aqwxEwtFQSjHCDIY10+hmUZdB6RhZlrYQRQYb3cGobjdLk4wP6nARp2MchFfdKDKQl4aa+lnV7aakfqVma9FXGZjwbnwc31hIjD6pzaWO6xUrrcWpbmQeRFC6LMSRQSL+UH62aR1Rf+1bfeI05dmXQXTXhSCD71f11DKdQcUk3CS2e6QggxOpDGzFXGwwGi4/A5GqechBZM8Lf5aB2qTWju3Z+Q8y0CNhqU4M6uH50jMQ/dWJ6/gPvfOaR/L+egbmRXdt9Y1CMRouPAN7p2pzSZw+OeSjIboMOpN2LdVgloGIetTYv3sxqpD/hugyaKip1hI9c55lYNTrhMd9e8GBsTqfd23K+xks6vdSVH/7DIJH5mk2OoLZxWw0XHIGkvzwhZfD5iSZ+eLobN47K381A/1K4of4f09RB8J+NFxwBsGLBfX8oFrOXj2fWQb2ad3MLPUdvXSWh3K3/0YG09lhreb6ThJ5zL/U7LZ0oMNvP4sF293x0ujmH1/PIIMav/ePuKn/KdiAVK5zRopZoZPKdV+W8FPdxvIlp20dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICY/QJBtD9XALSq7AAAAABJRU5ErkJggg=="
                    alt="Drive Logo"
                    width={800}
                    height={800}
                 />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>{rideData.captain?.firstname} {rideData.captain?.lastname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>({rideData.captain?.vehicle?.plate})</h4>
                        <p className='text-sm text-gray-600'>GoFleet: {rideData.captain?.vehicle?.vehicleType}</p>
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