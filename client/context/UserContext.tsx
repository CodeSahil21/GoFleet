'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the User interface
export interface User {
  email: string;
  firstname: string;
  lastname?: string;
}

// Define the UserContextType interface
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the default user value
const defaultUser: User | null = null;

// Create the UserDataContext with default values
export const UserDataContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {}
});

// Define the UserContextProviderProps interface
interface UserContextProviderProps {
  children: ReactNode;
}

// Create the UserContext component
const UserContext: React.FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultUser);

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
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