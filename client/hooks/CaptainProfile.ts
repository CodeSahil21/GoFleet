"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Vehicle {
  id: number;
  color: string;
  plate: string;
  capacity: number;
  vehicleType: 'CAR' | 'MOTORCYCLE' | 'AUTO';
}

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

export interface Captain {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  socketId?: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  vehicleId: number;
  locationId?: number | null;
  vehicle: Vehicle;
  rides: Ride[];
}

const useCaptainData = () => {
  const [captainData, setCaptainData] = useState<Captain | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaptainData = async () => {
      try {
        const token = localStorage.getItem('captain');
        console.log('Token:', token); // Debug token
        if (!token) {
          throw new Error('No token found');
        }
  
        const response = await axios.get('http://localhost:4000/api/captains/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log('API Response:', response.data); // Debug API response
        setCaptainData(response.data.captain);
      } catch (err) {
        console.error('Error:', err); // Debug error
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCaptainData();
  }, []);

  return { captainData, loading, error };
};

export default useCaptainData;