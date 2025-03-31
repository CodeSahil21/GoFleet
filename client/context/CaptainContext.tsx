"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the Vehicle interface
interface Vehicle {
  id: number;
  color: string;
  plate: string;
  capacity: number;
  vehicleType: "CAR" | "MOTORCYCLE" | "AUTO";
}

// Define the Ride interface
interface Ride {
  id: number;
  userId: number;
  captainId?: number | null;
  pickup: string;
  destination: string;
  fare: number;
  status: "PENDING" | "ACCEPTED" | "ONGOING" | "COMPLETED" | "CANCELLED";
  duration?: number | null;
  distance?: number | null;
  paymentID?: string | null;
  orderId?: string | null;
  signature?: string | null;
  otp: string;
}

// Define the Captain interface
interface Captain {
  id: number;
  firstname: string;
  lastname?: string | null;
  email: string;
  password: string;
  socketId?: string | null;
  status: "ACTIVE" | "INACTIVE";
  vehicle: Vehicle;
  location?: { ltd: number; lng: number } | null;
  rides: Ride[];
}

// Define the context type
interface CaptainContextType {
  captain: Captain | null;
  setCaptain: (captain: Captain | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  updateCaptain: (captainData: Captain) => void;
}

// Create the context
export const CaptainDataContext = createContext<CaptainContextType | undefined>(undefined);

// Define the provider props
interface CaptainContextProviderProps {
  children: ReactNode;
}

// Create the provider component
const CaptainContext: React.FC<CaptainContextProviderProps> = ({ children }) => {
  const [captain, setCaptain] = useState<Captain | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCaptain = (captainData: Captain) => {
    setCaptain(captainData);
  };

  return (
    <CaptainDataContext.Provider
      value={{
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain,
      }}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};

// Create a custom hook for using the context
export const useCaptain = (): CaptainContextType => {
  const context = useContext(CaptainDataContext);
  if (!context) {
    throw new Error("useCaptain must be used within a CaptainProvider");
  }
  return context;
};

export default CaptainContext;