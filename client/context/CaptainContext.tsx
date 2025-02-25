"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface Vehicle {
  id: string;
  color: string;
  plate: string;
  capacity: number;
  vehicleType: "CAR" | "MOTORCYCLE" | "AUTO";
}

interface Captain {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  vehicle: Vehicle;
}

interface CaptainContextType {
  captain: Captain | null;
  setCaptain: (captain: Captain | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  updateCaptain: (captainData: Captain) => void;
}

export const CaptainDataContext = createContext<CaptainContextType | undefined>(undefined);

const CaptainContext = ({ children }: { children: ReactNode }) => {
  const [captain, setCaptain] = useState<Captain | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCaptain = (captainData: Captain) => {
    setCaptain(captainData);
  };

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain, isLoading, setIsLoading, error, setError, updateCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export const useCaptain = () => {
  const context = useContext(CaptainDataContext);
  if (!context) {
    throw new Error("useCaptain must be used within a CaptainProvider");
  }
  return context;
};

export default CaptainContext;
