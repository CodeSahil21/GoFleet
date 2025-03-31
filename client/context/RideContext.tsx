'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the Vehicle interface
interface Vehicle {
    id: number;
    color: string;
    plate: string;
    capacity: number;
    vehicleType: 'CAR' | 'MOTORCYCLE' | 'AUTO';
}

// Define the User interface
interface User {
    id: number;
    firstname: string;
    lastname?: string | null;
    email: string;
    password?: string;
    socketId?: string | null;
}

// Define the Captain interface
interface Captain {
    id: number;
    firstname: string;
    lastname?: string | null;
    email: string;
    password: string;
    socketId?: string | null;
    status: 'ACTIVE' | 'INACTIVE';
    locationId?: number | null;
    vehicle: Vehicle; // Include vehicle details
}

// Define the Ride interface
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
    user?: User; // Include user details
    captain?: Captain; // Include captain details
}

// Define the context type
interface RideContextType {
    rideData: Ride | null;
    setRideData: (rideData: Ride | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
    updateRide: (rideData: Ride) => void;
}

// Create the context
export const RideDataContext = createContext<RideContextType | undefined>(undefined);

// Define the provider props
interface RideContextProviderProps {
    children: ReactNode;
}

// Create the provider component
const RideContext: React.FC<RideContextProviderProps> = ({ children }) => {
    const [rideData, setRideData] = useState<Ride | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateRide = (rideData: Ride) => {
        setRideData(rideData);
    };

    return (
        <RideDataContext.Provider
            value={{
                rideData,
                setRideData,
                isLoading,
                setIsLoading,
                error,
                setError,
                updateRide,
            }}
        >
            {children}
        </RideDataContext.Provider>
    );
};

// Create a custom hook for using the context
export const useRide = (): RideContextType => {
    const context = useContext(RideDataContext);
    if (!context) {
        throw new Error('useRide must be used within a RideProvider');
    }
    return context;
};

export default RideContext;
