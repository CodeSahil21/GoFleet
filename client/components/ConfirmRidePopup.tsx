"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import 'remixicon/fonts/remixicon.css';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useRide } from '@/context/RideContext'; // Import the RideContext
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

interface ConfirmRidePopupProps {
    setConfirmedRidePopupPanel: (value: boolean) => void;
    ride?: Ride | null; // Optional ride prop
}

const ConfirmRidePopup: React.FC<ConfirmRidePopupProps> = (props) => {
    const [otp, setOtp] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter(); // Initialize useRouter
    const {rideData,setRideData} = useRide();
    const handleStartRide = async () => {
        if (!props.ride || !props.ride.id) {
            console.error('Invalid ride ID');
            return;
        }
    
        if (!otp || otp.length !== 6) {
            console.error('Invalid OTP');
            return;
        }
    
        try {
            setLoading(true);
            const token = localStorage.getItem('captain'); // Assuming the captain's token is stored in localStorage
            if (!token) {
                console.error('Captain token is missing');
                return;
            }
    
            // Ensure rideId is sent as a number
            const rideId = Number(props.ride.id);
    
            // Construct the query string with encoded parameters
            const query = `rideId=${encodeURIComponent(rideId)}&otp=${encodeURIComponent(otp.trim())}`;
            // console.log('Query string:', query); // Log the query string for debugging
    
            // Make the API call
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/rides/start-ride?${query}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.status === 200) {
                // console.log('Ride started successfully:', response.data);
                setRideData(response.data); // Update the ride data in context
                props.setConfirmedRidePopupPanel(false); // Close the popup
                router.push('/captainRiding'); // Navigate to the captain riding page
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error starting ride:', error.response.data);
            } else {
                console.error('Error starting ride:', error);
            }
        } finally {
            setLoading(false);
        }
    };
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleStartRide();
    };

    return (
        <div className="h-screen w-screen fixed bottom-0 left-0 flex items-end bg-black bg-opacity-30">
            <div className="w-full bg-white shadow-2xl rounded-t-3xl p-6 transition-all duration-300">
                {/* Ride Notification */}
                <div className="text-center mt-2">
                    <h4 className="text-xl font-semibold text-gray-800">Confirm your Ride!</h4>
                </div>

                {/* Rider Info */}
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                        <Image
                            className="h-14 w-14 rounded-full border-2 border-gray-300 shadow-sm"
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            alt="Rider Profile"
                            width={56}
                            height={56}
                        />
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">
                                {props.ride?.user?.firstname || 'N/A'} {props.ride?.user?.lastname || ''}
                            </h4>
                        </div>
                    </div>
                    <div className="text-right">
                        <h4 className="text-xl font-bold text-gray-900">
                            ₹{props.ride?.fare || 'N/A'}
                        </h4>
                        <p className="text-gray-500 text-sm">
                            📍 {props.ride?.distance || 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-4 border-gray-200" />

                {/* Ride Description */}
                <div className="mb-4 px-2">
                    <h5 className="text-gray-500 text-xs uppercase tracking-wider">📝 Description</h5>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        This ride is scheduled for immediate pickup. Please confirm the ride to proceed or cancel if unavailable.
                    </p>
                </div>

                {/* Ride Details */}
                <div className="space-y-4 px-2">
                    <div className="flex items-start">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Pick Up</p>
                            <p className="text-lg font-medium text-gray-900">
                                {props.ride?.pickup || 'N/A'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Drop Off</p>
                            <p className="text-lg font-medium text-gray-900">
                                {props.ride?.destination || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* OTP Section */}
                <form onSubmit={submitHandler} className="mt-4">
                    <label className="text-gray-500 text-sm">Enter OTP</label>
                    <input
                        onChange={(e) => setOtp(e.target.value)}
                        type="text"
                        value={otp}
                        className="border rounded-lg w-full p-2 text-lg text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter OTP"
                    />
                    {/* Buttons */}
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={() => props.setConfirmedRidePopupPanel(false)}
                            className="bg-red-600 text-white text-lg font-semibold py-3 px-4 rounded-lg w-1/2 mr-2 shadow-md transition hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white text-lg font-semibold py-3 px-4 rounded-lg w-1/2 ml-2 shadow-md transition hover:bg-green-700"
                            disabled={loading}
                        >
                            {loading ? 'Starting...' : 'Confirm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConfirmRidePopup;