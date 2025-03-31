'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the Ride interface
export interface Ride {
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
}

// Define the User interface
export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname?: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  socketId?: string;
  location?: {
    lat: number;
    lng: number;
  } | null;
  rides: Ride[];
}

// Define the UserContextType interface
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the default user value
const defaultUser: User | null = null;

// Create the UserDataContext with default values
export const UserDataContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: null,
  setError: () => {},
});

// Define the UserContextProviderProps interface
interface UserContextProviderProps {
  children: ReactNode;
}

// Create the UserContext component
const UserContext: React.FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <UserDataContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook to use the UserDataContext
export const useUser = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;