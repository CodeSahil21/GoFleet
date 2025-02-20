'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the User interface
export interface User {
  email: string;
  fullname: {
    firstname: string;
    lastname?: string;
  };
}

// Define the UserContextType interface
interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// Create the default user value
const defaultUser: User = {
  email: '',
  fullname: {
    firstname: '',
    lastname: ''
  }
};

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
  const [user, setUser] = useState<User>(defaultUser);

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