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
import { useSocket } from '@/context/SocketContext';
import { useCaptain } from '@/context/CaptainContext';
import axios from 'axios';

interface User {
    id: number;
    firstname: string;
    lastname?: string | null;
    email: string;
}

interface Ride {
    id: number;
    userId: number;
    captainId?: number | null;
    pickup: string;
    destination: string;
    fare: number;
    status: 'PENDING' | 'ACCEPTED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
    duration?: number | null;
    distance?: number | null;
    paymentID?: string | null;
    orderId?: string | null;
    signature?: string | null;
    otp: string;
    user?: User; // Include user details as per the Prisma query
}

const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState<boolean>(false);
    const [ConfirmedRidePopupPanel, setConfirmedRidePopupPanel] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const confirmedRidePanelRef = useRef<HTMLDivElement>(null);
    const ridePopupPanelRef = useRef<HTMLDivElement>(null);

    const { socket } = useSocket();
    const { captain } = useCaptain();
    const [ride, setRide] = useState<Ride | null>(null);

    const handleError = (error: string) => {
        // Log error silently or send to a monitoring service
        console.debug(error);
    };

    useEffect(() => {
        if (socket && captain) {
            socket.emit('join', {
                userId: captain.id,
                userType: 'captain',
            });

            const updateLocation = () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            socket.emit('update-location-captain', {
                                userId: captain.id,
                                location: { ltd: latitude, lng: longitude },
                            });
                            setIsLoading(false);
                        },
                        (error) => {
                            handleError(`Error fetching location: ${error.message}`);
                            setIsLoading(false);
                        }
                    );
                } else {
                    handleError('Geolocation is not supported by this browser.');
                    setIsLoading(false);
                }
            };

            updateLocation();
        }

        if (socket) {
            socket.on('new-ride', (data) => {
                setRide(data);
                setRidePopupPanel(true);
            });
        }

        return () => {
            if (socket) {
                socket.off('new-ride');
            }
        };
    }, [socket, captain]);

    const confirmRide = async () => {
        if (!ride || !ride.id) {
            handleError("No ride to confirm");
            return;
        }
        try {
            const token = localStorage.getItem('captain');
            if (!token) {
                handleError("Captain token is missing");
                return;
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/rides/confirm`,
                { rideId: ride.id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                setRidePopupPanel(false);
                setConfirmedRidePopupPanel(true);
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                handleError(`Error confirming ride: ${JSON.stringify(error.response.data)}`);
            } else {
                handleError(`Error confirming ride: ${error}`);
            }
        }
    };

    useGSAP(() => {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
            });
        } else {
            gsap.to(ridePopupPanelRef.current, {
                y: '100vh',
                duration: 0.5,
                ease: 'power2.in',
            });
        }
    }, [ridePopupPanel]);

    useGSAP(() => {
        if (ConfirmedRidePopupPanel) {
            gsap.to(confirmedRidePanelRef.current, {
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
            });
        } else {
            gsap.to(confirmedRidePanelRef.current, {
                y: '100vh',
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
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAjVBMVEX/zQkAAAD/0wn/0Qn/1An/zwmFawQvJQFzXQOJbwW4lQb9ywldSgOfgAUjHABoUwNHOAKRdAXUqgduWAPywwjarwdhTgPZrgfFnwa9mAbjtgghGgHrvQiBZwQZEwBOPwKnhgUqIQG1kQYdFwDOpQc5LgEMCAB6YQRVRAOXeQUzKQEJBgA4LQEuJAGVdwVJ7X0BAAAEFUlEQVR4nO3a61biShCG4djdBULYIILIUQWGQefg/V/ebAhJV4dEWTOzlGbe55dUQkx9pnPomCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPyzxJXIZ+/Rh5P7US8wmv5zIdjxVcm9/ex9+mjHGdyRARlcQgZi3pb3Z/OC+1LOYOryZf7kaNUmpObXSbjipyUpt4vGWxZP2a7ZSf/gdVDOYPuaL0vydu146zehrhsy979uu6vbVV5YtD8rBLsqd1TSc/v1TPed9fZu8zZk+OCrN745M/Llx13Z+EQb5uPb37Ptd9oa7DOQ6SkRXLWKNqweMU952UxUdb47PMx1xZc/2IkZmKeTMtj4o940VH2Y1SX96murfcsRZeAeT8rgyg99Sb/5ci9rz219qZOV4slAhqdF4I/60mgY78a+vVWVeZZWPBm8u1buWfVhWr7eTSURWfrC6rBiPBm4o+thnaG6DurR0HKJe/UfR8VZ8hwyOOXaGJzLusfWfqm+yAfH/r3Rl5YiqnPIQObtycHY787NOC+2d5d83cyLM0fU2eLaqY3r0XBj1Gm1XbR7DhkkYnPuv2J3Oq6o2lIvFQ/KYp6LxQ+pujMORoOKYOC7PYsMPKMzCJZY30pTKiZM9N3DF51RMBoKX9VJI4oMRMSqkVx5Q6vvIlvm/28UPTp1BBUm+uIRQQaSpmniF4R/5oLdFCts0h0pvt48imCge40hA/v8MOt+Lxas08q5Q9P3Lc5ms/WmSMrelyN4GOpNRJHBTdDAdfV+ljvt+tVcP1wUjIQoM5hUP+NLEj5aqwxEwtFQSjHCDIY10+hmUZdB6RhZlrYQRQYb3cGobjdLk4wP6nARp2MchFfdKDKQl4aa+lnV7aakfqVma9FXGZjwbnwc31hIjD6pzaWO6xUrrcWpbmQeRFC6LMSRQSL+UH62aR1Rf+1bfeI05dmXQXTXhSCD71f11DKdQcUk3CS2e6QggxOpDGzFXGwwGi4/A5GqechBZM8Lf5aB2qTWju3Z+Q8y0CNhqU4M6uH50jMQ/dWJ6/gPvfOaR/L+egbmRXdt9Y1CMRouPAN7p2pzSZw+OeSjIboMOpN2LdVgloGIetTYv3sxqpD/hugyaKip1hI9c55lYNTrhMd9e8GBsTqfd23K+xks6vdSVH/7DIJH5mk2OoLZxWw0XHIGkvzwhZfD5iSZ+eLobN47K381A/1K4of4f09RB8J+NFxwBsGLBfX8oFrOXj2fWQb2ad3MLPUdvXSWh3K3/0YG09lhreb6ThJ5zL/U7LZ0oMNvP4sF293x0ujmH1/PIIMav/ePuKn/KdiAVK5zRopZoZPKdV+W8FPdxvIlp20dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICY/QJBtD9XALSq7AAAAABJRU5ErkJggg=="
                    alt="Drive Logo"
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
                {ridePopupPanel && (
                    <div
                        ref={ridePopupPanelRef}
                        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
                    >
                        <RidePopUp
                            ride={ride}
                            setConfirmedRidePopupPanel={setConfirmedRidePopupPanel}
                            setRidePopupPanel={setRidePopupPanel}
                            confirmRide={confirmRide}
                        />
                    </div>
                )}
                <div
                    ref={confirmedRidePanelRef}
                    className="fixed h-screen w-screen z-10 bottom-0 bg-white px-3 py-6 pt-12"
                    style={{ transform: 'translateY(100vh)' }}
                >
                    <ConfirmRidePopup
                        ride={ride}
                        setConfirmedRidePopupPanel={setConfirmedRidePopupPanel}
                    />
                </div>
            </div>
        </CaptainProtectWrapper>
    );
};

export default CaptainHome;