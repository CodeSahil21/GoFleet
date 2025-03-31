'use client';
import UserProtectWrapper from '@/components/UserProtectWrapper';
import LocationSearchPanel from '@/components/LocationSearchPanel';
import React, { useRef } from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css';
import VehiclePanel from '@/components/VehiclePanel';
import ConfirmedRide from '@/components/ConfirmedVehicle';
import LookingForDriver from '@/components/LookingForDriver';
import WaitingForDriver from '@/components/WaitingForDriver';
import axios from 'axios';
import VehiclePanelSkeleton from '@/components/Skeleton';
import { useSocket } from '@/context/SocketContext';
import { useUser } from '@/context/UserContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRide } from '@/context/RideContext'; // Import the RideContext
import LiveTracking from '@/components/LiveTracking'; 
interface Suggestion {
    description: string;
}

interface Fareresponse {
    auto: number,
    car: number,
    motorcycle: number,
}
interface User {
    id: number;
    firstname: string;
    lastname?: string | null;
    email: string;
}

interface Vehicle {
    id: number;
    color: string;
    plate: string;
    capacity: number;
    vehicleType: 'CAR' | 'MOTORCYCLE' | 'AUTO';
}

interface Captain {
    id: number;
    firstname: string;
    lastname?: string | null;
    email: string;
    password: string; // This property is causing the conflict
    socketId?: string | null;
    status: 'ACTIVE' | 'INACTIVE';
    vehicle: Vehicle; // Include vehicle details
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
    captain?: Captain; // Include captain details
}
const HomePage: React.FC = () => {
    // State definitions
    const [pickup, setPickup] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [pickupSuggestions, setPickupSuggestions] = useState<Suggestion[]>([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState<Suggestion[]>([]);
    const [activeField, setActiveField] = useState<'pickup' | 'destination'>('pickup');
    const [panelOpen, setPanelOpen] = useState<boolean>(false);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState<boolean>(false);
    const [ConfirmedRidePanel, setConfirmedRidePanel] = useState<boolean>(false);
    const [LookingForDriverPanel, setLookingForDriverPanel] = useState<boolean>(false);
    const [WaitingForDriverPanel, setWaitingForDriverPanel] = useState<boolean>(false);
    const [fare, setFare] = useState<Fareresponse>({ auto: 0, car: 0, motorcycle: 0 });
    const [loadingFare, setLoadingFare] = useState<boolean>(false);
    const [loadingCreateRide, setLoadingCreateRide] = useState<boolean>(false);
    const [vehicleType, setVehicleType] = useState<'CAR' | 'MOTORCYCLE' | 'AUTO' | null>(null);
    const [ride, setRide] = useState<Ride | null>(null); // Store the confirmed ride details
    // Refs
    const vehiclePanelRef = useRef<HTMLDivElement | null>(null);
    const confirmedRidePanelRef = useRef<HTMLDivElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const panelCloseRef = useRef<HTMLHeadingElement | null>(null);
    const LookingForDriverRef = useRef<HTMLDivElement | null>(null);
    const WaitingForDriverRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter(); // Rename navigate to router for clarity
    const { socket } = useSocket(); // Use the socket context
    const { user } = useUser(); // Use the user Context
    const { rideData, setRideData } = useRide(); // Access rideData from RideContext
    
    useEffect(() => {
        if (socket && user) {
            // Emit the "join" event when the user is available
            socket.emit('join', { userType: 'user', userId: user.id });

            // Listen for the "ride-confirmed" event
            socket.on('ride-confirmed', (ride: Ride) => {
                setRide(ride); // Store the confirmed ride details

                // Slide down the LookingForDriverPanel
                if (LookingForDriverRef.current) {
                    gsap.to(LookingForDriverRef.current, {
                        transform: 'translateY(100%)',
                        duration: 0.5,
                        ease: 'power2.in',
                    });
                }

                // Slide up the WaitingForDriverPanel
                if (WaitingForDriverRef.current) {
                    gsap.to(WaitingForDriverRef.current, {
                        transform: 'translateY(0)',
                        duration: 0.5,
                        ease: 'power2.out',
                    });
                }
            });

            // Listen for the "ride-started" event
            socket.on('ride-started', (ride: Ride) => {
                setWaitingForDriverPanel(false); // Close the WaitingForDriver panel
                setRideData(ride);
                router.push('/Riding');
            });

            // Cleanup the listeners on unmount
            return () => {
                socket.off('ride-confirmed');
                socket.off('ride-started');
            };
        }
    }, [socket,setRideData ,user]);
   
    const handlePickupChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value; // Remove trim() here
        setPickup(inputValue);

        if (inputValue.trim().length < 3) { // Keep trim() for length check
            setPickupSuggestions([]);
            return;
        }

        const token = localStorage.getItem('user');
        if (!token) return;

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/maps/get-suggestions?input=${encodeURIComponent(inputValue.trim())}`, // Trim for API call
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (Array.isArray(response.data)) {
                setPickupSuggestions(
                    response.data.map(item => ({
                        description: item.description
                    }))
                );
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error fetching pickup suggestion -1:', error.response.data);
            } else {
                console.error('Error fetching pickup suggestion -2:', error);
            }
        }
    };

    const handleDestinationChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value; // Remove trim() here
        setDestination(inputValue);

        if (inputValue.trim().length < 3) { // Keep trim() for length check
            setDestinationSuggestions([]);
            return;
        }

        const token = localStorage.getItem('user');
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/maps/get-suggestions?input=${encodeURIComponent(inputValue.trim())}`, // Trim for API call
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (Array.isArray(response.data)) {
                setDestinationSuggestions(
                    response.data.map(item => ({
                        description: item.description
                    }))
                );
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error fetching destination suggestion -1', error.response.data);
            } else {
                console.error('Error fetching destination suggestion -2:', error);
            }
        }
    };

    const findTrip = async () => {
        setPanelOpen(false);
        setVehiclePanelOpen(true);
        setLoadingFare(true); // Start loading
        try {
            const token = localStorage.getItem('user');
            if (!token) {
                console.error('User token is missing');
                return;
            }

            const response = await axios.get<Fareresponse>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/rides/get-fare?pickup=${encodeURIComponent(pickup.trim())}&destination=${encodeURIComponent(destination.trim())}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setFare(response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error fetching findtrip -1', error.response.data);
            } else {
                console.error('Error in findtrip -2:', error);
            }
        } finally {
            setLoadingFare(false); // Stop loading
        }
    };

    interface VehicleType {
        vehicletype: 'CAR' | 'MOTORCYCLE' | 'AUTO';
    }

    const createRide = async () => {
        setLoadingCreateRide(true); // Start loading
        try {
            const token = localStorage.getItem('user');
            if (!token) {
                console.error('User token is missing');
                return;
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/rides/create`,
                {
                    pickup,
                    destination,
                    vehicleType
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', // Explicitly set Content-Type
                    },
                }
            );

            if (response.status === 201) {
                // Handle success response (e.g., navigate to another page or show a confirmation)
            } else {
                console.error('Unexpected response:', response);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('error createRide -1:', error.response.data);
            } else {
                console.error('error createRide -w:', error);
            }
        } finally {
            setLoadingCreateRide(false); // Stop loading
        }
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    useGSAP(() => {
        if (panelOpen && panelRef.current && panelCloseRef.current) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: '24',
                opacity: 1,
            });
            gsap.to(panelCloseRef.current, {
                opacity: 1,
            });
        } else if (panelRef.current && panelCloseRef.current) {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0,
            });
            gsap.to(panelCloseRef.current, {
                opacity: 0,
            });
        }
    }, [panelOpen]);

    useGSAP(() => {
        if (vehiclePanelOpen && vehiclePanelRef.current) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)',
            });
        } else if (vehiclePanelRef.current) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [vehiclePanelOpen]);

    useGSAP(() => {
        if (ConfirmedRidePanel && confirmedRidePanelRef.current) {
            gsap.to(confirmedRidePanelRef.current, {
                transform: 'translateY(0)',
            });
        } else if (confirmedRidePanelRef.current) {
            gsap.to(confirmedRidePanelRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [ConfirmedRidePanel]);

    useGSAP(() => {
        if (LookingForDriverPanel && LookingForDriverRef.current) {
            gsap.to(LookingForDriverRef.current, {
                transform: 'translateY(0)',
            });
        } else if (LookingForDriverRef.current) {
            gsap.to(LookingForDriverRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [LookingForDriverPanel]);

    useGSAP(() => {
        if (WaitingForDriverPanel && WaitingForDriverRef.current) {
            gsap.to(WaitingForDriverRef.current, {
                transform: 'translateY(0)',
            });
        } else if (WaitingForDriverRef.current) {
            gsap.to(WaitingForDriverRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [WaitingForDriverPanel]);

    return (
        <UserProtectWrapper>
            <div className='h-screen relative '>
                <Image
                    className="w-16 h-auto absolute left-5 top-5"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt="Uber Logo"
                    width={800}
                    height={800}
                    priority
                />
                <div
                    className="h-screen w-screen">
                    <LiveTracking />
                </div>
                <div className="flex flex-col justify-end h-screen absolute top-0 w-full overflow-hidden">
                    <div className="h-[30%] p-6 bg-white rounded-lg relative">
                        <h5
                            ref={panelCloseRef}
                            onClick={() => {
                                setPanelOpen(false);
                            }}
                            className='absolute opacity-0 right-6 top-6 text-2xl'
                        >
                            <i className="ri-arrow-down-wide-line"></i>
                        </h5>
                        <h4 className="text-2xl font-semibold">
                            Find a trip
                        </h4>
                        <form onSubmit={submitHandler}>
                            <div className="line absolute h-16 w-1 top-[45%] left-8 bg-gray-700 rounded-full"></div>
                            <input
                                className="bg-[#eeeeee] text-base mt-4 px-12 py-2 rounded-lg w-full"
                                required
                                onClick={() => {
                                    setPanelOpen(true);
                                    setActiveField('pickup');
                                }}
                                value={pickup}
                                onChange={handlePickupChange}
                                type="text"
                                placeholder="Add a pickup location"
                            />
                            <input
                                className="bg-[#eeeeee] w-full text-base mt-3 px-12 py-2 rounded-lg"
                                required
                                onClick={() => {
                                    setPanelOpen(true);
                                    setActiveField('destination');
                                }}
                                value={destination}
                                onChange={handleDestinationChange}
                                type="text"
                                placeholder="Enter your destination"
                            />
                        </form>
                        {panelOpen && (
                            <button onClick={findTrip}
                                className="mt-4 bg-black text-white py-3 rounded-lg w-full">
                                Find Trip
                            </button>
                        )}
                    </div>
                    <div ref={panelRef} className="bg-white h-0 opacity-0 overflow-hidden">
                        <LocationSearchPanel
                            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                            setPanelOpen={setPanelOpen}
                            setVehiclePanelOpen={setVehiclePanelOpen}
                            setPickup={setPickup}
                            setDestination={setDestination}
                            activeField={activeField}

                        />
                    </div>
                </div>
                <div ref={vehiclePanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-12'>
                    {loadingFare ? (
                        <VehiclePanelSkeleton />
                    ) : (
                        <VehiclePanel
                            selectVehicle={setVehicleType}
                            setConfirmedRidePanel={setConfirmedRidePanel}
                            setVehiclePanelOpen={setVehiclePanelOpen}
                            fare={fare}
                        />
                    )}
                </div>
                <div ref={confirmedRidePanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-12'>
                    <ConfirmedRide
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setConfirmedRidePanel={setConfirmedRidePanel}
                        setLookingForDriverPanel={setLookingForDriverPanel} />
                </div>
                <div ref={LookingForDriverRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-12'>
                    <LookingForDriver
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setLookingForDriverPanel={setLookingForDriverPanel} />
                </div>
                <div ref={WaitingForDriverRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-6 pt-12'>
                    <WaitingForDriver
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    ride={ride}
                    setWaitingForDriverPanel={setWaitingForDriverPanel} />
                </div>
            </div>
        </UserProtectWrapper>
    );
};

export default HomePage;